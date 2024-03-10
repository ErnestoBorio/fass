export type Optional<Type> = Type | undefined;

type Endianness = "big" | "little";

type Length = 1 | 2;

export type Hash<Type> = {
	[key: string]: Type;
};

export class Value {
	data: number;
	length: number = 1;
	endian: Endianness = "big";
}

export class Reference {
	address: number;
	length: number;
}

export class Label {
	address: Optional<number>;
	offset: Optional<number>;
}

export class Slice {
	private buffer: Buffer;
	private slice: Buffer;
	private offset: number;

	constructor(source: Buffer, offset?: number, end?: number) {
		this.buffer = source;
		this.offset = offset || 0;
		this.slice = this.buffer.subarray(offset, end);
	}

	private grow(length: number) {
		if (this.offset + length > this.buffer.length) {
			throw new Error("Buffer overflow");
		}
		// Reslice the buffer to get a larger slice
		this.slice = this.buffer.subarray(this.offset, this.offset + length);
	}

	append(data: Buffer) {
		if (this.offset + data.length > this.buffer.length) {
			throw new Error("Buffer overflow");
		}
		// Reslice the buffer to get a larger slice
		this.slice = this.buffer.subarray(this.offset, this.offset + data.length);
		data.copy(this.slice, this.slice.length - data.length, 0, data.length);
	}
}
