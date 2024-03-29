import { ParserRuleContext } from "antlr4";
import {
	DirectContext,
	IndexedContext,
	Indirect_yContext,
	NameContext,
	X_indirectContext
} from "./parser/fassParser";
import {
	Hash,
	Value,
	Slice,
	FassError,
	defaultFiller,
	UnreachableCode,
	Reference
} from "./types";
import { reservedWords } from "./keywords";

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
	private checkNameIsValid(name: string, ctx?: ParserRuleContext) {
		if (this.labels[name] || this.constants[name]) {
			throw new FassError(`Name ${name} is already defined`, ctx);
		}
		if (name in reservedWords) {
			throw new FassError(`Name ${name} is a reserved word`, ctx);
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

	appendReference(ref: Reference) {
		if (!ref.address) {
			ref.address = 0xdead;
			if (!this.forwardRefs[ref.label]) {
				this.forwardRefs[ref.label] = [];
			}
			this.forwardRefs[ref.label].push(this.getOffset());
		}
		const buffer = Buffer.alloc(2);
		buffer.writeUInt16LE(ref.address);
		this.append(buffer);
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
		return {
			label,
			address: this.labels[label]
		} as Reference;
	}

	setLabel(name: string, address: number) {
		name = name.toLowerCase();
		this.checkNameIsValid(name);
		this.labels[name] = address;

		if (this.forwardRefs[name]) {
			const buffer = Buffer.alloc(2);
			buffer.writeUint16LE(address);
			this.forwardRefs[name].forEach(offset => {
				this.write(buffer, offset);
			});
			delete this.forwardRefs[name];
		}
	}

	getConstant = (name: string) => this.constants[name.toLowerCase()];

	setConstant(name: string, value: number) {
		this.checkNameIsValid(name.toLowerCase());
		this.constants[name.toLowerCase()] = value;
	}

	getAddressing(
		ref:
			| DirectContext
			| IndexedContext
			| X_indirectContext
			| Indirect_yContext
	) {
		const label = this.getLabel(ref.name());

		let addressing: string;
		if (ref instanceof X_indirectContext) {
			addressing = "INDX";
		} else if (ref instanceof Indirect_yContext) {
			addressing = "INDY";
		} else {
			addressing = label.address && label.address <= 0xff ? "ZP" : "ABS";
			if (ref instanceof IndexedContext) {
				addressing += ref.X() ? "X" : "Y";
			}
		}
		return addressing;
	}
}
