grammar fass;

program: ( 
	( statement | block | ) EOL )*
	( statement | block )?
	EOF ;

block: '<< to be implemented >>';

statement:
	address_stmt |
	filler_stmt |
	data_stmt |
	const_stmt
	;

// address_stmt: ADDRESS_KWD ( DECIMAL_NUMBER | HEX_NUMBER ) ;
address_stmt: ADDRESS_KWD HEX_NUMBER ;
// filler_stmt: FILLER_KWD ( VALUE | DEFAULT_KWD ) ;
filler_stmt: FILLER_KWD ( (DECIMAL_NUMBER | HEX_NUMBER | BINARY_NUMBER | STRING | BRK | NOP) | DEFAULT_KWD ) ;
// data_stmt: DATA_KWD VALUE ( ',' VALUE )* ;
data_stmt: DATA_KWD (DECIMAL_NUMBER | HEX_NUMBER | BINARY_NUMBER | STRING | BRK | NOP) 
	( ',' (DECIMAL_NUMBER | HEX_NUMBER | BINARY_NUMBER | STRING | BRK | NOP) )* ;
// const_stmt: CONST_KWD IDENTIFIER '=' VALUE ;
const_stmt: CONST_KWD IDENTIFIER '=' (DECIMAL_NUMBER | HEX_NUMBER | BINARY_NUMBER | STRING | BRK | NOP) ;

ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS] ;
FILLER_KWD : [fF][iI][lL][lL][eE][rR] ;
DEFAULT_KWD : [dD][eE][fF][aA][uU][lL][tT] ;
DATA_KWD : [dD][aA][tT][aA] ;
CONST_KWD: [cC][oO][nN][sS][tT] ;

// VALUE: DECIMAL_NUMBER | HEX_NUMBER | BINARY_NUMBER | STRING | BRK | NOP ;
LTEND: 'L'; // Little endianness
DECIMAL_NUMBER: [0-9]+ LTEND?;
HEX_NUMBER: '$' [0-9a-fA-F]+ LTEND?;
BINARY_NUMBER: '%' [01]+ LTEND?;
STRING: '"' [^"]+ '"' ;
BRK:  [bB][rR][kK] ; // equal to $00
NOP:  [nN][oO][pP] ; // equal to $EA

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*;

WHITESPACE: [ \t]+ -> skip;

EOL: '\r'? '\n';