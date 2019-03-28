grammar fass;

program:
	( statement? EOL )* // optional statements ending in newlines
	statement ? // optional last line with no newline
	EOF ;

// --> Statements
statement:
	  address_stmt
	| remote_label_stmt
	| filler_stmt
	| const_stmt
	| data_stmt
	| nop_brk_stmt
	| flag_set_stmt
	| stack_stmt
	| return_stmt
	| assign_stmt
	// | arithmetic_stmt
	| label statement?
	;

address: 
	  hex_bigend # address_hex
	| dec_bigend # address_dec;
address_stmt: ADDRESS_KWD address;

remote_label_stmt: IDENTIFIER 'at' address;

filler_stmt: 
	  FILLER_KWD value # filler_value 
	| FILLER_KWD DEFAULT_KWD # filler_default;

nop_brk_stmt:
	  mnemonic=NOP 
	| mnemonic=BRK  value?
	| mnemonic=NOP3 value?
	| mnemonic=NOP4 value?;

const_stmt: CONST_KWD lhs=IDENTIFIER '=' value;

data_stmt: DATA_KWD ( datas+= value )+;

flag_set_stmt:
	  flag=( OVERFLOW | CARRY ) '=' operand=DEC_BIGEND
	| flag=( INTERRUPT | DECIMAL_MODE ) operand=( ON_KWD | OFF_KWD )
	;

stack_stmt:
	  reg=A '=' op=PULL_KWD
	| op=PUSH_KWD reg=A
	| reg=FLAGS_KWD '=' op=PULL_KWD
	| op=PUSH_KWD reg=FLAGS_KWD
	;

return_stmt: 
	  RETURN_KWD # return
	| RETINT_KWD # retint;

assign_stmt:
	  register  '=' literal   # assign_reg_lit
	| reg_axys  '=' reg_axys  # assign_reg_reg
	| register  '=' reference # assign_reg_ref
	| reference '=' register  # assign_ref_reg
	| reference '=' register '=' literal   # assign_ref_reg_lit
	| reference '=' register '=' reference # assign_ref_reg_ref
	;
// Statements <--

label: IDENTIFIER ':';

// --> References
reference:
	  name
	| indexed
	| indir_x
	| indir_y
	;

register: reg=( A | X | Y );
reg_axys: reg=( A | X | Y | STACK );

name: lbl=IDENTIFIER; // either a constant or a direct addressing (zero page or absolute)
indexed: lbl=IDENTIFIER '[' reg=(X|Y) ']';
indir_x: '(' lbl=IDENTIFIER '[' reg=X ']' ')';
indir_y: '(' lbl=IDENTIFIER ')' '[' reg=Y ']';
indirect: '(' lbl=IDENTIFIER ')'; // Not included in `reference` because only JMP uses it
// References <--

// --> Values
value: literal | constant;
constant: IDENTIFIER;
literal:
	  hex_bigend
	| hex_litend
	| dec_bigend
	| dec_litend
	| bin_bigend
	| bin_litend
	| negative_number
	| string
	| brk_literal
	| nop_literal
	;

hex_bigend: HEX_BIGEND;
dec_bigend: DEC_BIGEND;
bin_bigend: BIN_BIGEND;
hex_litend: HEX_LITEND;
dec_litend: DEC_LITEND;
bin_litend: BIN_LITEND;
brk_literal: BRK;
nop_literal: NOP;
string: STRING;
negative_number: NEGATIVE_NUMBER;
// Values <--

// --> Literals
LITEND: 'L'; // Little endianness, uppercase only to avoid confusion with the number 1
HEX_BIGEND: '$' [0-9a-fA-F]+ ;
HEX_LITEND: '$' [0-9a-fA-F]+ LITEND;
BIN_BIGEND: '%' [01]+ ;
BIN_LITEND: '%' [01]+ LITEND;
DEC_BIGEND: [0-9]+ ;
DEC_LITEND: [0-9]+ LITEND;
NEGATIVE_NUMBER: '-'[0-9]+; // Intended for 1 byte, range [-128..-1]
BRK: [bB][rR][kK] ; // equal to $00
NOP: [nN][oO][pP] ; // equal to $EA
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
RETURN_KWD: [rR][eE][tT][uU][rR][nN]; // RTS
RETINT_KWD: [rR][eE][tT][iI][nN][tT]; // RTI
PUSH_KWD: [pP][uU][sS][hH] ;
PULL_KWD: [pP][uU][lL][lL] ;
FLAGS_KWD: [fF][lL][aA][gG][sS] ;
NOP3: [nN][oO][pP]'3' ;
NOP4: [nN][oO][pP]'4' ;
// Keywords <--

// --> Flags
CARRY: [cC][aA][rR][rR][yY] ;
OVERFLOW: [oO][vV][eE][rR][fF][lL][oO][wW] ;
INTERRUPT: [iI][nN][tT][eE][rR][rR][uU][pP][tT] ;
DECIMAL_MODE: [dD][eE][cC][iI][mM][aA][lL]' '[mM][oO][dD][eE] ;

ZERO: [zZ][eE][rR][oO] ;
POSITIVE: [pP][oO][sS][iI][tT][iI][vV][eE] ;
NEGATIVE: [nN][eE][gG][aA][tT][iI][vV][eE] ;

ON_KWD: [oO][nN] ;
OFF_KWD: [oO][fF][fF] ;
NOT_KWD: [nN][oO][tT] ;
// Flags <--

A: [aA] ;
X: [xX] ;
Y: [yY] ;
STACK: [sS][tT][aA][cC][kK] ;

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]* ; // The dot allows a dot-notation-like syntactic sugar
WHITESPACE: [ \t]+ -> skip ;
EOL: '\r'? '\n' ;