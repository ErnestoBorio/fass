import fassLexer from "./fassLexer.js";
import fassParser from "./fassParser.js";
import FassListener from "./fassListener.js";
import antlr, { InputStream, CommonTokenStream } from "antlr4";
import fs from "fs";
import { FassErrorListener } from "./error.js";

if (!process.argv[2]) {
	throw new Error("Please specify input file, reading from stdin not implemented yet");
}
const input = fs.readFileSync(process.argv[2], "utf8");
var chars = new InputStream(input, true);
var lexer = new fassLexer(chars);
var tokens = new CommonTokenStream(lexer);
var parser = new fassParser(tokens);
parser.buildParseTrees = true;
parser.removeErrorListeners();
parser.addErrorListener(new FassErrorListener());

var tree = parser.program();
var fass = new FassListener();
antlr.tree.ParseTreeWalker.DEFAULT.walk(fass, tree);
