grammar fass;

program:
	(statement? EOL)* // optional statements ending in newlines
	statement? // optional last line with no newline
	EOF;

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
	| goto_stmt
	| bit_shift_stmt
	| logic_stmt
	| compare_stmt
	| bittest_stmt
	| gosub_stmt
	| return_stmt
	| assign_stmt
	| arithmetic_stmt
	| label statement?;

address: decimal | hexadecimal;
address_stmt: ADDRESS_KWD address;

remote_label_stmt: IDENTIFIER 'at' address;

filler_stmt: FILLER_KWD value | FILLER_KWD DEFAULT_KWD;

nop_brk_stmt:
	mnemonic = NOP
	| mnemonic = BRK value?
	| mnemonic = NOP3 value?
	| mnemonic = NOP4 value?;

const_stmt: CONST_KWD const_name = IDENTIFIER '=' value;

data_stmt: DATA_KWD ( datas += value ','?)+;

flag_set_stmt:
	flag = (OVERFLOW | CARRY) '=' operand = DECIMAL // CLV SEC CLC
	| flag = (INTERRUPT | DECIMAL_MODE) operand = (
		ON_KWD
		| OFF_KWD
	) ; // SEI CLI SED CLD

stack_stmt:
	reg = A '=' op = PULL_KWD // PLA
	| op = PUSH_KWD reg = A // PHA
	| reg = FLAGS_KWD '=' op = PULL_KWD // PLP
	| op = PUSH_KWD reg = FLAGS_KWD ; // PHP

return_stmt:
	RETURN_KWD		# return // RTS
	| RETINT_KWD	# retint; // RTI

goto_stmt: GOTO_KWD ref = reference; // JMP

gosub_stmt: GOSUB_KWD ref = reference; // JSR

assign_stmt:
	reg = register '=' lit = literal						# assign_reg_lit // LDA LDX LDY
	| reg1 = reg_axys '=' reg2 = reg_axys					# assign_reg_reg // TAX TAY TXA TYA TXS TSX
	| reg = register '=' ref = reference					# assign_reg_ref // LDA LDX LDY 
	| ref = reference '=' reg = register					# assign_ref_reg // STA STX STY
	| ref = reference '=' reg = register '=' lit = literal	# assign_ref_reg_lit
		// LDA LDX LDY + STA STX STY
	| ref1 = reference '=' reg = register '=' ref2 = reference # assign_ref_reg_ref
		; // LDA LDX LDY + STA STX STY

arithmetic_stmt:
	A op = ('+=' | '-=') lit = literal					# arithmetic_a_lit // ADC SBC
	| A op = ('+=' | '-=') ref = reference				# arithmetic_a_ref // ADC SBC
	| reg = register op = ('+=' | '-=') lit = literal	# arithmetic_reg_inc // INX INY DEX DEY
	| ref = reference op = ('+=' | '-=') lit = literal	# arithmetic_ref_lit ; // INC DEC

bit_shift_stmt: (A | reference) op = ('<<' | '>>' | '<-' | '->');

logic_stmt:
	A op = (AND_KWD | OR_KWD | XOR_KWD) (literal | reference);

compare_stmt: COMPARE_KWD A ',' (reference | literal);

bittest_stmt: BITTEST_KWD A ',' ref = reference;

// Statements <--

label: IDENTIFIER ':';

// --> References
reference: name | indexed | indir_x | indir_y | indirect;

register: reg_name = ( A | X | Y);
reg_axys: reg_name = ( A | X | Y | STACK);

name:
	lbl = IDENTIFIER; // either a constant or a direct addressing (zero page or absolute)
indexed: lbl = IDENTIFIER '[' reg = (X | Y) ']';
indir_x: '(' lbl = IDENTIFIER '[' reg = X ']' ')';
indir_y: '(' lbl = IDENTIFIER ')' '[' reg = Y ']';
indirect: '(' lbl = IDENTIFIER ')'; // only JMP uses it
// References <--

// --> Values
value: literal | constant;
constant: IDENTIFIER;
literal:
	hexadecimal
	| decimal
	| binary
	| negative_number
	| string
	| brk_literal
	| nop_literal;

hexadecimal: HEXADECIMAL;
decimal: DECIMAL;
binary: BINARY;
brk_literal: BRK;
nop_literal: NOP;
string: STRING;
negative_number: NEGATIVE_NUMBER;
// Values <--

// --> Literals
HEXADECIMAL: '$' [0-9a-fA-F]+;
BINARY: '%' [01]+;
DECIMAL: [0-9]+;
NEGATIVE_NUMBER: '-' [0-9]+; // Intended for 1 byte, range [-128..-1]
BRK: [bB][rR][kK]; // equal to $00
NOP: [nN][oO][pP]; // equal to $EA
STRING: '"' (ESC | .)+? '"';
fragment ESC: '\\"' | '\\\\';
// Literals <--

// --> Keywords
ADDRESS_KWD: [aA][dD][dD][rR][eE][sS][sS];
FILLER_KWD: [fF][iI][lL][lL][eE][rR];
DEFAULT_KWD: [dD][eE][fF][aA][uU][lL][tT];
DATA_KWD: [dD][aA][tT][aA];
CONST_KWD: [cC][oO][nN][sS][tT];
GOTO_KWD: [gG][oO][tT][oO]; // JMP
GOSUB_KWD: [gG][oO][sS][uU][bB]; // JSR
RETURN_KWD: [rR][eE][tT][uU][rR][nN]; // RTS
RETINT_KWD: [rR][eE][tT][iI][nN][tT]; // RTI
PUSH_KWD: [pP][uU][sS][hH];
PULL_KWD: [pP][uU][lL][lL];
FLAGS_KWD: [fF][lL][aA][gG][sS];
AND_KWD: [aA][nN][dD]'=';
OR_KWD: [oO][rR]'=';
XOR_KWD: [xX][oO][rR]'=';
BITTEST_KWD: [bB][iI][tT][tT][eE][sS][tT];
COMPARE_KWD: [cC][oO][mM][pP][aA][rR][eE];
NOP3: [nN][oO][pP]'3';
NOP4: [nN][oO][pP]'4';
// Keywords <--

// --> Flags
CARRY: [cC][aA][rR][rR][yY];
OVERFLOW: [oO][vV][eE][rR][fF][lL][oO][wW];
INTERRUPT: [iI][nN][tT][eE][rR][rR][uU][pP][tT];
DECIMAL_MODE:
	[dD][eE][cC][iI][mM][aA][lL]' ' [mM][oO][dD][eE];

ZERO: [zZ][eE][rR][oO];
POSITIVE: [pP][oO][sS][iI][tT][iI][vV][eE];
NEGATIVE: [nN][eE][gG][aA][tT][iI][vV][eE];

ON_KWD: [oO][nN];
OFF_KWD: [oO][fF][fF];
NOT_KWD: [nN][oO][tT];
// Flags <--

A: [aA];
X: [xX];
Y: [yY];
STACK: [sS][tT][aA][cC][kK];

IDENTIFIER:
	[_a-zA-Z] [._a-zA-Z0-9]*; // The dot allows a dot-notation-like syntactic sugar
WHITESPACE: [ \t]+ -> skip;
EOL: '\r'? '\n';