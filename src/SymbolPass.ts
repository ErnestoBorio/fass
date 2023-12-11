import fassVisitor from "./parser/fassVisitor.js";
import { ParserRuleContext } from "antlr4";
import {
	BinaryContext,
	Const_stmtContext,
	DecimalContext,
	HexadecimalContext,
	LiteralContext,
	Negative_numberContext,
	Opcode_literalContext,
	StaticValueContext,
} from "./parser/fassParser.js";
import { opcodes } from "./opcodes";

class FassError implements Error {
	name: string;
	message: string;

	constructor(message: string, ctx?: ParserRuleContext) {
		if (ctx) {
			const col = ctx.start!.column;
			const line = ctx.start!.line;
			this.message = `Line ${line}:${col} ${message}`;
		} else {
			this.message = message;
		}
	}

	toString() {
		return this.message;
	}
}

type Value = string;

export default class SymbolPass extends fassVisitor<any> {
	constants = new Map<string, Value>();
	labels = new Map<string, Value>();

	visitConst_stmt = (ctx: Const_stmtContext): any => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		if (this.constants.has(name)) {
			throw new FassError(`Constant ${name} already exists`, ctx);
		}

		const value = this.visitStaticValue(ctx.staticValue());
		this.constants.set(name, value);
	};

	visitStaticValue = (ctx: StaticValueContext): any => {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			const name = ctx.name().getText().toLowerCase();
			if (this.constants.has(name)) {
				return this.constants.get(name);
			}
			throw new FassError(`Constant ${name} is not defined`, ctx);
		}
	};

	visitLiteral = (ctx: LiteralContext): any => {
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
	};

	visitHexadecimal = (ctx: HexadecimalContext): any => {
		const hex = ctx.HEXADECIMAL().getText().substring(1);
		const value = parseInt(hex, 16);
		if (value > 0xffff) {
			throw new FassError(
				`Value $${hex} not allowed, it's larger than $FFFF, (16 bits)`,
				ctx,
			);
		}
		return value;
	};

	visitDecimal = (ctx: DecimalContext): any => {
		const dec = ctx.DECIMAL().getText();
		const value = parseInt(dec);
		if (value > 0xffff) {
			throw new FassError(
				`Value ${dec} not allowed, it's larger than 65535, (16 bits)`,
				ctx,
			);
		}
		return value;
	};

	visitBinary = (ctx: BinaryContext): any => {
		const bin = ctx.BINARY().getText().substring(1);
		const value = parseInt(bin, 2);
		if (value > 0xffff) {
			throw new FassError(
				`Value %${bin} not allowed, it's larger than 65535 (16 bits)`,
				ctx,
			);
		}
		return value;
	};

	visitNegative_number = (ctx: Negative_numberContext): any => {
		const neg = parseInt(ctx.NEGATIVE_NUMBER().getText());
		if (neg < -128) {
			throw new FassError(
				`Value ${neg} not allowed, negative values must be in range -128..-1 (8 bits with sign bit set to 1)`,
				ctx,
			);
		}
		return neg;
	};

	visitOpcode_literal = (ctx: Opcode_literalContext): any => {
		const opcode = ctx.getText().toUpperCase();
		return opcodes[opcode];
	};
}
