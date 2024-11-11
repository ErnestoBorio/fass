import getOpcode from "./opcodes";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";
import fassVisitor from "./parser/fassVisitor";
import { CharStream, InputStream, CommonTokenStream } from "antlr4";

export default class Fass extends fassVisitor {
	/**
	 * 1 byte values to be used as immediate values
	 */
	constants = new Map();
	/**
	 * 2 byte values to be used as references
	 * It has to be stored in little endian order (lsb msb)
	 */
	labels = new Map();
	/**
	 * Default byte used to fill in gaps when needed
	 */
	filler = 0xea; // default is NOP
	/**
	 * The binary output of the program. 64Kb are pre-allocated at start
	 */
	output = new ArrayBuffer(0, { maxByteLength: 0x10000 });
	/**
	 * Address corresponding to the next byte to go to the output
	 */
	address = 0;
	/**
	 * An assembly language logger
	 */
	assembler = new Assembler();

	/** Returns the address pointed to by the given label */
	getLabel = label => this.labels.get(label);

	addOutput(data) {
		data = new Uint8Array(data); // Cap to 8 bits
		let offset = this.output.length; // append data in this position
		let output = Uint8Array(this.ouput); // get a data view for .set()
		this.output.resize(output.length + data.length); // grow buffer
		output.set(data, offset); // copy appended data
	}

	// <Statement>
	visitRef_assign_stmt(ctx) {
		const reference = this.visitReference(ctx.reference());
		const register = this.visitRegister(ctx.register());

		// Should be overwritten with the actual label address when it's found
		reference.value = reference.value ?? 0xadde; // big endian $DEAD

		const mnemonic = "ST" + register.toUpperCase();
		const opcode = getOpcode(mnemonic, reference.addressing);
		this.addOutput([opcode, ...littleEndian(reference.value)]);
		this.assembler.store(ctx, reference, register);
	}
	// </Statement>

	// <Reference>
	visitReference(ctx) {
		const baseRef = this.visitBaseRef(ctx.children[0]?.baseRef());
		let addressing = ctx.direct()
			? "direct"
			: ctx.indirect()
				? "indirect"
				: ctx.indexed()
					? "indexed"
					: ctx.x_indirect()
						? "indexed indirect X"
						: ctx.indirect_y()
							? "indirect indexed Y"
							: this.visitIndexed(ctx.indexed);

		// TODO si el label existe, leer la address para ver si no es ZP
		let reference = {
			...baseRef
		};

		let name = ctx.children[0]?.baseRef()?.name()?.getText();
		if (name) {
			const value = this.getLabel(name);
			if (value !== undefined) {
				reference.value = value;
			}
		}

		if (addressing === "direct" || addressing === "indexed") {
			if (addressing === "indexed") {
				addressing = ", " + (ctx.children[0]?.X() ? "X" : "Y");
			}
			addressing =
				(reference.value >= 0x100 ? "absolute" : "zero page") + addressing;
		}
		reference.addressing = addressing;
		return reference;
	}

	visitIndexed(ctx) {
		return {
			...this.visitBaseRef(ctx.baseRef()),
			addressing: "indexed " + (ctx.X() ? "X" : "Y")
		};
	}

	visitBaseRef(ctx) {
		return { ...this.visit(ctx.children[0]) };
	}

	visitName(ctx) {
		return { name: ctx.IDENTIFIER().getText() };
	}

	visitLiteral_ref(ctx) {
		return this.visitAddress(ctx.address());
	}
	// </Reference>

	visitRegister = ctx => (ctx.X() ? "x" : ctx.Y() ? "y" : "a");

	visitAddress(ctx) {
		if (ctx.hexadecimal()) {
			return this.visitHexadecimal(ctx.hexadecimal());
		}
		return this.visitDecimal(ctx.decimal());
	}

	// <Literal>
	visitDecimal(ctx) {
		return {
			value: parseInt(ctx.DECIMAL().getText(), 10),
			text: ctx.DECIMAL().getText()
		};
	}

	visitHexadecimal(ctx) {
		return {
			value: parseInt(ctx.HEXADECIMAL().getText().slice(1), 16),
			text: ctx.HEXADECIMAL().getText()
		};
	}

	visitBinary(ctx) {
		return {
			value: parseInt(ctx.BINARY().getText().slice(1), 2),
			text: ctx.BINARY().getText()
		};
	}

	visitNegative_number(ctx) {
		return {
			value: (0x100 + parseInt(ctx.NEGATIVE_NUMBER().getText(), 10)) & 0xff,
			text: ctx.NEGATIVE_NUMBER().getText()
		};
	}

	visitOpcode_literal(ctx) {
		if (ctx.NOP()) {
			return {
				value: getOpcode("NOP"),
				text: ctx.NOP().getText()
			};
		} else if (ctx.BRK()) {
			return {
				value: getOpcode("BRK"),
				text: ctx.BRK().getText()
			};
		} else if (ctx.NOP3()) {
			return {
				value: getOpcode("NOP3"),
				text: ctx.NOP3().getText()
			};
		}
		throw new UnreachableCode(ctx);
	}
	// </Literal>
}

export function compile(source) {
	const chars = new InputStream(source);
	const stream = new CharStream(chars.toString());
	const lexer = new fassLexer(stream);
	const tokens = new CommonTokenStream(lexer);
	const parser = new fassParser(tokens);
	return parser;
}

class FassError extends Error {
	message;

	constructor(message, ctx) {
		if (ctx) {
			const col = ctx.start.column;
			const line = ctx.start.line;
			this.message = `Line ${line}:${col} ${message}`;
		} else {
			this.message = message;
		}
	}

	toString() {
		return this.message;
	}
}

class UnreachableCode extends FassError {
	constructor(ctx) {
		super(`Unreachable code`, ctx);
	}
}

class Assembler {
	/**
	 * Adds a LDA, LDX or LDY statement
	 * @param {antlr4.ParserRuleContext} ctx
	 * @param {string} register
	 * @param {string} reference
	 * @returns {string}
	 */
	store(ctx, reference, register) {
		const line = `ST${register.toUpperCase()} ${reference} ; line ${ctx.start.line}`;
		console.debug(line);
		return line;
	}
}

/**
 * Turns a 16 bit number into a big endian array of its bytes
 */
function unpackBytes(data) {
	return [data >> 8 && 0xff, data && 0xff];
}

/**
 * Turns a 16 bit number into a little endian array of its bytes
 * @param {*} data
 * @returns
 */
function littleEndian(data) {
	return [data && 0xff, data >> 8 && 0xff];
}
