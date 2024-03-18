import { Core } from "./Core";
import { opcodes } from "./opcodes";
import fassVisitor from "./parser/fassVisitor";
import { Value, FassError, UnreachableCode, defaultFiller } from "./types";
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
	Indirect_yContext,
	X_indirectContext,
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
		const name = ctx.IDENTIFIER().getText();
		const value = this.visitStaticValue(ctx.staticValue());
		this.core.setConstant(name, value.data);
	};

	visitStaticValue = (ctx: StaticValueContext): Value => {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			const name = ctx.name().getText().toLowerCase();
			if (this.core.getConstant(name)) {
				return {
					data: this.core.getConstant(name)
				} as Value;
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
	doReference = (
		ctx:
			| DirectContext
			| IndirectContext
			| IndexedContext
			| Indirect_yContext
			| X_indirectContext
	) => {
		return this.core.getLabel(ctx.name());
	};
	visitDirect = this.doReference;
	visitIndexed = this.doReference;
	visitIndirect = this.doReference;
	visitIndirect_y = this.doReference;
	visitX_indirect = this.doReference;

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
		this.core.setLabel(ctx.IDENTIFIER().getText(), this.core.getAddress());
	};

	visitRemote_label_stmt = (ctx: Remote_label_stmtContext) => {
		this.core.setLabel(
			ctx.IDENTIFIER().getText(),
			this.visitAddress(ctx.address()).data
		);
	};

	visitFiller_stmt = (ctx: Filler_stmtContext) => {
		if (ctx.DEFAULT_KWD()) {
			this.core.filler = defaultFiller;
		} else {
			this.core.filler = this.visitStaticValue(ctx.staticValue()).data;
			if (this.core.filler > 0xff) {
				// WIP implement fillers of any length
				const filler = this.core.filler;
				throw new FassError(
					`Filler value $${filler} is larger than $FF`,
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
			this.core.append(value);
		});
	};

	visitFlag_set_stmt = (ctx: Flag_set_stmtContext) => {
		if (ctx.CARRY()) {
			if (ctx.BIT().getText() === "0") {
				this.core.append(opcodes.CLC);
			} else if (ctx.BIT().getText() === "1") {
				this.core.append(opcodes.SEC);
			}
		} else if (ctx.INTERRUPT()) {
			if (ctx.BIT().getText() === "0") {
				this.core.append(opcodes.CLI);
			} else if (ctx.BIT().getText() === "1") {
				this.core.append(opcodes.SEI);
			}
		} else if (ctx.DECIMAL_MODE()) {
			if (ctx.BIT().getText() === "0") {
				this.core.append(opcodes.CLD);
			} else if (ctx.BIT().getText() === "1") {
				this.core.append(opcodes.SED);
			}
		} else if (ctx.OVERFLOW()) {
			if (ctx.BIT().getText() === "0") {
				this.core.append(opcodes.CLV);
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
				this.core.append(opcodes.PHA);
			} else if (ctx.FLAGS_KWD()) {
				this.core.append(opcodes.PHP);
			}
		} else if (ctx.PULL_KWD()) {
			if (ctx.A()) {
				this.core.append(opcodes.PLA);
			} else if (ctx.FLAGS_KWD()) {
				this.core.append(opcodes.PLP);
			}
		}
	};

	visitGoto_stmt = (ctx: Goto_stmtContext) => {
		let address: number;
		if (ctx.direct()) {
			address = this.visitDirect(ctx.direct());
			this.core.append(opcodes.JMP.ABS);
		} else if (ctx.indirect()) {
			address = this.visitIndirect(ctx.indirect());
			this.core.append(opcodes.JMP.IND);
		} else throw new UnreachableCode(ctx);
		this.core.append({
			data: address,
			endian: "little",
			length: 2
		} as Value);
	};

	visitGosub_stmt = (ctx: Gosub_stmtContext) => {
		const address = this.visitDirect(ctx.direct());
		this.core.append(opcodes.JSR);
		this.core.append({
			data: address,
			endian: "little",
			length: 2
		} as Value);
	};

	visitReturn_stmt = (ctx: Return_stmtContext) => {
		if (ctx.RETURN_KWD()) {
			this.core.append(opcodes.RTS);
		} else if (ctx.RETINT_KWD()) {
			this.core.append(opcodes.RTI);
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
			return this.core.append(opcodes[mnemonic].ACC);
		}
		const addressing = this.core.getAddressing(ctx.direct() ?? ctx.indexed());
		return this.core.append(opcodes[mnemonic][addressing]);
	};
}
