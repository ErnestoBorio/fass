import { InputStream, CommonTokenStream } from "antlr4";
import fassLexer from "./parser/fassLexer.js";
import fassParser from "./parser/fassParser.js";
import SymbolPass from "./SymbolPass";

const _pete = new SymbolPass();
const input = "tu vieja";
const chars = new InputStream(input);
const lexer = new fassLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new fassParser(tokens);
const _tree = parser.program();
