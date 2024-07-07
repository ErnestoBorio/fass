grammar fass;

program: line* statement? EOF;
line: TAB* statement? EOL;

// --> Statements
statement:
	address_stmt
	| remote_label_stmt
	| filler_stmt
	| const_stmt
	| data_stmt
	| flag_set_stmt
	| stack_stmt
	| bit_shift_stmt
	| logic_stmt
	| goto_stmt
	| gosub_stmt
	| return_stmt
	| if_stmt
	| reg_assign_stmt
	| label statement?;

label: IDENTIFIER ':';

address_stmt: ADDRESS_KWD address;

remote_label_stmt: IDENTIFIER 'at' address;

address: decimal | hexadecimal;

filler_stmt: FILLER_KWD (static_value | DEFAULT_KWD);

const_stmt: CONST_KWD IDENTIFIER '=' static_value;

data_stmt: DATA_KWD ( datas += static_value ','?)+;

flag_set_stmt:
	(CARRY | OVERFLOW | INTERRUPT | DECIMAL_MODE) '=' DECIMAL;

stack_stmt: (PUSH_KWD | PULL_KWD) (A | FLAGS_KWD);

goto_stmt: GOTO_KWD (direct | indirect);

gosub_stmt: GOSUB_KWD direct;

return_stmt: RETURN_KWD | RETINT_KWD;

bit_shift_stmt: (ROL_KWD | ROR_KWD | ASL_KWD | LSR_KWD) (
		A
		| direct
		| indexed
	);

logic_stmt:
	A op = (AND_KWD | OR_KWD | XOR_KWD | COMPARE_KWD | BIT_KWD) (
		literal
		| reference
	);

register: A | X | Y;
registers: A | X | Y | STACK;
reg_assign_stmt: register '=' rhs_value;
ref_assign_stmt: reference '=' register;
reg_reg_assign_stmt: registers '=' registers;
ref_ref_assign_stmt: reference '=' register '=' rhs_value;

if_stmt: if_part then_part else_part? END_KWD;
if_part: IF_KWD condition EOL;
then_part: line+;
else_part: ELSE_KWD EOL line+;

condition:
	NOT? (CARRY | OVERFLOW | EQUAL | ZERO)
	| POSITIVE
	| NEGATIVE;

rhs_value: literal | name | reference;
static_value: literal | name | STRING;

name: IDENTIFIER; // A constant or a label

reference:
	direct
	| indirect
	| indexed
	| indirect_y
	| x_indirect;

direct: name; // Only labels are valid names here
indirect: '(' name ')';
indexed: name '[' (X | Y) ']';
indirect_y: '(' name ')' '[' Y ']';
x_indirect: '(' name '[' X ']' ')';

literal:
	hexadecimal
	| decimal
	| binary
	| negative_number
	| opcode_literal;

hexadecimal: HEXADECIMAL;
decimal: DECIMAL;
binary: BINARY;
negative_number: NEGATIVE_NUMBER;
opcode_literal: BRK | NOP | NOP3;

STRING: '"' (ESC | ~["])* '"';
ESC: '\\"';

// --> Literals
HEXADECIMAL: '$' [0-9a-fA-F]+;
BINARY: '%' [01]+;
DECIMAL: [0-9]+;
NEGATIVE_NUMBER: '-' [1-9] [0-9]*;
BRK: [bB][rR][kK];
NOP: [nN][oO][pP];
NOP3: [nN][oO][pP]'3';

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS];
AND_KWD: [aA][nN][dD]'=';
BIT_KWD: [bB][iI][tT];
COMPARE_KWD: [cC][oO][mM][pP][aA][rR][eE];
CONST_KWD: [cC][oO][nN][sS][tT];
DATA_KWD: [dD][aA][tT][aA];
DEFAULT_KWD: [dD][eE][fF][aA][uU][lL][tT];
ELSE_KWD: [eE][lL][sS][eE];
END_KWD: [eE][nN][dD];
FILLER_KWD: [fF][iI][lL][lL][eE][rR];
FLAGS_KWD: [fF][lL][aA][gG][sS];
GOSUB_KWD: [gG][oO][sS][uU][bB];
GOTO_KWD: [gG][oO][tT][oO];
IF_KWD: [iI][fF];
OR_KWD: [oO][rR]'=';
PULL_KWD: [pP][uU][lL][lL];
PUSH_KWD: [pP][uU][sS][hH];
RETINT_KWD: [rR][eE][tT][iI][nN][tT];
RETURN_KWD: [rR][eE][tT][uU][rR][nN];
ROTATE_KWD: [rR][oO][tT][aA][tT][eE];
SHIFT_KWD: [sS][hH][iI][fF][tT];
THEN_KWD: [tT][hH][eE][nN];
WHILE_KWD: [wW][hH][iI][lL][eE];
XOR_KWD: [xX][oO][rR]'=';
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

// ETC -->
A: [aA];
X: [xX];
Y: [yY];
STACK: [sS][tT][aA][cC][kK];

// The dot allows a dot-notation-like syntactic sugar 
IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*;
TAB: '\t';
EOL: '\r'? '\n';
WHITESPACE: ' '+ -> skip;