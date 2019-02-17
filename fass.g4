grammar fass;

program:
	( statement? EOL )* // optional statements ending in newlines
	statement ? // optional last line with no newline
	EOF ;

statement
	: address_stmt
	| filler_stmt
	;

// --> Statements
address_stmt: ADDRESS_KWD adr=HEX_BIGEND {self.set_address( $adr.text)} ;
filler_stmt: FILLER_KWD fb=filler_byte {self.set_filler( $fb.ret )};
	filler_byte returns [ret]
		: HEX_BIGEND {$ret = int( $HEX_BIGEND.text[1:], 16 )}
		| DEC_BIGEND {$ret = int( $DEC_BIGEND.text )}
		| BIN_BIGEND {$ret = int( $BIN_BIGEND.text[1:], 2 )}
		| STRING {$ret = $STRING.text[1:-1] }
		;

// --> Literals
LITEND: 'L'; // Little endianness, uppercase only to avoid confusion with the number 1
HEX_BIGEND: '$' [0-9a-fA-F]+ ;
HEX_LITEND: '$' [0-9a-fA-F]+ LITEND;
BIN_BIGEND: '%' [01]+ ;
BIN_LITEND: '%' [01]+ LITEND;
DEC_BIGEND: [0-9]+ ;
DEC_LITEND: [0-9]+ LITEND;
NEGATIVE_NUMBER: '-'[0-9]+; // Intended for 1 byte, range [-128..-1]
STRING: '"' (ESC|.)+? '"';
	fragment ESC : '\\"' | '\\\\' ;
// Literals <--

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS] ;
FILLER_KWD : [fF][iI][lL][lL][eE][rR] ;
DEFAULT_KWD : [dD][eE][fF][aA][uU][lL][tT] ;
DATA_KWD : [dD][aA][tT][aA] ;
CONST_KWD: [cC][oO][nN][sS][tT] ;
GOTO_KWD: [gG][oO][tT][oO] ;
// Keywords <--

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]* ; // The dot allows a dot-notation-like syntactic sugar
WHITESPACE: [ \t]+ -> skip ;
EOL: '\r'? '\n' ;