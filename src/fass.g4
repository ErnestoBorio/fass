grammar fass;

program:
	( statement? EOL )* // optional statements ending in newlines
	statement ? // optional last line with no newline
	EOF;

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]* ; // The dot allows a dot-notation-like syntactic sugar
WHITESPACE: [ \t]+ -> skip;
EOL: '\r'? '\n';

// --> Statements
statement:
	  address_stmt
	  ;

address:
	  hex   #address_hex
	| dec #address_dec;

address_stmt: ADDRESS_KWD address;

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS];

// --> Values
hex: HEX;
dec: DEC;

// --> Literals
HEX: '$' [0-9a-fA-F]+ ;
DEC: [0-9]+ ;