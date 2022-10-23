grammar fass;

program: line* statement? EOF;
line: statement? EOL;

label: IDENTIFIER ':';

// --> Statements
statement:
	address_stmt
	| remote_label_stmt
	| filler_stmt
	| const_stmt
	| data_stmt
	| flag_set_stmt
	| stack_stmt
	| goto_stmt
	| bit_shift_stmt
	| if_stmt
	| label statement?;

address: decimal | hexadecimal;

address_stmt: ADDRESS_KWD address;

remote_label_stmt: IDENTIFIER 'at' address;

filler_stmt: FILLER_KWD (value | DEFAULT_KWD);

const_stmt: CONST_KWD IDENTIFIER '=' value;

data_stmt: DATA_KWD ( datas += value ','?)+;

flag_set_stmt:
	(CARRY | OVERFLOW) '=' decimal
	| (INTERRUPT | DECIMAL_MODE) (ON | OFF);

stack_stmt:
	A '=' PULL_KWD
	| PUSH_KWD A
	| FLAGS_KWD '=' PULL_KWD
	| PUSH_KWD FLAGS_KWD;

goto_stmt: GOTO_KWD reference;

bit_shift_stmt: (ROL_KWD | ROR_KWD | ASL_KWD | LSR_KWD) (
		A
		| reference
	);

if_stmt: if_part then_part else_part? END_KWD;
if_part: IF_KWD condition EOL;
then_part: line+;
else_part: ELSE_KWD EOL line+;

condition:
	NOT? (CARRY | OVERFLOW | EQUAL | ZERO)
	| POSITIVE
	| NEGATIVE;

// --> References
reference: direct | indirect | indexed;
//| indirect_y | x_indirect

direct: IDENTIFIER;
indirect: '(' IDENTIFIER ')';
indexed: IDENTIFIER '[' (X | Y) ']';

// --> Values

value:
	hexadecimal
	| decimal
	| binary
	| negative_number
	| opcode_literal
	| constant;

constant: IDENTIFIER;
opcode_literal: BRK | NOP | NOP3;
hexadecimal: HEXADECIMAL;
decimal: DECIMAL;
binary: BINARY;
brk_literal: BRK;
nop_literal: NOP;
nop3_literal: NOP3;
negative_number: NEGATIVE_NUMBER;

// --> Literals
HEXADECIMAL: '$' [0-9a-fA-F]+;
BINARY: '%' [01]+;
DECIMAL: [0-9]+;
NEGATIVE_NUMBER: '-' [0-9]+;
BRK: [bB][rR][kK];
NOP: [nN][oO][pP];
NOP3: [nN][oO][pP]'3';

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS];
FILLER_KWD: [fF][iI][lL][lL][eE][rR];
DEFAULT_KWD: [dD][eE][fF][aA][uU][lL][tT];
DATA_KWD: [dD][aA][tT][aA];
CONST_KWD: [cC][oO][nN][sS][tT];
IF_KWD: [iI][fF];
THEN_KWD: [tT][hH][eE][nN];
ELSE_KWD: [eE][lL][sS][eE];
END_KWD: [eE][nN][dD];
GOTO_KWD: [gG][oO][tT][oO];
GOSUB_KWD: [gG][oO][sS][uU][bB];
RETURN_KWD: [rR][eE][tT][uU][rR][nN];
RETINT_KWD: [rR][eE][tT][iI][nN][tT];
PUSH_KWD: [pP][uU][sS][hH];
PULL_KWD: [pP][uU][lL][lL];
FLAGS_KWD: [fF][lL][aA][gG][sS];
AND_KWD: [aA][nN][dD]'=';
OR_KWD: [oO][rR]'=';
XOR_KWD: [xX][oO][rR]'=';
BITTEST_KWD: [bB][iI][tT][tT][eE][sS][tT];
COMPARE_KWD: [cC][oO][mM][pP][aA][rR][eE];
ROTATE_KWD: [rR][oO][tT][aA][tT][eE];
SHIFT_KWD: [sS][hH][iI][fF][tT];
ROL_KWD: ROTATE_KWD '<';
ROR_KWD: ROTATE_KWD '>';
ASL_KWD: SHIFT_KWD '<';
LSR_KWD: SHIFT_KWD '>';
// Keywords <--

// --> Flags
CARRY: [cC][aA][rR][rR][yY];
OVERFLOW: [oO][vV][eE][rR][fF][lL][oO][wW];
INTERRUPT: [iI][nN][tT][eE][rR][rR][uU][pP][tT];
DECIMAL_MODE: [dD][eE][cC][iI][mM][aA][lL];

NOT: [nN][oO][tT];
ZERO: [zZ][eE][rR][oO];
POSITIVE: [pP][oO][sS][iI][tT][iI][vV][eE];
NEGATIVE: [nN][eE][gG][aA][tT][iI][vV][eE];
EQUAL: [eE][qQ][uU][aA][lL];

ON: [oO][nN];
OFF: [oO][fF][fF];

// ETC -->
A: [aA];
X: [xX];
Y: [yY];
STACK: [sS][tT][aA][cC][kK];

IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*;
// The dot allows a dot-notation-like syntactic sugar 
WHITESPACE: [ \t]+ -> skip;
EOL: '\r'? '\n';