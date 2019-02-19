grammar fass;

program:
	( statement? EOL )* // optional statements ending in newlines
	statement ? // optional last line with no newline
	EOF ;

// --> Statements
statement
	: address_stmt
	| filler_stmt
	| const_stmt
	;

address_stmt: ADDRESS_KWD adr=HEX_BIGEND {self.set_address( $adr.text)} ;
filler_stmt: FILLER_KWD fb=filler_byte {self.set_filler( $fb.ret )};
	filler_byte returns [ret]: (
		  hex_bigend
		| dec_bigend
		| bin_bigend
		| string
		) {$ret = localctx.children[0].ret}; // pass through whatever value subrules return, to parent rule filler_stmt

const_stmt: CONST_KWD left_const=IDENTIFIER '=' (
	literal {self.declare_constant(name= $left_const.text, value= $literal.ret)}
	| right_const= IDENTIFIER {self.declare_constant(name= $left_const.text, value= self.get_constant( $right_const.text ))}
	);
// Statements <--

// --> Literals
literal returns [ret]: (
	  hex_bigend
	| hex_litend
	| dec_bigend
	| dec_litend
	| bin_bigend
	| bin_litend
	| negative_number
	| string
	) {$ret = localctx.children[0].ret}; // pass through whatever value subrules return, to parent rule const_stmt

hex_bigend returns [ret]: HEX_BIGEND {$ret = self.serialize( int( $HEX_BIGEND.text[1:], 16 ))};
dec_bigend returns [ret]: DEC_BIGEND {$ret = self.serialize( int( $DEC_BIGEND.text ))};
bin_bigend returns [ret]: BIN_BIGEND {$ret = self.serialize( int( $BIN_BIGEND.text[1:], 2 ))};
hex_litend returns [ret]: HEX_LITEND {$ret = self.serialize( int( $HEX_LITEND.text[1:-1], 16 ), 'little')};
dec_litend returns [ret]: DEC_LITEND {$ret = self.serialize( int( $DEC_LITEND.text[:-1] ), 'little')};
bin_litend returns [ret]: BIN_LITEND {$ret = self.serialize( int( $BIN_LITEND.text[1:-1], 2 ), 'little')};
string     returns [ret]: STRING {$ret = self.serialize( $STRING.text[1:-1] )};
negative_number returns [ret]: NEGATIVE_NUMBER {$ret = self.serialize( self.check_negative( int($NEGATIVE_NUMBER.text)), signed= True )};
// Literals <--

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