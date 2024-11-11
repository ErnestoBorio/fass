import nearley from "nearley";
import grammar from "./fassGrammar";

const compiled = nearley.Grammar.fromCompiled(grammar);
const parser = new nearley.Parser(compiled, { keepHistory: true });
parser.feed("$D020");

const ast = parser.results[0];
console.log(JSON.stringify(ast, null, 2));
