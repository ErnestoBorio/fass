import { getOpcode } from "./opcodes";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";
import fassVisitor from "./parser/fassVisitor";
import { CharStream, InputStream, CommonTokenStream } from "antlr4";

export default class Fass extends fassVisitor {
	/**
	 * 1 byte values to be used as immediate values
	 * @type {Object<string, number>}
	 */
	constants = {};

	/**
	 * 2 byte values to be used as references
	 * It has to be stored in little endian order (lsb msb)
	 * @type {Object<string, number>}
	 */
	labels = {};

	/**
	 * A map of labels that are not yet resolved
	 * @type {Object<string, number[]>}
	 */
	forwardRefs = {};

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

	/**
	 * @param {string} name
	 */
	getLabel(name) {
		return this.labels[name?.toLowerCase()];
	}

	/**
	 * Appends bytes at the end of the output buffer
	 * @param {ArrayLike} data
	 * @returns {Uint8Array}
	 */
	addOutput(data) {
		data = new Uint8Array(data); // Cap to 8 bits
		let offset = this.output.byteLength; // append data in this position
		this.output.resize(offset + data.length); // grow buffer
		let view = new Uint8Array(this.output); // get a data view for .set()
		view.set(data, offset); // copy appended data
		return view;
	}

	/**
	 * Appends an operation with an optional argument to the outpout
	 * @param {string} mnemonic
	 * @param {Literal | Reference} [argument]
	 */
	outputInstruction(mnemonic, argument) {
		if (argument === undefined) {
			this.addOutput([getOpcode(mnemonic)]);
			return;
		}
		if (argument instanceof Literal) {
			this.addOutput([getOpcode(mnemonic, "IMM"), argument.value]);
			return;
		}
		if (argument instanceof Reference) {
			const reference = argument;
			this.addOutput([getOpcode(mnemonic, reference.addressing)]);
			if (!this.getLabel(reference.name)) {
				reference.name;
			}
			this.addOutput(littleEndian(reference.value));
			return;
		}
		throw new UnreachableCode();
	}

	/**
	 * @returns {ArrayBuffer}
	 */
	visitProgram(ctx) {
		this.visitChildren(ctx);
		return this.output;
	}

	// <Statement>
	visitRef_assign_stmt(ctx) {
		const reference = this.visitReference(ctx.reference());
		const register = this.visitRegister(ctx.register());
		const mnemonic = "ST" + register.toUpperCase();
		this.outputInstruction(mnemonic, reference);
		this.assembler.ST(ctx, reference, register);
	}

	visitReg_assign_stmt(ctx) {
		const register = this.visitRegister(ctx.register());
		const mnemonic = "LD" + register.toUpperCase();
		let giver = this.visitGiver(ctx.giver());
		this.outputInstruction(mnemonic, giver);
		this.assembler.LD(ctx, register, giver.text);
	}

	/**
	 * @param {fassParser.Bmp_headerContext} ctx
	 */
	visitBmp_header(ctx) {
		const width = ctx.bmp_width()?.DECIMAL()
			? this.visitDecimal(ctx.bmp_width()?.DECIMAL()).value
			: 24; // 24 pixels wide, as the C64
		if (width % 8 !== 0) {
			throw new FassError(`Bitmap width must be a multiple of 8`, ctx);
		}
		if (width > 64) {
			throw new FassError(`Bitmap must be 64 pixels wide or less`, ctx);
		}

		const height = ctx.bmp_height()?.DECIMAL()
			? this.visitDecimal(ctx.bmp_height()?.DECIMAL()).value
			: 0; // as many lines as defined by the bitmap

		return { width, height };
	}

	/**
	 * @param {fassParser.Bmp_lineContext} ctx
	 * @param {number} width
	 * @returns {number}
	 */
	visitBmp_line(ctx, width) {
		const charLine = ctx.PIXELS().getText();
		let bits = "";
		for (const char of charLine) {
			if (".0".includes(char)) {
				bits += "0";
			} else if ("#1".includes(char)) {
				bits += "1";
			} else {
				throw new UnreachableCode(ctx);
			}
			if (bits.length > width) {
				throw new FassError(
					`Line width ${bits.length} exceeds limit of ${width} bits`,
					ctx
				);
			}
		}
		const line = parseInt(bits, 2);
		return line;
	}

	/**
	 * @param {fassParser.BitmapContext} ctx
	 * @returns {object}
	 */
	visitBitmap(ctx) {
		const header = this.visitBmp_header(ctx.bmp_header());
		const lineContexts = ctx.bmp_body().bmp_line();
		const bytesPerLine = Math.ceil(header.width / 8);
		for (const lineCtx of lineContexts) {
			const line = this.visitBmp_line(lineCtx, header.width);
			const buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			view.setBigInt64(0, BigInt(line));
			const slice = buffer.slice(8 - bytesPerLine);
			this.addOutput(slice);
		}
		if (lineContexts.length < header.height) {
			const fill = new Uint8Array(bytesPerLine); // fill with all zeros lines
			for (let i = 0; i < header.height - lineContexts.length; i++) {
				this.addOutput(fill);
			}
		}
	}
	// </Statement>

