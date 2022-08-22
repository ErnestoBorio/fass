import FassBaseListener from "./fassBaseListener.js";
import { opcodes as op } from "./opcodes.js";
import { FassError } from "./error.js";

const NOP = 0xea;
const NOP3 = 4;
const BRK = 0;
const defaultFiller = NOP;

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
		});
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
