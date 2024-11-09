const opcodes = {
	LDA: {
		IMM: 0xa9,
		ZP: 0xa5,
		ZPX: 0xb5,
		ABS: 0xad,
		ABSX: 0xbd,
		ABSY: 0xb9,
		INDX: 0xa1,
		INDY: 0xb1
	},
	LDX: { IMM: 0xa2, ZP: 0xa6, ZPY: 0xb6, ABS: 0xae, ABSY: 0xbe },
	LDY: { IMM: 0xa0, ZP: 0xa4, ZPX: 0xb4, ABS: 0xac, ABSX: 0xbc },
	STA: {
		ZP: 0x85,
		ZPX: 0x95,
		ABS: 0x8d,
		ABSX: 0x9d,
		ABSY: 0x99,
		INDX: 0x81,
		INDY: 0x91
	},
	STX: { ZP: 0x86, ZPY: 0x96, ABS: 0x8e },
	STY: { ZP: 0x84, ZPX: 0x94, ABS: 0x8c },
	ADC: {
		IMM: 0x69,
		ZP: 0x65,
		ZPX: 0x75,
		ABS: 0x6d,
		ABSX: 0x7d,
		ABSY: 0x79,
		INDX: 0x61,
		INDY: 0x71
	},
	SBC: {
		IMM: 0xe9,
		ZP: 0xe5,
		ZPX: 0xf5,
		ABS: 0xed,
		ABSX: 0xfd,
		ABSY: 0xf9,
		INDX: 0xe1,
		INDY: 0xf1
	},
	ASL: { ACC: 0x0a, ZP: 0x06, ZPX: 0x16, ABS: 0x0e, ABSX: 0x1e },
	LSR: { ACC: 0x4a, ZP: 0x46, ZPX: 0x56, ABS: 0x4e, ABSX: 0x5e },
	ROL: { ACC: 0x2a, ZP: 0x26, ZPX: 0x36, ABS: 0x2e, ABSX: 0x3e },
	ROR: { ACC: 0x6a, ZP: 0x66, ZPX: 0x76, ABS: 0x6e, ABSX: 0x7e },
	INC: { ZP: 0xe6, ZPX: 0xf6, ABS: 0xee, ABSX: 0xfe },
	DEC: { ZP: 0xc6, ZPX: 0xd6, ABS: 0xce, ABSX: 0xde },
	AND: {
		IMM: 0x29,
		ZP: 0x25,
		ZPX: 0x35,
		ABS: 0x2d,
		ABSX: 0x3d,
		ABSY: 0x39,
		INDX: 0x21,
		INDY: 0x31
	},
	ORA: {
		IMM: 0x09,
		ZP: 0x05,
		ZPX: 0x15,
		ABS: 0x0d,
		ABSX: 0x1d,
		ABSY: 0x19,
		INDX: 0x01,
		INDY: 0x11
	},
	EOR: {
		IMM: 0x49,
		ZP: 0x45,
		ZPX: 0x55,
		ABS: 0x4d,
		ABSX: 0x5d,
		ABSY: 0x59,
		INDX: 0x41,
		INDY: 0x51
	},
	CMP: {
		IMM: 0xc9,
		ZP: 0xc5,
		ZPX: 0xd5,
		ABS: 0xcd,
		ABSX: 0xdd,
		ABSY: 0xd9,
		INDX: 0xc1,
		INDY: 0xd1
	},
	BIT: { ZP: 0x24, ABS: 0x2c },
	JMP: { ABS: 0x4c, IND: 0x6c },
	JSR: 0x20,
	RTS: 0x60,
	RTI: 0x40,
	TAX: 0xaa,
	TXA: 0x8a,
	TAY: 0xa8,
	TYA: 0x98,
	TSX: 0xba,
	TXS: 0x9a,
	INX: 0xe8,
	INY: 0xc8,
	DEX: 0xca,
	DEY: 0x88,
	CLV: 0xb8,
	CLC: 0x18,
	SEC: 0x38,
	CLI: 0x58,
	SEI: 0x78,
	CLD: 0xd8,
	SED: 0xf8,
	PHA: 0x48,
	PLA: 0x68,
	PHP: 0x08,
	PLP: 0x28,
	BPL: 0x10,
	BMI: 0x30,
	BVC: 0x50,
	BVS: 0x70,
	BCC: 0x90,
	BCS: 0xb0,
	BNE: 0xd0,
	BEQ: 0xf0,
	NOP: 0xea,
	NOP3: 0x04,
	BRK: 0x00
};

export default function getOpcode(operation, addressing = undefined) {
	if (addressing !== undefined) {
		addressing = reverseAddressing[addressing];
	}

	if (opcodes[operation] === undefined) {
		throw new FassError(`Wrong operation ${operation}`, ctx);
	} else if (opcodes[operation][addressing] === undefined) {
		throw new FassError(
			`Wrong addressing ${addressing} for operation ${operation}`,
			ctx
		);
	}
	if (typeof opcodes[operation] === "object") {
		return opcodes[operation][addressing];
	}
	return opcodes[operation];
}

export const addressing = {
	IMP: `implied`,
	ACC: `accumulator`,
	IMM: `immediate`,
	ZP: `zero page`,
	ZPX: `zero page, X`,
	ABS: `absolute`,
	ABSX: `absolute, X`,
	ABSY: `absolute, Y`,
	INDX: `indexed indirect X`,
	INDY: `indirect indexed Y`
};

const reverseAddressing = {
	implied: "IMP",
	accumulator: "ACC",
	immediate: "IMM",
	"zero page": "ZP",
	"zero page, X": "ZPX",
	absolute: "ABS",
	"absolute X": "ABSX",
	"absolute Y": "ABSY",
	"indexed indirect X": "INDX",
	"indirect indexed Y": "INDY"
};

export const protoAddressing = new Set([
	`direct`,
	`indirect`,
	`indexed X`,
	`indexed Y`,
	`indexed indirect X`,
	`indirect indexed Y`
]);
