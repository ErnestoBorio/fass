grammar fass;

program: ( 
	( statement | block | ) EOL )* // lines or blocks newline separated (line can be empty)
	( statement | block )? // final line or block can lack newline
	EOF;

block: '<< to be implemented >>';

statement:
	address_stmt |
	const_stmt
	;

address_stmt: ADDRESS_KWRD ( HEX_NUMBER | DECIMAL_NUMBER );
const_stmt:   CONST_KWRD /*IDENTIFIER*/ '=' VALUE;

ADDRESS_KWRD: [aA][dD][dD][rR][eE][sS][sS];
CONST_KWRD: [cC][oO][nN][sS][tT];

VALUE: DECIMAL_NUMBER | HEX_NUMBER | 
	BINARY_NUMBER | STRING | NOP | BRK ;
DECIMAL_NUMBER: [0-9]+;
HEX_NUMBER: '$' [0-9a-fA-F]+;
BINARY_NUMBER: '%' [01]+;
STRING: '"' [^"]+ '"';
NOP: [nN][oO][pP]; // equal to $EA
BRK: [bB][rR][kK]; // equal to $00

// IDENTIFIER: [_a-zA-Z] [_a-zA-Z0-9]*;

WHITESPACE: [ \t]+ -> skip;

EOL: '\r'? '\n';