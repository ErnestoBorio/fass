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
		if (ctx.hex_bigend()) {
			ctx.address = parseInt(ctx.hex_bigend().getText().slice(1), 16);
			return;
		}
		// ctx.dec_bigend() is assumed
		ctx.address = parseInt(ctx.dec_bigend().getText(), 10);
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

function getNumberSizeInBytes(num) {
	if (num == 0) {
		return 0;
	} else if (num > 0) {
		return Math.floor(Math.log(num) / Math.log(256)) + 1;
	}
	// WIP for now negative values can only be [-128...-1] 1 byte size
	return 1;
}

function serialize(value) {
	if (value < 0) {
		return el & 0xff;
	}
	const size = getNumberSizeInBytes(value);
	// WIP
}

// WIP:
// Al pedo dar la opción little endian, para qué? que lo dé vuelta el dev. No hay casos de uso prácticos.
