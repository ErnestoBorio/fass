import fassLexer from "./fassLexer.js";
import fassParser from "./fassParser.js";
import FassListener from "./fassListener.js";
import antlr, { InputStream, CommonTokenStream } from "antlr4";
import { FassErrorListener } from "./error.js";

export function runFass(source) {
	var chars = new InputStream(source, true);
	var lexer = new fassLexer(chars);
	var tokens = new CommonTokenStream(lexer);
	var parser = new fassParser(tokens);
	parser.buildParseTrees = true;
	parser.removeErrorListeners();
	parser.addErrorListener(new FassErrorListener());

	var tree = parser.program();
	var fass = new FassListener();
	antlr.tree.ParseTreeWalker.DEFAULT.walk(fass, tree);

	return {
		constants: fass.constants,
		labels: fass.labels,
		output: fass.output
	};
}
