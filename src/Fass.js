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
	 * @TODO not yet implemented
	 * // const forwardRefPlaceholder = 0xfa55;
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
	 * Retrieves a label's value
	 * @param {string} name
	 */
	getLabel(name) {
		name = name?.toLowerCase();
		if (this.labels[name] !== undefined) {
			return this.labels[name];
		}
		if (this.constants[name] !== undefined) {
			throw new FassError(`Label ${name} is defined as a constant`);
		}
		throw new FassError(
			`Label ${name} is not defined. Forward references are not implemented yet`
		);
	}

	/**
	 * Retrieves a constant's value
	 * @param {string} name
	 */
	getConst(name) {
		name = name?.toLowerCase();
		if (this.constants[name] !== undefined) {
			return this.constants[name];
		}
		if (this.labels[name] !== undefined) {
			throw new FassError(`Constant ${name} is defined as a label`);
		}
		throw new FassError(`Constant ${name} is not defined`);
	}

	/**
	 * Retrieves a name's value whether it's a label or a constant
	 * @param {string} name
	 * @returns {{type: "label" | "constant", value: number}}
	 */
	getName(name) {
		name = name?.toLowerCase();
		if (this.labels[name] !== undefined) {
			return {
				type: "label",
				value: this.labels[name]
			};
		}
		if (this.constants[name] !== undefined) {
			return {
				type: "constant",
				value: this.constants[name]
			};
		}
		throw new FassError(`Name ${name} is not defined`);
	}

	/**
	 * Appends bytes at the end of the output buffer. Advances address accordingly
	 * @param {ArrayLike} data
	 * @returns {Uint8Array}
	 */
	addOutput(data) {
		if (!(data instanceof ArrayBuffer) && typeof data.length !== "number") {
			throw new FassError("addOutput(): data must be an array-like object");
		}
		data = new Uint8Array(data); // Cap to 8 bits
		let offset = this.output.byteLength; // append data in this position
		this.output.resize(offset + data.length); // grow buffer
		let view = new Uint8Array(this.output); // get a data view for .set()
		view.set(data, offset); // copy appended data
		this.address += data.length;
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
		if (["literal", "constant"].includes(argument.type)) {
			this.addOutput([getOpcode(mnemonic, "IMM"), argument.value]);
			return;
		}
		if (argument.type === "reference") {
			const reference = argument;
			this.addOutput([getOpcode(mnemonic, reference.addressing)]);
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

	visitLabel(ctx) {
		this.createLabel(ctx.IDENTIFIER().getText(), this.address);
	}

	visitRemote_label_stmt(ctx) {
		const address = this.visitAddress(ctx.address()).value;
		this.createLabel(ctx.IDENTIFIER().getText(), address);
	}

	createLabel(name, address) {
		const nameLc = name.toLowerCase();
		if (this.labels[nameLc] !== undefined) {
			throw new FassError(`Label ${name} is already defined`);
		} else if (this.constants[nameLc] !== undefined) {
			throw new FassError(`Label ${name} is already defined as a constant`);
		}
		this.labels[nameLc] = address;
	}

	/**
	 * @param {Filler_stmtContext} ctx
	 */
	visitFiller_stmt(ctx) {
		const filler = this.visitStatic_value(ctx.static_value()).value;
		if (filler > 0xff) {
			throw new FassError(
				`Filler value ${filler} has to be 8 bits wide, [-128..255]`,
				ctx
			);
		}
		this.filler = filler;
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

	/**
	 * @param {fassParser.Address_stmtContext} ctx
	 */
	visitAddress_stmt(ctx) {
		const address = this.visitAddress(ctx.address()).value;
		if (address < this.address) {
			throw new FassError(
				`Address ${address} is lower than current address ${this.address}`,
				ctx
			);
		} else if (this.output.byteLength > 0) {
			// Only fill if there's already some output
			const delta = address - this.address;
			const fill = new Uint8Array(delta).fill(this.filler);
			this.addOutput(fill);
		}
		this.address = address;
	}

	/** @param {fassParser.Data_stmtContext} ctx */
	visitData_stmt(ctx) {
		ctx.static_value().forEach(value => {
			const data = this.visitStatic_value(value).value;
			// @TODO datas greater than 32 bits are not supported
			// Shrinkwrap a typed array to hold data without leading zeros
			const buffer = new ArrayBuffer(4);
			const array = new Uint8Array(buffer);
			const view = new DataView(buffer);
			view.setUint32(0, data, false);
			let length = 4;
			if (array[0] === 0) {
				length = 3;
				if (array[1] === 0) {
					length = 2;
					if (array[2] === 0) {
						length = 1;
					}
				}
			}
			// Slices leading zeros out
			const final = array.slice(4 - length, 4);
			this.addOutput(final);
		});
	}

	/** @param {fassParser.Stack_stmtContext} ctx */
	visitStack_stmt(ctx) {
		if (ctx.PUSH_KWD()) {
			if (ctx.A()) {
				this.addOutput([getOpcode("PHA")]);
			} else if (ctx.FLAGS_KWD()) {
				this.addOutput([getOpcode("PHP")]);
			}
		} else if (ctx.PULL_KWD()) {
			if (ctx.A()) {
				this.addOutput([getOpcode("PLA")]);
			} else if (ctx.FLAGS_KWD()) {
				this.addOutput([getOpcode("PLP")]);
			}
		}
	}

	/** @param {fassParser.Goto_stmtContext} ctx*/
	visitGotosub_stmt(ctx) {
		const ref = this.visitReference(ctx.reference());
		let addressing;
		if (ref.addressing === "ABS") {
			addressing = "ABS";
		} else if (ref.addressing === "IND") {
			addressing = "IND";
		} else {
			throw new FassError(
				"GOTO statement must have direct or indirect addressing",
				ctx
			);
		}

		let instruction;
		if (ctx.GOTO_KWD()) {
			instruction = "JMP";
		} else if (ctx.GOSUB_KWD()) {
			instruction = "JSR";
		} else {
			throw new UnreachableCode(ctx);
		}

		this.addOutput([getOpcode(instruction, addressing)]);
		this.addOutput(littleEndian(ref.value));
	}

	/** @param {fassParser.Return_stmtContext} ctx */
	visitReturn_stmt(ctx) {
		if (ctx.RETURN_KWD()) {
			this.addOutput([getOpcode("RTS")]);
		} else if (ctx.RETINT_KWD()) {
			this.addOutput([getOpcode("RTI")]);
		} else {
			throw new UnreachableCode(ctx);
		}
	}

	/** @param {fassParser.Bit_shift_stmtContext} ctx */
	visitBit_shift_stmt(ctx) {
		let mnemonic;
		if (ctx.LSR_KWD()) {
			mnemonic = "LSR";
		} else if (ctx.ASL_KWD()) {
			mnemonic = "ASL";
		} else if (ctx.ROL_KWD()) {
			mnemonic = "ROL";
		} else if (ctx.ROR_KWD()) {
			mnemonic = "ROR";
		} else {
			throw new UnreachableCode(ctx);
		}

		if (ctx.A()) {
			this.addOutput([getOpcode(mnemonic, "ACC")]);
		} else if (ctx.reference()) {
			const ref = this.visitReference(ctx.reference());
			if (!["ZP", "ZPX", "ABS", "ABSX"].includes(ref.addressing)) {
				throw new FassError(
					`Bit shift instruction must use A or direct addressing`,
					ctx
				);
			}
			this.addOutput([getOpcode(mnemonic, ref.addressing)]);
			this.addOutput(littleEndian(ref.value));
		} else {
			throw new UnreachableCode(ctx);
		}
	}

	// </Statement>

	// <Reference>
	/**
	 * @param {fassParser.ReferenceContext} ctx
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

		let reference = this.visitBaseRef(ctx.children[0]?.baseRef());

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
			return {
				...this.visitName(ctx.name()),
				value: this.getLabel(ctx.name().getText()),
				type: "reference"
			};
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
		return {
			...this.visitAddress(ctx.address()),
			type: "reference"
		};
	}
	// </Reference>

	/**
	 * @returns {Reference | Literal}
	 */
	visitGiver(ctx) {
		if (ctx.literal()) {
			const literal = this.visitLiteral(ctx.literal());
			if (literal.value > 0xff || literal.value < -128) {
				throw new FassError(
					"Literal parameter must be 8 bits wide, [-128..255]",
					ctx
				);
			}
			return literal;
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

	// <Values>

	/** @param {Static_valueContext} ctx */
	visitStatic_value(ctx) {
		if (ctx.literal()) {
			return this.visitLiteral(ctx.literal());
		}
		const name = ctx.name().IDENTIFIER().getText();
		const constant = this.getConst(name);
		return {
			value: constant,
			text: name,
			type: "constant"
		};
	}

	/**
	 * @returns {{value: number, text: string}}
	 */
	visitLiteral(ctx) {
		return {
			...this.visit(ctx.children[0]),
			type: "literal"
		};
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
		const value = parseInt(ctx.NEGATIVE_NUMBER().getText(), 10);
		if (value < -128) {
			throw new FassError(
				`Negative number ${value} must be 8 bits wide, greater or equal than -128`,
				ctx
			);
		}
		return {
			value: value & 0xff,
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
	// </Values>
}

/**
 * Compiles a source code string into a Fass parser
 * @param {string} source
 * @returns {fassParser}
 */
function compile(source) {
	const chars = new InputStream(source);
	const stream = new CharStream(chars.toString());
	const lexer = new fassLexer(stream);
	const tokens = new CommonTokenStream(lexer);
	const parser = new fassParser(tokens);
	return parser;
}

/**
 * Runs the Fass source code
 * @param {string} source
 * @param {string} [rule]
 * @returns {{fass: Fass, output: ArrayBuffer}}
 */
export function run(source, rule) {
	const parser = compile(source);
	let tree;
	if (rule) {
		tree = parser[rule]();
	} else {
		tree = parser.program();
	}
	const fass = new Fass();
	return {
		fass,
		output: fass.visit(tree)
	};
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
	if (data <= 0xff) {
		return [data];
	}
	return [data & 0xff, (data & 0xff00) >> 8];
}
