import FassBaseListener from "./fassBaseListener.js";
import { FassError } from "./error.js";

const defaultFiller = 0xea; // NOP

export default class FassListener extends FassBaseListener {
	address = null;
	filler = defaultFiller;
	labels = new Map();
	constants = new Map();
	output = [];

	exitProgram(ctx) {
		console.log(this.constants);
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

	exitHex_bigend(ctx) {
		ctx.parentCtx.parentCtx.val = parseInt(ctx.HEX_BIGEND().getText().slice(1), 16);
	}

	exitHex_litend(ctx) {}

	exitDec_litend(ctx) {}
}
