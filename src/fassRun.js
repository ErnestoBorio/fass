import Fass from "./fass";
import fassLexer from "./fassLexer";
import fassParser from "./fassParser";
import FassListener from "./fassListener";
import antlr, { InputStream, CommonTokenStream } from "antlr4";

const input = new InputStream(process.stdin);
const lexer = new fassLexer(input);
const tokens = new CommonTokenStream(lexer);
const parser = new fassParser(tokens);
// parser.addErrorListener()
const tree = new parser.program();
const fass = new Fass();
const listener = new FassListener(fass);

const input = "peter SAYS: hello :-) \npaul SHOUTS: ayo :)\n";

const chars = new antlr4.InputStream(input);
const lexer = new ChatLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ChatParser(tokens);
parser.buildParseTrees = true;

/**
 * We set the root node of the tree as a chat rule.
 * You want to invoke the parser specifying a rule which typically is the first rule.
 * However you can actually invoke any rule directly.
 */
const tree = parser.chat();

const htmlChat = new HtmlChatListener(res);
antlr4.tree.ParseTreeWalker.DEFAULT.walk(htmlChat, tree);
