import FassBaseListener from "./fassBaseListener.js";
import { FassError } from "./error.js";

const defaultFiller = 0xea; // NOP

export default class FassListener extends FassBaseListener {
	address = null;
	filler = defaultFiller;
	labels = new Map();
	constants = new Map();
	output = [];
	ctx = []; // Stack of current contexts

	getContext() {
		return this.ctx.slice(-1);
	}

	pushBytes(bytes) {
		if (this.address === null) {
			throw new FassError("Output started without setting an address", this.getContext());
		}
		this.output.push(...bytes);
	}

	exitProgram(ctx) {
		console.log("cons", this.constants);
		console.log("output", this.output);
	}

	enterEveryRule(ctx) {
		this.ctx.push(ctx);
	}

	exitEveryRule() {
		this.ctx.pop();
	}

	exitAddress(ctx) {
		let address;
		if (ctx.hex_bigend()) {
			address = parseInt(ctx.hex_bigend().getText().slice(1), 16);
		} else if (ctx.dec_bigend()) {
			address = parseInt(ctx.dec_bigend().getText(), 10);
		} else {
			throw new Error("Unsupported address format");
		}
		if (address > 0xffff) {
			let rawAddress = ctx.hex_bigend()
				? ctx.hex_bigend().getText()
				: ctx.dec_bigend().getText();
			throw new FassError(`Address ${rawAddress} is out of range [0..$FFFF]`, ctx);
		}
		ctx.address = address;
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

	exitLabel_stmt(ctx) {
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
		const constName = ctx.const_name.text.toLowerCase();
		if (this.constants.has(constName)) {
			throw new FassError(`Constant ${constName} already defined`, ctx);
		}
		this.constants.set(constName, ctx.value().val);
	}

	exitData_stmt(ctx) {
		for (const value of ctx.datas) {
			if (value.literal()) {
				this.pushBytes(value.bytes);
			}
		}
	}

	exitHex_bigend(ctx) {
		const hex = parseInt(ctx.HEX_BIGEND().getText().slice(1), 16);
		if (hex < 0x100) {
			ctx.parentCtx.parentCtx.bytes = [hex];
		} else if (hex < 0x10000) {
			ctx.parentCtx.parentCtx.bytes = [hex >> 8, hex & 0xff];
		} else {
			throw new FassError(`Value ${ctx.HEX_BIGEND().getText()} is out of range [0..$FFFF]`, ctx);
		}
	}

	exitHex_litend(ctx) {}

	exitDec_bigend(ctx) {
		const dec = parseInt(ctx.DEC_BIGEND().getText(), 10);
		if (dec < 0x100) {
			ctx.parentCtx.parentCtx.bytes = [dec];
		} else if (dec < 0x10000) {
			ctx.parentCtx.parentCtx.bytes = [dec >> 8, dec & 0xff];
		} else {
			throw new FassError(`Value ${dec} is out of range [0..65535]`, ctx);
		}
	}

	exitDec_litend(ctx) {}
}
