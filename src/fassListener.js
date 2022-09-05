import FassBaseListener from "./fassBaseListener.js";
import { opcodes as op } from "./opcodes.js";
import { FassError } from "./error.js";
import FassParser from "./fassParser.js";

const NOP = 0xea;
const NOP3 = 4;
const BRK = 0;
const defaultFiller = NOP;

const IMM = "IMM";
const ZP = "ZP";
const ZPX = "ZPX";
const ZPY = "ZPY";
const ABS = "ABS";
const ABSX = "ABSX";
const ABSY = "ABSY";
const INDX = "INDX";
const INDY = "INDY";
const IND = "IND";

export default class FassListener extends FassBaseListener {
	address = 0;
	filler = defaultFiller;
	labels = new Map();
	constants = new Map();
	output = [];
	ctx = []; // Stack of current contexts

	pushBytes(bytes) {
		if (!Array.isArray(bytes)) {
			bytes = [bytes];
		}
		bytes.forEach(val => {
			this.output.push(val);
			this.address += 1;
		});
	}

	/**
	 * Throws an error on a non-existent label or returns its address
	 */
	assertLabel(label) {
		if (!this.labels.has(label)) {
			throw new FassError(
				`Label ${label} does not exist or is a forward reference`,
				this.ctx.pop()
			);
		}
		return this.labels.get(label);
	}

	// Keep a stack of contexts to access them outside rule handlers, most likely in error reporting
	enterEveryRule(ctx) {
		this.ctx.push(ctx);
	}
	exitEveryRule() {
		this.ctx.pop();
	}
	getContext() {
		if (this.ctx.length <= 0) {
			return undefined;
		}
		return this.ctx.slice(-1)[0];
	}

	exitAddress(ctx) {
		if (ctx.hexadecimal()) {
			ctx.address = parseInt(ctx.hexadecimal().getText().slice(1), 16);
			return;
		}
		// ctx.decimal() is assumed
		ctx.address = parseInt(ctx.decimal().getText(), 10);
	}

	exitAddress_stmt(ctx) {
		this.address = ctx.address().address;
	}

	setLabel(label, address, ctx) {
		if (this.labels.has(label)) {
			throw new FassError(`Label ${label} already defined`, ctx);
		}
		this.labels.set(label, address);
	}

	exitRemote_label_stmt(ctx) {
		this.setLabel(ctx.IDENTIFIER().getText().toLowerCase(), ctx.address().address, ctx);
	}

	exitLabel(ctx) {
		this.setLabel(ctx.IDENTIFIER().getText().toLowerCase(), this.address, ctx);
	}

	exitFiller_stmt(ctx) {
		if (ctx.value()) {
			this.filler = ctx.value().val;
		} else if (ctx.DEFAULT_KWD()) {
			this.filler = defaultFiller;
		}
	}

	exitConst_stmt(ctx) {
		if (ctx.value().val < -128 || ctx.value().val > 0xff) {
			throw new FassError(`Constants should be in the range [-128..255]`, ctx);
		}
		const constName = ctx.const_name.text.toLowerCase();
		if (this.constants.has(constName)) {
			throw new FassError(`Constant ${ctx.const_name.text} already defined`, ctx);
		}
		this.constants.set(constName, ctx.value().val);
	}

	exitData_stmt(ctx) {
		for (const value of ctx.datas) {
			if (value.literal()) {
				this.pushBytes(serialize(value.val));
			}
		}
	}

	exitHexadecimal(ctx) {
		const hex = parseInt(ctx.getText().slice(1), 16);
		if (hex >= 0x10000) {
			throw new FassError(`Value ${ctx.getText()} is out of range [0..$FFFF]`, ctx);
		}
		setValue(ctx, hex);
	}

	exitDecimal(ctx) {
		const dec = parseInt(ctx.getText(), 10);
		if (dec >= 0x10000) {
			throw new FassError(`Value ${dec} is out of range [0..65535]`, ctx);
		}
		ctx.val = dec; // for using decimal directly, instead of value
		setValue(ctx, dec);
	}

	exitNegative_number(ctx) {
		const neg = parseInt(ctx.getText(), 10);
		if (neg < -128) {
			throw new FassError(`Value ${neg} is out of range [-128..-1]`, ctx);
		}
		setValue(ctx, neg);
	}

	exitOpcode_literal(ctx) {
		if (ctx.NOP()) {
			return setValue(ctx, NOP);
		}
		if (ctx.NOP3()) {
			return setValue(ctx, NOP3);
		}
		if (ctx.BRK()) {
			return setValue(ctx, BRK);
		}
	}

	exitFlag_set_stmt(ctx) {
		if (ctx.CARRY()) {
			if (ctx.one_zero.val == 0) {
				return this.pushBytes(op.CLC);
			}
			if (ctx.one_zero.val == 1) {
				return this.pushBytes(op.SEC);
			}
			throw new FassError("The carry flag can only be set to either 1 or 0", ctx);
		}
		if (ctx.OVERFLOW()) {
			if (ctx.one_zero.val == 0) {
				return this.pushBytes(op.CLV);
			}
			throw new FassError("The overflow flag can only be set to 0", ctx);
		}
		if (ctx.INTERRUPT()) {
			if (ctx.ON()) {
				return this.pushBytes(op.CLI);
			}
			if (ctx.OFF()) {
				return this.pushBytes(op.SEI);
			}
		}
		if (ctx.DECIMAL_MODE()) {
			if (ctx.ON()) {
				return this.pushBytes(op.SED);
			}
			if (ctx.OFF()) {
				return this.pushBytes(op.CLD);
			}
		}
		throw new FassError("Unexpected `Flag set statement` error", ctx);
	}

