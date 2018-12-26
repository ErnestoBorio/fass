grammar fass;

program: ( 
	( statement | block | ) EOL )*
	( statement | block )?
	EOF ;

block: '<< to be implemented >>'; // block of statements

statement: // single line statements
	address_stmt |
	filler_stmt |
	data_stmt |
	const_stmt |
	nop_stmt |
	brk_stmt |
	label_def_stmt |
	assign_stmt
	;

address_stmt: ADDRESS_KWD address ; // set memory address for next instruction
filler_stmt: FILLER_KWD ( value | DEFAULT_KWD ) ; // set filler for empty memory blocks
data_stmt: DATA_KWD value ( ',' value )* ; // insert raw data into code
const_stmt: CONST_KWD IDENTIFIER '=' value ; // define a named constant value

nop_stmt: 
	NOP | // do nothing for 2 cpu cycles
	NOP3 value? | // NOP for 3 cycles, optionally provide disposable argument
	NOP4 value?   // NOP for 4 cycles, optionally provide disposable argument
	;

brk_stmt: BRK; // jump to Break interrupt handler
label_def_stmt: IDENTIFIER 'at' address; // ser a label on an address without changing current instructions addresses
assign_stmt: // assign values to and from labels or registers WIP
	IDENTIFIER '=' REGISTER |
	REGISTER '=' IDENTIFIER |
	REGISTER '=' value
	;

value: HEX_BIGEND | HEX_LITEND | DECIMAL_NUMBER | BINARY_NUMBER | STRING | BRK | NOP ;
hex_number: HEX_BIGEND | HEX_LITEND ;
address: HEX_BIGEND;

ADDRESS_KWD: ( [aA][dD][dD][rR][eE][sS][sS] );
FILLER_KWD : [fF][iI][lL][lL][eE][rR] ;
DEFAULT_KWD : [dD][eE][fF][aA][uU][lL][tT] ;
DATA_KWD : [dD][aA][tT][aA];
CONST_KWD: [cC][oO][nN][sS][tT] ;

// Values:
LITEND: 'L'; // Little endianness
HEX_BIGEND: '$' [0-9a-fA-F]+ ;
HEX_LITEND: '$' [0-9a-fA-F]+ LITEND;
DECIMAL_NUMBER: [0-9]+ LITEND?;
BINARY_NUMBER: '%' [01]+ LITEND?;
STRING: '"' .+? '"' ; // very basic definition of a string WIP
BRK:  [bB][rR][kK] ; // equal to $00
NOP:  [nN][oO][pP] ; // equal to $EA

// Undocumented NOPs: both read from zero page but discard the byte
NOP3: [nN][oO][pP]'3' ; // equal to $04, NOP that takes 3 cycles and 2 bytes, zeropage
NOP4: [nN][oO][pP]'4' ; // equal to $14, NOP that takes 4 cycles and 2 bytes, zeropage, x

REGISTER: A | X | Y ;
	A: [aA] ;
	X: [xX] ;
	Y: [yY];
IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*;

WHITESPACE: [ \t]+ -> skip;

EOL: '\r'? '\n';