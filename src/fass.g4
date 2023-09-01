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
	| bit_shift_stmt
	| logic_stmt
	| goto_stmt
	| gosub_stmt
	| return_stmt
	| if_stmt
	| reg_assign_stmt
	| label statement?;

address_stmt: ADDRESS_KWD address;

remote_label_stmt: IDENTIFIER 'at' address;

address: decimal | hexadecimal;

filler_stmt: FILLER_KWD (staticValue | DEFAULT_KWD);

const_stmt: CONST_KWD IDENTIFIER '=' staticValue;

data_stmt: DATA_KWD ( datas += staticValue ','?)+;

flag_set_stmt:
	(CARRY | OVERFLOW) '=' ZERONE
	| (INTERRUPT | DECIMAL_MODE) (ON | OFF);

stack_stmt: (PUSH_KWD | PULL_KWD) (A | FLAGS_KWD);

goto_stmt: GOTO_KWD (direct | indirect);
gosub_stmt: GOTO_KWD (direct | indirect);

return_stmt: RETURN_KWD | RETINT_KWD;

bit_shift_stmt: (ROL_KWD | ROR_KWD | ASL_KWD | LSR_KWD) (
		A
		| reference
	);

logic_stmt:
	A op = (AND_KWD | OR_KWD | XOR_KWD | COMPARE_KWD | BIT_KWD) (
		literal
		| reference
	);

reg_assign_stmt: reg = (A | X | Y) '=' value;

if_stmt: if_part then_part else_part? END_KWD;
if_part: IF_KWD condition EOL;
then_part: line+;
else_part: ELSE_KWD EOL line+;

condition:
	NOT? (CARRY | OVERFLOW | EQUAL | ZERO)
	| POSITIVE
	| NEGATIVE;

value: literal | name | reference;
staticValue: literal | name;

name: IDENTIFIER; // A constant or a label

reference:
	direct
	| indirect
	| indexed
	| indirect_y
	| x_indirect;

direct: name; // Only labels are valid names here
indirect: '(' IDENTIFIER ')';
indexed: IDENTIFIER '[' (X | Y) ']';
indirect_y: '(' IDENTIFIER ')' '[' Y ']';
x_indirect: '(' IDENTIFIER '[' X ']' ')';

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

// --> Literals
HEXADECIMAL: '$' [0-9a-fA-F]+;
BINARY: '%' [01]+;
DECIMAL: [0-9]+;
NEGATIVE_NUMBER: '-' [0-9]+;
BRK: [bB][rR][kK];
NOP: [nN][oO][pP];
NOP3: [nN][oO][pP]'3';
ZERONE: [01];

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
BIT_KWD: [bB][iI][tT];
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

// The dot allows a dot-notation-like syntactic sugar 
IDENTIFIER: [_a-zA-Z] [._a-zA-Z0-9]*;
WHITESPACE: [ \t]+ -> skip;
EOL: '\r'? '\n';