	exitStack_stmt(ctx) {
		if (ctx.A()) {
			if (ctx.PUSH_KWD()) {
				return this.pushBytes(op.PHA);
			}
			if (ctx.PULL_KWD()) {
				return this.pushBytes(op.PLA);
			}
		}
		if (ctx.FLAGS_KWD()) {
			if (ctx.PUSH_KWD()) {
				return this.pushBytes(op.PHP);
			}
			if (ctx.PULL_KWD()) {
				return this.pushBytes(op.PLP);
			}
		}
		throw new FassError("Unexpected `Stack` error", ctx);
	}

	exitGoto_stmt(ctx) {
		let name;
		if (ctx.reference()?.direct()) {
			name = ctx.reference().direct().IDENTIFIER().getText();
			this.pushBytes(op.JMP.ABS);
		} else if (ctx.reference()?.indirect()) {
			name = ctx.reference().indirect().IDENTIFIER().getText();
			this.pushBytes(op.JMP.IND);
		} else {
			throw new FassError(`Goto only accepts absolute or absolute-indirect references`, ctx);
		}

		const normalized_name = name.toLowerCase();
		const ref_value = this.assertLabel(normalized_name);

		return this.pushBytes(littleEndian(ref_value));
	}

	exitBit_shift_stmt(ctx) {
		let addressing;
		if (ctx.A()) {
			addressing = ACC;
		} else if (!new Set([ZP, ZPX, ABS, ABSX]).has(ctx.reference()?.addressing)) {
			throw new FassError("Bit-wise statements only accept A, direct or indexed references", ctx);
		} else {
			addressing = ctx.reference()?.addressing;
		}
		if (ctx.LSR_KWD()) {
			this.pushBytes(op.LSR[addressing]);
		} else if (ctx.ASL_KWD()) {
			this.pushBytes(op.ASL[addressing]);
		} else if (ctx.ROR_KWD()) {
			this.pushBytes(op.ROR[addressing]);
		} else if (ctx.ROL_KWD()) {
			this.pushBytes(op.ROL[addressing]);
		}

		if (ctx.A()) {
			return;
		}

		const address = this.assertLabel(ctx.reference().label);
		switch (addressing) {
			case ZP:
			case ZPX:
				this.pushBytes(shrink(littleEndian(address)));
				break;
			case ABS:
			case ABSX:
				this.pushBytes(littleEndian(address));
				break;
			default:
				throw new FassError("Unexpected error", ctx);
		}
	}

	populateReferenceLabel(ctx) {
		ctx.parentCtx.label = ctx.IDENTIFIER().getText().toLowerCase();
		return ctx.parentCtx.label;
	}
	exitDirect(ctx) {
		const label = this.populateReferenceLabel(ctx);
		if (this.assertLabel(label) <= 0xff) {
			ctx.parentCtx.addressing = ZP;
			return;
		}
		ctx.parentCtx.addressing = ABS;
	}

	exitIndirect(ctx) {
		this.populateReferenceLabel(ctx);
		ctx.addressing = IND;
	}

	exitIndexed(ctx) {
		const label = this.populateReferenceLabel(ctx);
		const value = this.assertLabel(label);
		if (value <= 0xff) {
			ctx.parentCtx.addressing = "ZP";
		} else {
			ctx.parentCtx.addressing = "ABS";
		}
		if (ctx.X()) {
			ctx.parentCtx.addressing += "X";
		} else if (ctx.Y()) {
			ctx.parentCtx.addressing += "Y";
		} else {
			throw new FassError("Unexpected error", ctx);
		}
	}
}

function setValue(ctx, val) {
	const value = getTypedAncestor("ValueContext", ctx);
	if (value) {
		value.val = val;
	}
}

function serialize(value) {
	if (value <= 0xff) {
		return [value & 0xff];
	}
	return [(value & 0xff00) >> 8, value & 0x00ff];
}

function getTypedAncestor(type, ctx) {
	let ancestor = ctx.parentCtx;
	while (ancestor) {
		if (ancestor.constructor.name == type) {
			return ancestor;
		}
		ancestor = ancestor.parentCtx;
	}
	return undefined;
}

/**
 * If the first byte is zero, strips it out.
 * As this excpects little endian values, the first byte is the most significant
 */
function shrink(value) {
	if (!Array.isArray(value) || value.length !== 2) {
		throw new Error("Error trying to shrink a non 2 elements array");
	}
	if (value[1] == 0) {
		value = [value[0]];
		value.splice();
	}
	return value;
}

function littleEndian(value) {
	return [value & 0xff, (value & 0xff00) >> 8];
}
