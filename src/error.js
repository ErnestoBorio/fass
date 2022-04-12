import { ErrorListener } from "antlr4/src/antlr4/error/ErrorListener.js";

export class FassError extends Error {
	constructor(message, ctx) {
		super(`Line ${ctx.start.line}:${ctx.start.column} ${message}`);
	}
}

export class FassErrorListener extends ErrorListener {
	constructor() {
		super();
	}

	syntaxError(_recognizer, _offendingSymbol, line, column, msg) {
		console.error("line " + line + ":" + column + " " + msg);
	}
}
