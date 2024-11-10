// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["statement"]},
    {"name": "statement", "symbols": ["hexa"]},
    {"name": "hexa$ebnf$1", "symbols": [/[0-9a-fA-F]/]},
    {"name": "hexa$ebnf$1", "symbols": ["hexa$ebnf$1", /[0-9a-fA-F]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "hexa", "symbols": [{"literal":"$"}, "hexa$ebnf$1"], "postprocess": d => parseInt(d[1].slice(0,4), 16)}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
