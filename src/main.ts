import { CharStream, InputStream, CommonTokenStream } from "antlr4";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";
import Fass from "./Fass";
import { readFileSync } from "fs";

const source = readFileSync(process.argv[2]).toString();

const fass = new Fass();
const chars = new InputStream(source);
const stream = new CharStream(chars.toString());
const lexer = new fassLexer(stream);
const tokens = new CommonTokenStream(lexer);
const parser = new fassParser(tokens);
const tree = parser.program();
fass.visit(tree);

console.log(fass);
