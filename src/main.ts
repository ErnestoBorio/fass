import { CharStream, InputStream, CommonTokenStream } from "antlr4";
import fassLexer from "./parser/fassLexer.js";
import fassParser from "./parser/fassParser.js";
import SymbolPass from "./SymbolPass";
import { readFileSync } from "fs";

const source = readFileSync(process.argv[2]).toString();
const symbolPass = new SymbolPass();
const chars = new InputStream(source);
const stream = new CharStream(chars.toString());
const lexer = new fassLexer(stream);
const tokens = new CommonTokenStream(lexer);
const parser = new fassParser(tokens);
const tree = parser.program();
symbolPass.visit(tree);
