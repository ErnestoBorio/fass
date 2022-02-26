import { ErrorListener } from "antlr4/src/antlr4/error/ErrorListener.js";

export class FassError extends Error {
	constructor(message, ctx) {
		const finalMessage = `Line ${ctx.start.line}:${ctx.start.column} ${message}`;
		super(finalMessage);
	}
}

export class FassErrorListener extends ErrorListener {
	constructor() {
		super();
	}

	syntaxError(recognizer, offendingSymbol, line, column, msg) {
		console.error("line " + line + ":" + column + " " + msg);
	}
}