	// <Reference>
	/**
	 * @param {fassParser.ReferenceContext} ctx
	 * @returns {Reference}
	 */
	visitReference(ctx) {
		let addressing;
		if (ctx.direct()) {
			addressing = "direct";
		} else if (ctx.indirect()) {
			addressing = "IND";
		} else if (ctx.indexed()) {
			addressing = "indexed";
		} else if (ctx.x_indirect()) {
			addressing = "INDX";
		} else if (ctx.indirect_y()) {
			addressing = "INDY";
		} else {
			throw new UnreachableCode(ctx);
		}

		let br = ctx.children[0]?.baseRef();
		let br2 = this.visitBaseRef(br);
		const reference = new Reference(br2);

		// TODO si el label existe, leer la address para ver si no es ZP
		const name = ctx.children[0]?.baseRef()?.name()?.getText();
		if (name) {
			reference.value = this.getLabel[name];
			if (
				reference.value &&
				reference.value < 0x100 &&
				["direct", "indexed"].contains(addressing)
			) {
				addressing = "ZP" + addressing;
			}
		}

		if (addressing === "direct" || addressing === "indexed") {
			if (addressing === "indexed") {
				addressing = ctx.children[0]?.X() ? "X" : "Y";
			} else {
				addressing = "";
			}
			addressing = (reference.value >= 0x100 ? "ABS" : "ZP") + addressing;
		}
		reference.addressing = addressing;
		return reference;
	}

	visitBaseRef(ctx) {
		if (ctx.name()) {
			return this.visitName(ctx.name());
		}
		if (ctx.literal_ref()) {
			return this.visitLiteral_ref(ctx.literal_ref());
		}
		throw new UnreachableCode(ctx);
	}

	visitName(ctx) {
		return { name: ctx.IDENTIFIER().getText() };
	}

	visitLiteral_ref(ctx) {
		return this.visitAddress(ctx.address());
	}
	// </Reference>

	/**
	 * @returns {Reference | Literal}
	 */
	visitGiver(ctx) {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		if (ctx.name()) {
			return this.visitName(ctx.name());
		}
		if (ctx.reference()) {
			return this.visitReference(ctx.reference());
		}
		throw new UnreachableCode(ctx);
	}

	visitRegister = ctx => (ctx.X() ? "x" : ctx.Y() ? "y" : ctx.A() ? "a" : "");

	visitAddress(ctx) {
		if (ctx.hexadecimal()) {
			return this.visitHexadecimal(ctx.hexadecimal());
		}
		return this.visitDecimal(ctx.decimal());
	}

	// <Literal>

	/**
	 * @returns {Literal}
	 */
	visitLiteral(ctx) {
		const literal = this.visit(ctx.children[0]);
		if (literal.value > 0xff || literal.value < -128) {
			throw new FassError(
				"Literal value must be 8 bits wide, [-128..255]",
				ctx
			);
		}
		return new Literal(literal);
	}

	visitDecimal(ctx) {
		return {
			value: parseInt(ctx.getText(), 10),
			text: ctx.getText()
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

/**
 * Compiles a source code string into a Fass parser
 * @param {string} source
 * @returns {fassParser}
 */
export function compile(source) {
	const chars = new InputStream(source);
	const stream = new CharStream(chars.toString());
	const lexer = new fassLexer(stream);
	const tokens = new CommonTokenStream(lexer);
	const parser = new fassParser(tokens);
	return parser;
}

/**
 * Runs the Fass parser and returns the output
 * @param {fassParser} parser
 * @returns {ArrayBuffer}
 */
export function run(parser) {
	return new Fass().visit(parser);
}

/**
 * Compiles and runs the Fass source code
 * @param {string} source
 * @param {string} [rule]
 * @returns {ArrayBuffer}
 */
export function comparse(source, rule) {
	const parser = compile(source);
	let tree;
	if (rule) {
		tree = parser[rule]();
	} else {
		tree = parser.program();
	}
	return run(tree);
}

export class FassError extends Error {
	message;

	constructor(message, ctx) {
		super();
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

class Literal {
	/** @type {number} */
	value;

	/** @type {string} */
	text;

	/**
	 * @param {object} params
	 * @param {number} params.value
	 * @param {string} params.text
	 */
	constructor({ value, text }) {
		this.value = value;
		this.text = text;
	}
}

class Reference {
	/** @type {string} */
	text;

	/** @type {string} */
	addressing;

	/**
	 * If undefined, it's a forward reference
	 * @type {number | undefined}
	 */
	value;

	/** @type {string | undefined} */
	name;

	/**
	 * @param {object} params
	 * @param {string} params.text
	 * @param {number} [params.value]
	 * @param {string} params.addressing
	 * @param {string} [params.name]
	 */
	constructor({ text, addressing, value, name }) {
		this.text = text;
		this.addressing = addressing;
		this.value = value;
		this.name = name;
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
	ST(ctx, reference, register) {
		return `ST${register.toUpperCase()} ${reference} ; line ${ctx.start.line}`;
	}

	/**
	 * Adds a STA, STX or STY statement
	 * @param {antlr4.ParserRuleContext} ctx
	 * @param {string} register
	 * @param {string} giver The value to be stored, reference or literal
	 * @returns {string}
	 */
	LD(ctx, register, giver) {
		return `LD${register.toUpperCase()} ${giver} ; line ${ctx.start.line}`;
	}
}

/**
 * Serializes number as an array of 1 byte or 2 bytes as little endian
 * @param {number} data
 * @returns {number[]}
 */
function serialize(data) {
	if (data <= 0xff) {
		return [data];
	}
	return littleEndian(data);
}

/**
 * Turns a 16 bit number into a little endian array of its bytes
 * @param {number} data
 * @returns {[number, number]}
 */
function littleEndian(data) {
	return [data & 0xff, (data & 0xff00) >> 8];
}
