import { ParserRuleContext } from "antlr4";

export class FassError implements Error {
	name: string;
	message: string;

	constructor(message: string, ctx?: ParserRuleContext) {
		if (ctx) {
			const col = ctx.start!.column;
			const line = ctx.start!.line;
			this.message = `Line ${line}:${col} ${message}`;
		} else {
			this.message = message;
		}
	}

	toString() {
		return this.message;
	}
}

export class UnreachableCode extends FassError {
	constructor(ctx?: ParserRuleContext) {
		super(`Unreachable code`, ctx);
	}
}
