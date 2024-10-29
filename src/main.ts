import { CharStream, InputStream, CommonTokenStream } from "antlr4";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";
import Fass from "./Fass";
import { readFileSync } from "fs";
import parseArgv from "minimist";
import { writeFileSync } from "fs";

const argv = parseArgv(process.argv.slice(2));
const source = readFileSync(argv["_"][0]).toString();
const fass = new Fass();
const chars = new InputStream(source);
const stream = new CharStream(chars.toString());
const lexer = new fassLexer(stream);
const tokens = new CommonTokenStream(lexer);
const parser = new fassParser(tokens);
const tree = parser.program();
fass.visit(tree);

const rom = fass.output.getBuffer();
if (argv["o"]) {
	writeFileSync(argv["o"], rom);
} else {
	process.stdout.write(rom);
}
