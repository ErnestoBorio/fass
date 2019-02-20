grammar fass;

program:
	( statement? EOL )* // optional statements ending in newlines
	statement ? // optional last line with no newline
	EOF ;

// --> Statements
statement:
	  address_stmt
	| filler_stmt
	| const_stmt
	| data_stmt
	| nop_brk_stmt
	| remote_label_stmt
	| flag_set_stmt
	| stack_stmt
	| label statement?
	;

address_stmt: ADDRESS_KWD adr=HEX_BIGEND {self.set_address( $adr.text)} ;
filler_stmt: FILLER_KWD (
	  fb=filler_byte {self.set_filler( $fb.ret )}
	| DEFAULT_KWD    {self.set_filler( self.default_filler )}
	);

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
data_stmt: 
	DATA_KWD 
		( value {self.append_output( $value.ret )} ) // WIP TODO if data() should do additional checking, review this action
		( ',' datas+= value )* {self.data( $datas )};

nop_brk_stmt:
	  BRK  {self.append_output( self.opcodes[self.BRK]  )}
	| NOP  {self.append_output( self.opcodes[self.NOP]  )}
	| NOP3 {self.append_output( self.opcodes[self.NOP3] )} ( value {self.append_output( self.check_length( $value.ret, 1 ))} )?
	| NOP4 {self.append_output( self.opcodes[self.NOP4] )} ( value {self.append_output( self.check_length( $value.ret, 1 ))} )?
	; // NOP3 and NOP4 are illegal instructions that waste 3 and 4 cycles respectively, used for timing

remote_label_stmt: IDENTIFIER 'at' address {self.set_label( $IDENTIFIER.text.lower(), $address.ret )};
label: IDENTIFIER ':' {self.set_label( $IDENTIFIER.text.lower() )};

flag_set_stmt locals [opcode]:
	( OVERFLOW '=' '0' {opcode = self.opcodes['CLV']}
	| CARRY '='
		( '1' {opcode = self.opcodes['SEC']}
		| '0' {opcode = self.opcodes['CLC']} )
	| INTERRUPT
		( ON_KWD  {opcode = self.opcodes['CLI']}
		| OFF_KWD {opcode = self.opcodes['SEI']} )
	| DECIMAL_MODE
		( ON_KWD  {opcode = self.opcodes['SED']}
		| OFF_KWD {opcode = self.opcodes['CLD']} )
	) {self.append_output( opcode )} ;

stack_stmt locals [opcode]:
	( A '=' PULL_KWD {opcode = self.opcodes[ self.PLA ]}
	| PUSH_KWD A     {opcode = self.opcodes[ self.PHA ]}
	| FLAGS_KWD '=' PULL_KWD {opcode = self.opcodes[ self.PLP ]}
	| PUSH_KWD FLAGS_KWD {opcode = self.opcodes[ self.PHP ]}
	) {self.append_output( opcode )} ;
// Statements <--

// --> Values
value returns [ret]: 
	  literal {$ret = $literal.ret}
	| constant=IDENTIFIER {$ret = self.get_constant( $constant.text )}
	;
literal returns [ret]: (
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
	) {$ret = localctx.children[0].ret}; // pass through whatever value subrules return, to parent rule const_stmt

address returns [ret]: adrs=( HEX_BIGEND | DEC_BIGEND ) {$ret = self.check_address( $adrs.text )};

hex_bigend returns [ret]: HEX_BIGEND {$ret = self.serialize( int( $HEX_BIGEND.text[1:], 16 ))};
dec_bigend returns [ret]: DEC_BIGEND {$ret = self.serialize( int( $DEC_BIGEND.text ))};
bin_bigend returns [ret]: BIN_BIGEND {$ret = self.serialize( int( $BIN_BIGEND.text[1:], 2 ))};
hex_litend returns [ret]: HEX_LITEND {$ret = self.serialize( int( $HEX_LITEND.text[1:-1], 16 ), 'little')};
dec_litend returns [ret]: DEC_LITEND {$ret = self.serialize( int( $DEC_LITEND.text[:-1] ), 'little')};
bin_litend returns [ret]: BIN_LITEND {$ret = self.serialize( int( $BIN_LITEND.text[1:-1], 2 ), 'little')};
string     returns [ret]: STRING {$ret = self.serialize( $STRING.text[1:-1] )};
negative_number returns [ret]: NEGATIVE_NUMBER {$ret = self.serialize( self.check_negative( int($NEGATIVE_NUMBER.text)), signed= True )};
brk_literal returns [ret]: BRK {$ret = self.opcodes[self.BRK]};
nop_literal returns [ret]: NOP {$ret = self.opcodes[self.NOP]};
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