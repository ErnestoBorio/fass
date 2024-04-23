import { opcodes } from "./opcodes";
import fassVisitor from "./parser/fassVisitor";
import {
	Hash,
	Slice,
	Value,
	FassError,
	Reference,
	Addressing,
	defaultFiller,
	UnreachableCode
} from "./types";
import {
	LabelContext,
	DirectContext,
	BinaryContext,
	DecimalContext,
	AddressContext,
	LiteralContext,
	IndexedContext,
	IndirectContext,
	Goto_stmtContext,
	Data_stmtContext,
	ReferenceContext,
	Rhs_valueContext,
	Const_stmtContext,
	Stack_stmtContext,
	Gosub_stmtContext,
	Indirect_yContext,
	X_indirectContext,
	Logic_stmtContext,
	HexadecimalContext,
	Filler_stmtContext,
	Return_stmtContext,
	Static_valueContext,
	Address_stmtContext,
	Flag_set_stmtContext,
	Opcode_literalContext,
	Bit_shift_stmtContext,
	Negative_numberContext,
	Reg_assign_stmtContext,
	Remote_label_stmtContext,
	Ref_assign_stmtContext,
	Ref_ref_assign_stmtContext
} from "./parser/fassParser";
import { reservedWords } from "./keywords";
import ParserRuleContext from "antlr4/context/ParserRuleContext";

export default class Fass extends fassVisitor<Value | Reference | void> {
	/** If dereferencing constants returns `undefined`, the constant doesn't exist */
	constants = <Hash<number>>{};

	/** If dereferencing labels returns `undefined`, the label hasn't been defined
	 * yet, it could be a forward reference or remain undefined */
	labels = <Hash<number>>{};

	/** List of references to yet undefined labels, and their output offset */
	private forwardRefs = <Hash<number[]>>{};

	filler = defaultFiller;

	/** Binary output of the program */
	output: Slice;

	/** The address where next output will be written */
	address = 0;

	constructor() {
		super();
		// Allocates 64KB and stores an empty slice from it
		this.output = new Slice(Buffer.alloc(0x10000), 0, 0);
	}

	setLabel({ label, address }: Reference) {
		this.checkNameIsValid(label);
		this.labels[label] = address!;

		if (this.forwardRefs[label]) {
			const buffer = Buffer.alloc(2);
			buffer.writeUint16LE(address!);
			this.forwardRefs[label].forEach(offset => {
				this.write(buffer, offset);
			});
			delete this.forwardRefs[label];
		}
	}

	setConstant(name: string, value: number) {
		this.checkNameIsValid(name);
		this.constants[name.toLowerCase()] = value;
	}

	/** Checks if the given name is unique and throws otherwise */
	checkNameIsValid(name: string, ctx?: ParserRuleContext) {
		name = name.toLowerCase();
		if (this.labels[name] || this.constants[name]) {
			throw new FassError(`Name ${name} is already defined`, ctx);
		}
		if (name in reservedWords) {
			throw new FassError(`Name ${name} is a reserved word`, ctx);
		}
	}

	/** Fill the output buffer with {length} times this.filler */
	fill(length: number) {
		const filling = Buffer.alloc(length);
		filling.fill(this.filler);
		this.append(filling);
		this.address += length;
	}

	/** Returns offset where next output will be appended */
	getOffset() {
		return this.output.getLength();
	}

	/** Write data to the output buffer */
	append(data: Value | Buffer | number): void {
		if (data instanceof Value) {
			if (data.length === 1) {
				this.output.append(Buffer.from([data.data]));
				this.address += data.length;
			} else if (data.length === 2) {
				const buffer = Buffer.alloc(2);
				if (data.endian === "big") {
					buffer.writeUInt16BE(data.data);
				} else if (data.endian === "little") {
					buffer.writeUInt16LE(data.data);
				} else throw new Error("Invalid endianness. (unreachable code?)");
				this.output.append(buffer);
				this.address += data.length;
			}
		} else if (data instanceof Buffer) {
			this.output.append(data);
			this.address += data.length;
		} else if (typeof data === "number") {
			this.output.append(Buffer.from([data]));
			this.address += 1;
		} else throw new UnreachableCode();
	}

	appendReference(ref: Reference) {
		if (ref.address === undefined) {
			ref.address = 0xdead;
			if (!this.forwardRefs[ref.label]) {
				this.forwardRefs[ref.label] = [];
			}
			this.forwardRefs[ref.label].push(this.getOffset());
		}
		const buffer = Buffer.alloc(2);
		buffer.writeUInt16LE(ref.address);
		this.append(buffer);
	}

