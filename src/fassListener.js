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

	/** Fail if no address has been defined */
	requireAddress() {
		if (this.address === null) {
			const statement = this.getContext().start.source[1].strdata.trim();
			throw new FassError(
				"statement `" + statement + "` needs an address to be defined before hand",
				this.getContext()
			);
		}
	}

	pushBytes(bytes) {
		this.requireAddress();
		this.output.push(...bytes);
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

	exitLabel(ctx) {
		this.requireAddress();
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
		ctx.parentCtx.parentCtx.val = hex;
		if (hex >= 0x10000) {
			throw new FassError(`Value ${ctx.HEX_BIGEND().getText()} is out of range [0..$FFFF]`, ctx);
		}
	}

	exitHex_litend(ctx) {}

	exitDec_bigend(ctx) {
		const dec = parseInt(ctx.DEC_BIGEND().getText(), 10);
		ctx.parentCtx.parentCtx.val = dec;
		if (dec >= 0x10000) {
			throw new FassError(`Value ${dec} is out of range [0..65535]`, ctx);
		}
	}

	exitDec_litend(ctx) {}
}
