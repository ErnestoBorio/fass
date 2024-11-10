import nearley from "nearley";
import grammar from "./fassGrammar";

const compiled = nearley.Grammar.fromCompiled(grammar);
const parser = new nearley.Parser(compiled, { keepHistory: true });
parser.feed("$D010");
console.log(parser.results);
