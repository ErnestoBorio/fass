import { opcodes } from "./opcodes";
import { FassError, UnreachableCode } from "./error";
import fassVisitor from "./parser/fassVisitor";
import { ParserRuleContext } from "antlr4";
import {
	LabelContext,
	BinaryContext,
	DecimalContext,
	AddressContext,
	LiteralContext,
	Data_stmtContext,
	Const_stmtContext,
	StaticValueContext,
	HexadecimalContext,
	Filler_stmtContext,
	Address_stmtContext,
	Flag_set_stmtContext,
	Opcode_literalContext,
	Negative_numberContext,
	Remote_label_stmtContext
} from "./parser/fassParser";

class Value {
	data: number;
	length: number;
	endian: "big" | "little" = "big";
}

type Hash<Type> = {
	[key: string]: Type;
};

/** Default filler byte, $EA = NOP */
const defaultFiller = 0xea;

export default class Fass extends fassVisitor<any> {
	constants = {} as Hash<Value>;
	labels = {} as Hash<number>;
	filler = defaultFiller;

	/** Binary output of the program */
	output = Buffer.alloc(0x10000);

	/** The address where next output will be written */
	address = 0;

	/** The address of the first byte of the output */
	startAddress = 0;

	//--------------------------------------------------------------------------> Utility functions

	/** Checks if the given name is unique and throws otherwise */
	checkNameIsUnique(name: string, ctx?: ParserRuleContext) {
		if (this.labels[name] || this.constants[name]) {
			throw new FassError(`Name ${name} is already defined`, ctx);
		}
	}

	/** Fill the output buffer with {length} times this.filler */
	fill(length: number) {
		// WIP adjust this with the starting address
		this.output = this.output.fill(this.filler, this.address, length);
	}

	/** Write a value to the output buffer */
	outputValue(value: Value) {
		this.output.writeUintBE(
			value.data,
			this.address - this.startAddress,
			value.length
		);
		this.address += value.length;
	}

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
			data: neg,
			length: 1
		} as Value;
	};

	visitOpcode_literal = (ctx: Opcode_literalContext): Value => {
		const opcode = ctx.getText().toUpperCase();
		return {
			data: opcodes[opcode],
			length: 1
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

	//--------------------------------------------------------------------------> Declarations
	// Declarations define things but don't produce binary output

	visitAddress_stmt = (ctx: Address_stmtContext) => {
		const newAddress = this.visitAddress(ctx.address()).data;

		if (this.address === 0) {
			// First time setting the address
			this.startAddress = newAddress;
			this.address = newAddress;
		}

		if (newAddress < this.address) {
			throw new FassError(
				`Can't set new address ${newAddress} lower than current address ${this.address}`,
				ctx
			);
		}
		if (newAddress - this.address > 0) {
			this.fill(newAddress - this.address);
		}
		this.address = newAddress;
	};

	visitLabel = (ctx: LabelContext) => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);
		this.labels[name] = this.address;
	};

	visitRemote_label_stmt = (ctx: Remote_label_stmtContext) => {
		const name = ctx.IDENTIFIER().getText().toLowerCase();
		this.checkNameIsUnique(name);
		this.labels[name] = this.visitAddress(ctx.address()).data;
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
			this.outputValue(value);
		});
	};

	visitFlag_set_stmt = (ctx: Flag_set_stmtContext) => {
		if (ctx.CARRY()) {
			if (ctx.BIT().getText() === "0") {
				this.outputValue({
					data: opcodes["CLC"],
					length: 1
				} as Value);
			} else if (ctx.BIT().getText() === "1") {
				this.outputValue({
					data: opcodes["SEC"],
					length: 1
				} as Value);
			}
		} else if (ctx.INTERRUPT()) {
			if (ctx.BIT().getText() === "0") {
				this.outputValue({
					data: opcodes["CLI"],
					length: 1
				} as Value);
			} else if (ctx.BIT().getText() === "1") {
				this.outputValue({
					data: opcodes["SEI"],
					length: 1
				} as Value);
			}
		} else if (ctx.DECIMAL_MODE()) {
			if (ctx.BIT().getText() === "0") {
				this.outputValue({
					data: opcodes["CLD"],
					length: 1
				} as Value);
			} else if (ctx.BIT().getText() === "1") {
				this.outputValue({
					data: opcodes["SED"],
					length: 1
				} as Value);
			}
		} else if (ctx.OVERFLOW()) {
			if (ctx.BIT().getText() === "0") {
				this.outputValue({
					data: opcodes["CLV"],
					length: 1
				} as Value);
			} else if (ctx.BIT().getText() === "1") {
				throw new FassError(
					`The overflow flag can't be set programmatically`,
					ctx
				);
			}
		}
	};
}