	write(data: Buffer, offset: number) {
		this.output.write(data, offset);
	}

	setAddress(newAddress: number) {
		if (newAddress < this.address) {
			throw new FassError(
				`Can't set new address ${newAddress} lower than current address ${this.address}`
			);
		}
		if (newAddress - this.address > 0) {
			this.fill(newAddress - this.address);
		}
		this.address = newAddress;
	}

	//--------------------------------------------------------------------------> Const & values

	visitConst_stmt = (ctx: Const_stmtContext) => {
		const name = ctx.IDENTIFIER().getText();
		const value = this.visitStaticValue(ctx.static_value());
		this.setConstant(name, value.data);
	};

	visitStaticValue = (ctx: Static_valueContext): Value => {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			const name = ctx.name().IDENTIFIER().getText().toLowerCase();
			if (this.constants[name]) {
				return new Value(this.constants[name]);
			}
			throw new FassError(`Constant ${name} is not defined`, ctx);
		}
		throw new UnreachableCode(ctx);
	};

	visitLiteral = (ctx: LiteralContext): Value => {
		if (ctx.hexadecimal()) {
			return this.visitHexadecimal(ctx.hexadecimal());
		}
		if (ctx.decimal()) {
			return this.visitDecimal(ctx.decimal());
		}
		if (ctx.binary()) {
			return this.visitBinary(ctx.binary());
		}
		if (ctx.negative_number()) {
			return this.visitNegative_number(ctx.negative_number());
		}
		if (ctx.opcode_literal()) {
			return this.visitOpcode_literal(ctx.opcode_literal());
		}
		throw new UnreachableCode(ctx);
	};

	visitHexadecimal = (ctx: HexadecimalContext): Value => {
		const hex = ctx.HEXADECIMAL().getText().substring(1);
		const value = parseInt(hex, 16);
		if (value > 0xffff) {
			throw new FassError(
				`Value $${hex} not allowed, it's larger than $FFFF, (16 bits)`,
				ctx
			);
		}
		return new Value(value, value > 0xff ? 2 : 1);
	};

	visitDecimal = (ctx: DecimalContext): Value => {
		const dec = ctx.DECIMAL().getText();
		const value = parseInt(dec);
		if (value > 0xffff) {
			throw new FassError(
				`Value ${dec} not allowed, it's larger than 65535, (16 bits)`,
				ctx
			);
		}
		return new Value(value, value > 0xff ? 2 : 1);
	};

	visitBinary = (ctx: BinaryContext): Value => {
		const bin = ctx.BINARY().getText().substring(1);
		const value = parseInt(bin, 2);
		if (value > 0xffff) {
			throw new FassError(
				`Value %${bin} not allowed, it's larger than 65535 (16 bits)`,
				ctx
			);
		}
		return new Value(value, value > 0xff ? 2 : 1);
	};

	visitNegative_number = (ctx: Negative_numberContext): Value => {
		const neg = parseInt(ctx.NEGATIVE_NUMBER().getText());
		if (neg < -128) {
			throw new FassError(
				`Value ${neg} not allowed, negative values must be in ` +
					`range -128..-1 (8 bits with sign bit set to 1)`,
				ctx
			);
		}
		return new Value(neg);
	};

	visitOpcode_literal = (ctx: Opcode_literalContext): Value => {
		const opcode = (ctx.BRK() ?? ctx.NOP() ?? ctx.NOP3())
			.getText()
			.toUpperCase();
		return new Value(opcodes[opcode]);
	};

	visitAddress = (ctx: AddressContext): Value => {
		if (ctx.hexadecimal()) {
			return this.visitHexadecimal(ctx.hexadecimal());
		}
		if (ctx.decimal()) {
			return this.visitDecimal(ctx.decimal());
		}
		throw new UnreachableCode(ctx);
	};

	visitRhs_value = (ctx: Rhs_valueContext) => {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			const name = ctx.name().IDENTIFIER().getText().toLowerCase();
			if (this.constants[name]) {
				return <Value>{ data: this.constants[name] };
			}
			if (this.labels[name]) {
				return <Reference>{
					label: name,
					address: this.labels[name]
				};
			}
		}
		if (ctx.reference()) {
			return this.getRef(ctx.reference());
		}
		throw new UnreachableCode(ctx);
	};

	//--------------------------------------------------------------------------> References

	/** Returns a Reference from any reference context */
	getRef(
		ctx:
			| DirectContext
			| IndexedContext
			| IndirectContext
			| X_indirectContext
			| Indirect_yContext
			| ReferenceContext
	) {
		if (ctx instanceof ReferenceContext) {
			ctx =
				ctx.direct() ||
				ctx.indexed() ||
				ctx.indirect() ||
				ctx.x_indirect() ||
				ctx.indirect_y();
		}

		const name = ctx.name().IDENTIFIER().getText().toLowerCase();
		if (this.constants[name] !== undefined) {
			throw new FassError(
				`${name} is a constant, can't be used as a label`,
				ctx
			);
		}
		const ref = <Reference>{
			label: name,
			address: this.labels[name]
		};

		if (ctx instanceof DirectContext) {
			ref.addressing =
				ref.address && ref.address <= 0xff
					? Addressing.zeroPage
					: Addressing.absolute;
		} else if (ctx instanceof IndexedContext) {
			if (ctx.X()) {
				ref.addressing =
					ref.address && ref.address <= 0xff
						? Addressing.zeroPageX
						: Addressing.absoluteX;
			} else if (ctx.Y()) {
				ref.addressing =
					ref.address && ref.address <= 0xff
						? Addressing.zeroPageY
						: Addressing.absoluteY;
			} else throw new UnreachableCode(ctx);
		} else if (ctx instanceof X_indirectContext) {
			ref.addressing = Addressing.indirectX;
		} else if (ctx instanceof Indirect_yContext) {
			ref.addressing = Addressing.indirectY;
		} else if (ctx instanceof IndirectContext) {
			ref.addressing = Addressing.indirect;
		} else throw new UnreachableCode(ctx);

		return ref;
	}

	visitReference = this.getRef;
	visitDirect = this.getRef;
	visitIndexed = this.getRef;
	visitIndirect = this.getRef;
	visitIndirect_y = this.getRef;
	visitX_indirect = this.getRef;

	//--------------------------------------------------------------------------> Declarations
	// Declarations define things but don't produce binary output

	visitAddress_stmt = (ctx: Address_stmtContext) => {
		const newAddress = this.visitAddress(ctx.address()).data;
		try {
			this.setAddress(newAddress);
		} catch (error) {
			throw new FassError(error.message, ctx);
		}
	};

	visitLabel = (ctx: LabelContext) => {
		this.setLabel({
			label: ctx.IDENTIFIER().getText().toLowerCase(),
			address: this.address
		});
	};

	visitRemote_label_stmt = (ctx: Remote_label_stmtContext) => {
		this.setLabel({
			label: ctx.IDENTIFIER().getText().toLowerCase(),
			address: this.visitAddress(ctx.address()).data
		});
	};

	visitFiller_stmt = (ctx: Filler_stmtContext) => {
		if (ctx.DEFAULT_KWD()) {
			this.filler = defaultFiller;
		} else {
			this.filler = this.visitStaticValue(ctx.static_value()).data;
			if (this.filler > 0xff) {
				// WIP implement fillers of any length
				const filler = this.filler;
				throw new FassError(
					`Filler value $${filler} is larger than $FF`,
					ctx
				);
			}
		}
	};

	//--------------------------------------------------------------------------> Statements

	visitData_stmt = (ctx: Data_stmtContext) => {
		ctx.static_value_list().forEach(data => {
			const value = this.visitStaticValue(data);
			this.append(value);
		});
	};

	visitFlag_set_stmt = (ctx: Flag_set_stmtContext) => {
		if (ctx.CARRY()) {
			if (ctx.BIT().getText() === "0") {
				this.append(opcodes.CLC);
			} else if (ctx.BIT().getText() === "1") {
				this.append(opcodes.SEC);
			}
		} else if (ctx.INTERRUPT()) {
			if (ctx.BIT().getText() === "0") {
				this.append(opcodes.CLI);
			} else if (ctx.BIT().getText() === "1") {
				this.append(opcodes.SEI);
			}
		} else if (ctx.DECIMAL_MODE()) {
			if (ctx.BIT().getText() === "0") {
				this.append(opcodes.CLD);
			} else if (ctx.BIT().getText() === "1") {
				this.append(opcodes.SED);
			}
		} else if (ctx.OVERFLOW()) {
			if (ctx.BIT().getText() === "0") {
				this.append(opcodes.CLV);
			} else if (ctx.BIT().getText() === "1") {
				throw new FassError(
					`The overflow flag can't be set programmatically`,
					ctx
				);
			}
		}
	};

	visitStack_stmt = (ctx: Stack_stmtContext) => {
		if (ctx.PUSH_KWD()) {
			if (ctx.A()) {
				this.append(opcodes.PHA);
			} else if (ctx.FLAGS_KWD()) {
				this.append(opcodes.PHP);
			}
		} else if (ctx.PULL_KWD()) {
			if (ctx.A()) {
				this.append(opcodes.PLA);
			} else if (ctx.FLAGS_KWD()) {
				this.append(opcodes.PLP);
			}
		}
	};

	visitGoto_stmt = (ctx: Goto_stmtContext) => {
		if (ctx.direct()) {
			this.append(opcodes.JMP.ABS);
			this.appendReference(this.visitDirect(ctx.direct()));
			return;
		}
		if (ctx.indirect()) {
			this.append(opcodes.JMP.IND);
			this.appendReference(this.visitIndirect(ctx.indirect()));
			return;
		}
		throw new UnreachableCode(ctx);
	};

	visitGosub_stmt = (ctx: Gosub_stmtContext) => {
		this.append(opcodes.JSR);
		this.appendReference(this.visitDirect(ctx.direct()));
	};

	visitReturn_stmt = (ctx: Return_stmtContext) => {
		if (ctx.RETURN_KWD()) {
			this.append(opcodes.RTS);
		} else if (ctx.RETINT_KWD()) {
			this.append(opcodes.RTI);
		}
	};

	visitBit_shift_stmt = (ctx: Bit_shift_stmtContext) => {
		const mnemonic = ctx.ASL_KWD()
			? "ASL"
			: ctx.LSR_KWD()
				? "LSR"
				: ctx.ROL_KWD()
					? "ROL"
					: "ROR";
		if (ctx.A()) {
			this.append(opcodes[mnemonic].ACC);
			return;
		}
		const { addressing } = this.getRef(ctx.direct() ?? ctx.indexed());
		this.append(opcodes[mnemonic][addressing!]);
		return;
	};

	visitLogic_stmt = (ctx: Logic_stmtContext) => {
		const mnemonic = ctx.AND_KWD()
			? "AND"
			: ctx.XOR_KWD()
				? "EOR"
				: ctx.OR_KWD()
					? "ORA"
					: "BIT";
		if (ctx.literal()) {
			this.append(opcodes[mnemonic]["IMM"]);
			this.append(this.visitLiteral(ctx.literal()));
			return;
		}
		if (ctx.reference()) {
			const ref = this.getRef(ctx.reference());
			this.append(opcodes[mnemonic][ref.addressing!]);
			this.appendReference(ref);
			return;
		}
		throw new UnreachableCode(ctx);
	};

	//--------------------------------------------------------------------------> Assignments

	registerAssignment(reg: string, argument: Value | Reference) {
		if (argument instanceof Value) {
			this.append(opcodes["LD" + reg]["IMM"]);
			this.append(argument);
			return;
		}
		if (argument instanceof Reference) {
			if (opcodes["LD" + reg][argument.addressing]) {
				this.append(opcodes["LD" + reg][argument.addressing]);
				this.appendReference(argument);
				return;
			}
			throw new FassError(
				`Invalid addressing mode ${argument.addressing} for ${reg}`
			);
		}
		throw new UnreachableCode();
	}

	referenceAssignment(ref: Reference, reg: string) {
		const opcode = opcodes["ST" + reg][ref.addressing];
		if (opcode) {
			this.append(opcode);
			this.appendReference(ref);
			return;
		}
		throw new FassError(
			`Invalid addressing mode ${ref.addressing} for ${reg}`
		);
	}

	visitReg_assign_stmt = (ctx: Reg_assign_stmtContext) => {
		const register = ctx.A() ? "A" : ctx.X() ? "X" : "Y";
		const argument = this.visitRhs_value(ctx.rhs_value());
		this.registerAssignment(register, argument);
	};

	visitRef_assign_stmt = (ctx: Ref_assign_stmtContext) => {
		const register = ctx.A() ? "A" : ctx.X() ? "X" : "Y";
		const reference = this.visitReference(ctx.reference());
		this.referenceAssignment(reference, register);
	};

	visitRef_ref_assign_stmt = (ctx: Ref_ref_assign_stmtContext) => {
		const register = ctx.A() ? "A" : ctx.X() ? "X" : "Y";
		const lhs_ref = this.visitReference(ctx.reference());
		const rhs_value = this.visitRhs_value(ctx.rhs_value());
		this.registerAssignment(register, rhs_value);
		this.referenceAssignment(lhs_ref, register);
	};
}
