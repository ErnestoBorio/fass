import {
	BinaryContext,
	Const_stmtContext,
	DecimalContext,
	HexadecimalContext,
	LiteralContext,
	Negative_numberContext,
	Opcode_literalContext,
	Remote_label_stmtContext,
	StaticValueContext,
} from "./parser/fassParser";
import { opcodes } from "./opcodes";
import { FassError } from "./error";
import fassVisitor from "./parser/fassVisitor";
import { ParserRuleContext } from "antlr4";

type Value = number;

type Hash = {
	[key: string]: Value;
};

export default class SymbolPass extends fassVisitor<any> {
	constants: Hash = {};
	labels: Hash = {};
	output = new Uint8Array(0x10000);

	/**
	 * Check if the given name is unique and throw an error if it is not.
	 *
	 * @param {string} name - the name to check for uniqueness
	 * @param {ParserRuleContext} [ctx] - the parser context
	 */
	checkNameIsUnique(name: string, ctx?: ParserRuleContext) {
		if (this.labels[name] || this.constants[name]) {
			throw new FassError(`Name ${name} is already defined`, ctx);
		}
	}

	visitConst_stmt = (ctx: Const_stmtContext): any => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);

		const value = this.visitStaticValue(ctx.staticValue());
		this.constants[name] = value;
	};

	visitStaticValue = (ctx: StaticValueContext): any => {
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

	visitRemote_label_stmt = (ctx: Remote_label_stmtContext): any => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);

		let address: number;
		if (ctx.address().hexadecimal()) {
			address = this.visitHexadecimal(ctx.address().hexadecimal());
		} else if (ctx.address().decimal()) {
			address = this.visitDecimal(ctx.address().decimal());
		} else {
			throw new FassError(
				`This code should be unreachable, address must be a hexadecimal or decimal number`,
				ctx.address(),
			);
		}
		this.labels[name] = address;
	};
}
