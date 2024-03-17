import { ParserRuleContext } from "antlr4";
import { NameContext } from "./parser/fassParser";
import {
	Hash,
	Value,
	Slice,
	FassError,
	defaultFiller,
	UnreachableCode
} from "./types";

export class Core {
	private constants = {} as Hash<number>;
	private labels = {} as Hash<number>;
	/** List of references to yet undefined labels, and their output offset */
	private forwardRefs = {} as Hash<number[]>;

	filler = defaultFiller;

	/** Binary output of the program */
	private output: Slice;

	/** The address where next output will be written */
	private address = 0;

	/** The address of the first byte of the output */
	private startAddress = 0;

	constructor() {
		// Allocates 64KB and stores an empty slice from it
		this.output = new Slice(Buffer.alloc(0x10000), 0, 0);
	}

	/** Checks if the given name is unique and throws otherwise */
	private checkNameIsUnique(name: string, ctx?: ParserRuleContext) {
		if (this.labels[name] || this.constants[name]) {
			throw new FassError(`Name ${name} is already defined`, ctx);
		}
	}

	/** Fill the output buffer with {length} times this.filler */
	private fill(length: number) {
		const filling = Buffer.alloc(length);
		filling.fill(this.filler);
		this.append(filling);
		this.address += length;
	}

	/** Returns offset where next output will be appended */
	private getOffset() {
		return this.output.getLength();
	}

	/** Write data to the output buffer */
	append(data: Value): void;
	append(data: Buffer): void;
	append(data: number): void;
	append(data: Value | Buffer | number): void {
		if (data instanceof Value) {
			if (data.length === 1) {
				this.output.append(Buffer.from([data.data]));
				this.address += data.length;
			} else if (data.length === 2) {
				const buffer = Buffer.alloc(2);
				if (data.endian === "big") {
					buffer.writeUInt16BE(data.data);
				} else if (data.endian === "little") {
					buffer.writeUInt16LE(data.data);
				} else throw new Error("Invalid endianness. (unreachable code?)");
				this.output.append(buffer);
				this.address += data.length;
			}
		} else if (data instanceof Buffer) {
			this.output.append(data);
			this.address += data.length;
		} else if (typeof data === "number") {
			this.output.append(Buffer.from([data]));
			this.address += 1;
		} else throw new UnreachableCode();
	}

	write(data: Buffer, offset: number) {
		this.output.write(data, offset);
	}

	getAddress = () => this.address;

	setAddress(newAddress: number) {
		if (newAddress < this.address) {
			throw new FassError(
				`Can't set new address ${newAddress} lower than current address ${this.address}`
			);
		}
		if (newAddress - this.address > 0) {
			this.fill(newAddress - this.address);
		}
		this.address = newAddress;
	}

	getLabel(name: NameContext) {
		const label = name.getText().toLowerCase();
		if (this.labels[label]) {
			return this.labels[label];
		}
		if (!this.forwardRefs[label]) {
			this.forwardRefs[label] = [];
		}
		this.forwardRefs[label].push(this.getOffset());
		return 0xdead;
	}

	setLabel(name: string, address: number) {
		const label = name.toLowerCase();
		this.checkNameIsUnique(label);
		this.labels[label] = address;

		if (this.forwardRefs[label]) {
			const buffer = Buffer.alloc(2);
			buffer.writeUint16LE(address);
			this.forwardRefs[label].forEach(offset => {
				this.write(buffer, offset);
			});
			delete this.forwardRefs[label];
		}
	}

	getConstant = (name: string) => this.constants[name.toLocaleLowerCase()];

	setConstant(name: string, value: number) {
		this.checkNameIsUnique(name.toLocaleLowerCase());
		this.constants[name.toLocaleLowerCase()] = value;
	}
}
