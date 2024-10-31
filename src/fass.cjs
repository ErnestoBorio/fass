// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program$ebnf$1", "symbols": ["line"]},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["program$ebnf$1"]},
    {"name": "line$ebnf$1$subexpression$1$ebnf$1", "symbols": ["TABS"], "postprocess": id},
    {"name": "line$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line$ebnf$1$subexpression$1$ebnf$2", "symbols": ["statement"], "postprocess": id},
    {"name": "line$ebnf$1$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line$ebnf$1$subexpression$1", "symbols": ["line$ebnf$1$subexpression$1$ebnf$1", "line$ebnf$1$subexpression$1$ebnf$2"]},
    {"name": "line$ebnf$1", "symbols": ["line$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "line$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line", "symbols": ["line$ebnf$1", "EOL"]},
    {"name": "statement$string$1", "symbols": [{"literal":"L"}, {"literal":"D"}, {"literal":"A"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$1"]},
    {"name": "statement$string$2", "symbols": [{"literal":"S"}, {"literal":"T"}, {"literal":"A"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$2"]},
    {"name": "EOL", "symbols": [{"literal":"\n"}]},
    {"name": "TAB", "symbols": [{"literal":"\t"}]},
    {"name": "TABS$ebnf$1", "symbols": ["TAB"]},
    {"name": "TABS$ebnf$1", "symbols": ["TABS$ebnf$1", "TAB"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TABS", "symbols": ["TABS$ebnf$1"]},
    {"name": "WHITESPACE$ebnf$1", "symbols": []},
    {"name": "WHITESPACE$ebnf$1", "symbols": ["WHITESPACE$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WHITESPACE", "symbols": ["WHITESPACE$ebnf$1"], "postprocess": $ => null}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
