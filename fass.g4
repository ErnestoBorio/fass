grammar fass;

program: ( 
	( statement | block | ) EOL )* // optional statements or blocks ending in newlines
	( statement | block )? // optional last line with no newline
	EOF ;

block: '<< to be implemented >>'; // block of statements

statement: // single line statements
	  address_stmt
	| filler_stmt
	| data_stmt
	| const_stmt
	| nop_stmt
	| brk_stmt
	| goto_stmt
	| assign_stmt
	| remote_label_stmt
	| label statement?
	;

address_stmt: ADDRESS_KWD address ; // set memory address for next instruction
filler_stmt: FILLER_KWD ( value | DEFAULT_KWD ) ; // set filler for empty memory blocks
data_stmt: DATA_KWD value ( ',' value )* ; // insert raw data into code
const_stmt: CONST_KWD IDENTIFIER '=' value ; // define a named constant literal

nop_stmt: 
	  NOP // do nothing for 2 cpu cycles
	| NOP3 value? // NOP for 3 cycles, optionally provide disposable argument
	| NOP4 value? // NOP for 4 cycles, optionally provide disposable argument
	;

brk_stmt: BRK value?; // jump to Break interrupt handler, takes 2 bytes, argument is discarded

remote_label_stmt: IDENTIFIER 'at' address; // set a label on an address without changing current program counter

// --> Assignments and References
assign_stmt:
	  assign_reg_lit // A = 5 -> LDA, LDX, LDY
	| assign_reg_id  // A = const1 | A = label -> LDA, LDX, LDY
	| assign_id_reg  // label = A -> STA, STX, STY
	| assign_reg_ref // A = reference -> LDA, LDX, LDY
	| assign_ref_reg // reference = A -> STA, STX, STY
	| assign_reg_reg // X = Stack -> TSX, TXS
	| assign_id_reg_cdl
	| assign_ref_reg_cdl
	| assign_ref_reg_ref // label1[X] = A = label2[Y] -> LDA, LDX, LDY + STA, STX, STY
	;
assign_reg_lit: REGISTER  '=' literal ;
assign_reg_id:  REGISTER  '=' IDENTIFIER ; // IDENTIFIER can be a direct reference to a label, or a constant
assign_id_reg:  IDENTIFIER '=' REGISTER ; // IDENTIFIER can be a direct reference to a label, or a constant (which is an error)
assign_reg_ref: REGISTER  '=' reference ;
assign_ref_reg: reference '=' REGISTER ;
assign_reg_reg: (REGISTER|STACK) '=' (REGISTER|STACK) ;
assign_id_reg_cdl: IDENTIFIER '=' REGISTER '=' con_dir_lit;
assign_ref_reg_cdl: reference '=' REGISTER '=' con_dir_lit;
assign_ref_reg_ref: reference '=' REGISTER '=' reference;
	// Last 3 synthesize `LDA ref_source; STA ref_dest` with: ref_dest = A = ref_source
	// Making evident that A is used to pass the value, so A will hold a new value and also impact flags

reference:
	  ref_indexed
	| ref_indirect_x
	| ref_indirect_y
	;
ref_indexed: IDENTIFIER '[' REGISTER ']' ;
ref_indirect_x: '(' IDENTIFIER ')' '[' REGISTER ']' ;
ref_indirect_y: '(' IDENTIFIER '[' REGISTER ']' ')' ;
// Assignments and References <--

ref_indirect: '(' IDENTIFIER ')' ; // outside of reference because it's only used by goto/JMP
con_dir_lit: literal | IDENTIFIER ; // a constant, a direct reference or a literal

goto_stmt: GOTO_KWD ( IDENTIFIER | ref_indirect ) ;

label: IDENTIFIER ':' ;
value: literal | IDENTIFIER ;

literal: HEX_BIGEND | HEX_LITEND | DECIMAL_NUMBER | BINARY_NUMBER | STRING | BRK | NOP ;
hex_number: HEX_BIGEND | HEX_LITEND ;
address: HEX_BIGEND ;

ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS] ;
FILLER_KWD : [fF][iI][lL][lL][eE][rR] ;
DEFAULT_KWD : [dD][eE][fF][aA][uU][lL][tT] ;
DATA_KWD : [dD][aA][tT][aA] ;
CONST_KWD: [cC][oO][nN][sS][tT] ;
GOTO_KWD: [gG][oO][tT][oO] ;

// literals:
LITEND: 'L'; // Little endianness. 
	// Possibly the only case sensitive token, to avoid confusion with the number 1
HEX_BIGEND: '$' [0-9a-fA-F]+ ;
HEX_LITEND: '$' [0-9a-fA-F]+ LITEND;
	// TODO WIP maybe make hex_bigend a grammar rule and keep unified HEX_NUMBER as a token?
DECIMAL_NUMBER: [0-9]+ LITEND?;
BINARY_NUMBER: '%' [01]+ LITEND?;
STRING: '"' .+? '"' ; // very basic definition of a string WIP
BRK:  [bB][rR][kK] ; // equal to $00
NOP:  [nN][oO][pP] ; // equal to $EA
// NOP & BRK are both literals and statements

// Undocumented NOPs: both read from zero page but discard the byte
NOP3: [nN][oO][pP]'3' ; // equal to $04, NOP that takes 3 cycles and 2 bytes, zeropage
NOP4: [nN][oO][pP]'4' ; // equal to $14, NOP that takes 4 cycles and 2 bytes, zeropage,X

// --> Flags
ZERO: [zZ][eE][rR][oO] ;
CARRY: [cC][aA][rR][rR][yY] ;
OVERFLOW: [oO][vV][eE][rR][fF][lL][oO][wW] ;
INTERRUPT: [iI][nN][tT][eE][rR][rR][uU][pP][tT] ;
POSITIVE: [pP][oO][sS][iI][tT][iI][vV][eE] ;
NEGATIVE: [nN][eE][gG][aA][tT][iI][vV][eE] ;
DECIMAL_MODE: [dD][eE][cC][iI][mM][aA][lL]' '[mM][oO][dD][eE] ;

ENABLE_KWD: [eE][nN][aA][bB][lL][eE] ;
DISABLE_KWD: [dD][iI][sS][aA][bB][lL][eE] ;
// Flags <--

REGISTER: [aA] | [xX] | [yY] ;
STACK: [sS][tT][aA][cC][kK] ;

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*; // the dot allows a dot-notation-like syntactic sugar

WHITESPACE: [ \t]+ -> skip;

EOL: '\r'? '\n';