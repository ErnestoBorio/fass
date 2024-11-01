import { opcodes } from "./opcodes";
import fassVisitor from "./parser/fassVisitor";
import {
	Hash,
	Slice,
	Value,
	fassert,
	FassError,
	Reference,
	Addressing,
	defaultFiller,
	UnreachableCode
} from "./types";
import fassParser, {
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
	Ref_ref_assign_stmtContext,
	Reg_reg_assign_stmtContext,
	IncdecrementContext,
	ArithmeticContext,
	BitmapContext,
	Bmp_headerContext,
	ProgramContext
} from "./parser/fassParser";
import { reservedWords } from "./keywords";
import { CharStream, CommonTokenStream, InputStream } from "antlr4";
import fassLexer from "./parser/fassLexer";
import { ParserRuleContext } from "antlr4";

export default class Fass extends fassVisitor<any> {
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
			} else throw new UnreachableCode();
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

		// If address is set before any output, it will be the starting address, I.E. the address of byte 0 of the output
		if (this.output.getLength() === 0) {
			this.address = newAddress;
			return;
		}

		// When advancing the address, fill the gap with filler bytes
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
		let set: boolean;
		if (ctx.DECIMAL().getText() === "0") {
			set = false;
		} else if (ctx.DECIMAL().getText() === "1") {
			set = true;
		} else {
			throw new FassError("Flags can only be set to 0 or 1", ctx);
		}

		if (ctx.CARRY()) {
			if (set) {
				this.append(opcodes.SEC);
			} else {
				this.append(opcodes.CLC);
			}
		} else if (ctx.INTERRUPT()) {
			if (set) {
				this.append(opcodes.SEI);
			} else {
				this.append(opcodes.CLI);
			}
		} else if (ctx.DECIMAL_MODE()) {
			if (set) {
				this.append(opcodes.SED);
			} else {
				this.append(opcodes.CLD);
			}
		} else if (ctx.OVERFLOW()) {
			if (!set) {
				this.append(opcodes.CLV);
			} else {
				throw new FassError(
					`The overflow flag can't be set programmatically`,
					ctx
				);
			}
		} else throw new UnreachableCode(ctx);
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
		const register = ctx.register().A()
			? "A"
			: ctx.register().X()
				? "X"
				: "Y";
		const argument = this.visitRhs_value(ctx.rhs_value());
		this.registerAssignment(register, argument);
	};

	visitRef_assign_stmt = (ctx: Ref_assign_stmtContext) => {
		const register = ctx.register().A()
			? "A"
			: ctx.register().X()
				? "X"
				: "Y";
		const reference = this.visitReference(ctx.reference());
		this.referenceAssignment(reference, register);
	};

	visitReg_reg_assign_stmt = (ctx: Reg_reg_assign_stmtContext) => {
		const [left, right] = ctx.registers_list();
		if (left.A() && right.X()) this.append(opcodes["TAX"]);
		else if (left.X() && right.A()) this.append(opcodes["TXA"]);
		else if (left.A() && right.Y()) this.append(opcodes["TAY"]);
		else if (left.Y() && right.A()) this.append(opcodes["TYA"]);
		else if (left.X() && right.STACK()) this.append(opcodes["TXS"]);
		else if (left.STACK() && right.X()) this.append(opcodes["TSX"]);
		else throw new UnreachableCode(ctx);
	};

	visitRef_ref_assign_stmt = (ctx: Ref_ref_assign_stmtContext) => {
		const register = ctx.register().A()
			? "A"
			: ctx.register().X()
				? "X"
				: "Y";
		const lhs_ref = this.visitReference(ctx.reference());
		const rhs_value = this.visitRhs_value(ctx.rhs_value());
		this.registerAssignment(register, rhs_value);
		this.referenceAssignment(lhs_ref, register);
	};

	visitIncdecrement = (ctx: IncdecrementContext) => {
		const op2char = ctx._sign.text == "++" ? "IN" : "DE";
		if (ctx.incdec_lhs().X() || ctx.incdec_lhs().Y()) {
			// INX DEX INY DEY
			const op = op2char + (ctx.incdec_lhs().X() ? "X" : "Y");
			this.append(opcodes[op]);
		} else {
			// INC ref, DEC ref
			const ref = this.getRef(ctx.incdec_lhs().reference());
			this.append(opcodes[op2char + "C"][ref.addressing]);
			this.appendReference(ref);
		}
	};

	visitArithmetic = (ctx: ArithmeticContext) => {
		const rhs_value = this.visitRhs_value(ctx.rhs_value());
		const op = ctx._op.text[0];
		const mnemonic = op == "+" ? "ADC" : "SBC";

		if (rhs_value instanceof Value) {
			this.append(opcodes[mnemonic]["IMM"]);
			this.append(rhs_value);
			return;
		}

		if (rhs_value instanceof Reference) {
			if (opcodes[mnemonic][rhs_value.addressing!]) {
				this.append(opcodes[mnemonic][rhs_value.addressing!]);
				this.appendReference(rhs_value);
				return;
			}

			throw new FassError(
				`Invalid addressing mode ${rhs_value.addressing} for ${mnemonic} ${rhs_value.label}`
			);
		}
		throw new UnreachableCode();
	};

	visitBitmap = (ctx: BitmapContext) => {
		const { width, height, color, tags } = this.visitBmp_header(
			ctx.bmp_header()
		);
		const bpp = color === "MONOCHROME" ? 1 : 2;

		const charPixLines = ctx.bmp_body().bmp_line_list();
		fassert(
			charPixLines.length <= height,
			`Bitmap lines exceed the bitmap height`,
			ctx
		);

		for (const charPixCtx of charPixLines) {
			const charsLine = charPixCtx.PIXELS().getText();
			let intPxLine: number[] = [];

			for (const pxChar of charsLine) {
				if (".0".includes(pxChar)) {
					intPxLine.push(0);
				} else if ("#1".includes(pxChar)) {
					intPxLine.push(1);
				} else if (bpp <= 1) {
					throw new FassError(
						`Value greater than 1 used in 1bpp monochrome bitmap`,
						ctx
					);
				} else if (["%2"].includes(pxChar)) {
					intPxLine.push(2);
				} else if (["*3"].includes(pxChar)) {
					intPxLine.push(3);
				} else {
					throw new UnreachableCode(ctx);
				}
			}

			if (intPxLine.length < width) {
				const rest: number[] = Array(width - intPxLine.length).fill(0);
				intPxLine = intPxLine.concat(rest);
			} else {
				fassert(
					intPxLine.length <= width,
					`bitmap line exceeds maximum width of 24 pixels`,
					ctx
				);
			}

			if (bpp === 1) {
				const lineBytes: number[] = Array(width / 8).fill(0);
				intPxLine.forEach((value, idx) => {
					const byteNo = Math.floor(idx / 8); // 0..2
					const bitNo = 7 - (idx % 8); // 7..0
					lineBytes[byteNo] |= value << bitNo;
				});
				for (const byte of lineBytes.reverse()) {
					this.append(byte);
				}
				continue;
			}
			/**
			 * else: encode 2bpp image #TODO
			 */
		}
	};

	visitBmp_header = (ctx: Bmp_headerContext) => {
		let width = parseInt(ctx.bmp_width()?.decimal().getText());
		if (!width) {
			width = 24;
		} else if (![8, 16, 24].includes(width)) {
			throw new FassError(`Bitmaps can only be 8, 16 or 24 bits wide`, ctx);
		}
		const height = parseInt(ctx.bmp_height()?.decimal().getText());
		const color = ctx.bmp_bpp()?.MONOCHROME() ? `MONOCHROME` : `4COLORS`;
		const tags = ctx.NES() ? [`NES`] : [];
		return {
			width,
			height,
			color,
			tags
		};
	};
}

export function compile(source: string): [Fass, ProgramContext] {
	const fass = new Fass();
	const chars = new InputStream(source);
	const stream = new CharStream(chars.toString());
	const lexer = new fassLexer(stream);
	const tokens = new CommonTokenStream(lexer);
	const parser = new fassParser(tokens);
	const program = parser.program();
	return [fass, program];
}
