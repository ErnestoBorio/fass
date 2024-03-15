import { Core } from "./Core";
import { opcodes } from "./opcodes";
import fassVisitor from "./parser/fassVisitor";
import { Value, FassError, UnreachableCode } from "./types";
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
	Const_stmtContext,
	Stack_stmtContext,
	Gosub_stmtContext,
	StaticValueContext,
	HexadecimalContext,
	Filler_stmtContext,
	Return_stmtContext,
	Address_stmtContext,
	Flag_set_stmtContext,
	Opcode_literalContext,
	Bit_shift_stmtContext,
	Negative_numberContext,
	Remote_label_stmtContext
} from "./parser/fassParser";

export default class Fass extends fassVisitor<any> {
	core = new Core();

	//--------------------------------------------------------------------------> Const & values

	visitConst_stmt = (ctx: Const_stmtContext) => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);

		const value = this.visitStaticValue(ctx.staticValue());
		this.constants[name] = value;
	};

	visitStaticValue = (ctx: StaticValueContext): Value => {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			const name = ctx.name().getText().toLowerCase();
			if (this.constants[name]) {
				return this.constants[name];
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
		return {
			data: value,
			length: value > 0xff ? 2 : 1
		} as Value;
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
		return {
			data: value,
			length: value > 0xff ? 2 : 1
		} as Value;
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
		return {
			data: value,
			length: value > 0xff ? 2 : 1
		} as Value;
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
		return {
			data: neg
		} as Value;
	};

	visitOpcode_literal = (ctx: Opcode_literalContext): Value => {
		const opcode = ctx.getText().toUpperCase();
		return {
			data: opcodes[opcode]
		} as Value;
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

	//--------------------------------------------------------------------------> References

	visitDirect = (ctx: DirectContext) => {
		const label = this.getLabel(ctx.name());
		return {
			address: label?.address,
			length: label!.address! >= 0x100 ? 2 : 1
		} as Reference;
	};

	visitIndirect = (ctx: IndirectContext) => {
		const label = this.getLabel(ctx.name());
		return {
			address: label?.address,
			length: 2
		} as Reference;
	};

	visitIndexed = (ctx: IndexedContext) => {
		const label = this.getLabel(ctx.name());
		return {
			address: label?.address,
			length: label!.address! >= 0x100 ? 2 : 1
		} as Reference;
	};

	//--------------------------------------------------------------------------> Declarations
	// Declarations define things but don't produce binary output

	visitAddress_stmt = (ctx: Address_stmtContext) => {
		const newAddress = this.visitAddress(ctx.address()).data;
		try {
			this.core.setAddress(newAddress);
		} catch (error) {
			throw new FassError(error.message, ctx);
		}
	};

	visitLabel = (ctx: LabelContext) => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);
		this.labels[name].address = this.address;
	};

	visitRemote_label_stmt = (ctx: Remote_label_stmtContext) => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);
		this.labels[name].address = this.visitAddress(ctx.address()).data;
	};

	visitFiller_stmt = (ctx: Filler_stmtContext) => {
		if (ctx.DEFAULT_KWD()) {
			this.filler = defaultFiller;
		} else {
			this.filler = this.visitStaticValue(ctx.staticValue()).data;
			if (this.filler > 0xff) {
				// WIP implement fillers of any length
				throw new FassError(
					`Filler value $${this.filler.toString(16)} is larger than $FF`,
					ctx
				);
			}
		}
	};

	//--------------------------------------------------------------------------> Statements
	// Statements translate to machine code & raw data, and produce binary output

	visitData_stmt = (ctx: Data_stmtContext) => {
		ctx._datas; // WIP should we use this instead?
		ctx.staticValue_list().forEach(data => {
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
		let ref: Reference;
		if (ctx.direct()) {
			ref = this.visitDirect(ctx.direct());
			this.append(opcodes.JMP.ABS);
		} else if (ctx.indirect()) {
			ref = this.visitIndirect(ctx.indirect());
			this.append(opcodes.JMP.IND);
		}
		this.append({
			data: ref!.address,
			endian: "little",
			length: 2
		} as Value);
	};

	visitGosub_stmt = (ctx: Gosub_stmtContext) => {
		const ref = this.visitDirect(ctx.direct());
		this.append(opcodes.JSR);
		this.append({
			data: ref!.address,
			endian: "little",
			length: 2
		} as Value);
	};

	visitReturn_stmt = (ctx: Return_stmtContext) => {
		if (ctx.RETURN_KWD()) {
			this.append(opcodes.RTS);
		} else if (ctx.RETINT_KWD()) {
			this.append(opcodes.RTI);
		}
	};

	visitBit_shift_stmt = (ctx: Bit_shift_stmtContext) => {
		// let addressing = "";
		// let ref: Reference | undefined;
		// if (ctx.A()) {
		// 	addressing = "ACC";
		// } else if (ctx.direct()) {
		// 	ref = this.visitDirect(ctx.direct());
		// } else if (ctx.indexed()) {
		// 	ref = this.visitIndexed(ctx.indexed());
		// }
		// else if (ctx.direct() || ctx.indexed()) {
		// 	ref = this.getLabel(ctx.direct()?.name() ?? ctx.indexed()?.name());
		// 	// ref.¿length? = 2;
		// } else throw new UnreachableCode(ctx);
	};
}
