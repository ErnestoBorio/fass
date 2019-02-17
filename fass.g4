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
address_stmt: ADDRESS_KWD address=HEX_BIGEND {self.set_address( $address.text)} ;
filler_stmt: FILLER_KWD (
	  HEX_BIGEND     {self.set_filler( int( $HEX_BIGEND.text[1:], 16 ))}
	| DECIMAL_NUMBER {self.set_filler( int( $DECIMAL_NUMBER.text ))}
	| BINARY_NUMBER  {self.set_filler( int( $BINARY_NUMBER.text[1:], 2 ))}
	);
// Statements <--

// literal: HEX_BIGEND | HEX_LITEND | DECIMAL_NUMBER | BINARY_NUMBER;

// --> Literals
LITEND: 'L'; // Little endianness, uppercase only to avoid confusion with the number 1
HEX_BIGEND: '$' [0-9a-fA-F]+ ;
HEX_LITEND: '$' [0-9a-fA-F]+ LITEND;
BINARY_NUMBER: '%' [01]+ LITEND?;
DECIMAL_NUMBER: [0-9]+ LITEND?;
// NEGATIVE_NUMBER: '-'[0-9]+;
// Literals <--

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS] ;
FILLER_KWD : [fF][iI][lL][lL][eE][rR] ;
// Keywords <--

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]* ; // The dot allows a dot-notation-like syntactic sugar
WHITESPACE: [ \t]+ -> skip ;
EOL: '\r'? '\n' ;