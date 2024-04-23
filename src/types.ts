import { ParserRuleContext } from "antlr4";

type Endianness = "big" | "little";

export type Hash<Type> = {
	[key: string]: Type;
};

export class Value {
	data: number;
	length: 1 | 2 = 1;
	endian: Endianness = "big";

	constructor(data: number, length: 1 | 2 = 1, endian: Endianness = "big") {
		this.data = data;
		this.length = length;
		this.endian = endian;
	}
}

export class Reference {
	label: string;
	address?: number;
	addressing?: Addressing;
}

export enum Addressing {
	A = "ACC",
	immediate = "IMM",
	zeroPage = "ZP",
	zeroPageX = "ZPX",
	zeroPageY = "ZPY",
	absolute = "ABS",
	absoluteX = "ABSX",
	absoluteY = "ABSY",
	indirect = "IND",
	indirectX = "INDX",
	indirectY = "INDY",
	relative = "REL"
}

export class Slice {
	private buffer: Buffer;
	private slice: Buffer;

	constructor(source: Buffer, offset?: number, end?: number) {
		this.buffer = source;
		this.slice = this.buffer.subarray(offset, end);
	}

	getLength = () => this.slice.length;

	append(data: Buffer) {
		if (this.slice.byteOffset + data.length > this.buffer.length) {
			throw new Error("Buffer overflow");
		}
		// Reslice the buffer to get a larger slice
		this.slice = this.buffer.subarray(
			this.slice.byteOffset,
			this.slice.byteOffset + data.length
		);
		data.copy(this.slice, this.slice.length - data.length, 0, data.length);
	}

	write(data: Buffer, offset: number) {
		if (offset + data.length > this.slice.length) {
			throw new Error("Buffer overflow");
		}
		data.copy(this.slice, offset, 0, data.length);
	}
}

export class FassError implements Error {
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

export class UnreachableCode extends FassError {
	constructor(ctx?: ParserRuleContext) {
		super(`Unreachable code`, ctx);
	}
}

/** Default filler byte, $EA = NOP */
export const defaultFiller = 0xea;
