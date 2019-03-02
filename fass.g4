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
	| return_stmt
	| assign_stmt
	| label statement?
	;

address_stmt: ADDRESS_KWD
	( HEX_BIGEND {self.set_address( int( $HEX_BIGEND.text[1:], 16 ))}
	| DEC_BIGEND {self.set_address( int( $DEC_BIGEND.text ))} );

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

const_stmt: CONST_KWD left_const=IDENTIFIER '='
	( literal {self.declare_constant(name= $left_const.text.lower(), value= $literal.ret)}
	| right_const= IDENTIFIER {self.declare_constant(name= $left_const.text.lower(), value= self.get_constant( $right_const.text ))}
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

remote_label_stmt: IDENTIFIER 'at' the_address {self.set_label( $IDENTIFIER.text.lower(), $the_address.ret )};
label: IDENTIFIER ':' {self.set_label( $IDENTIFIER.text.lower() )};

flag_set_stmt locals [opcode]:
	( OVERFLOW '=' DEC_BIGEND {self.check_value_in( int($DEC_BIGEND.text), [0]) ; opcode = self.opcodes['CLV']}
	| CARRY '=' DEC_BIGEND
		{self.check_value_in( int($DEC_BIGEND.text), [0,1]) }
		{opcode = self.opcodes['SEC'] if $DEC_BIGEND.text == '1' else self.opcodes['CLC'] }
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

return_stmt:
	( RETURN_KWD {self.append_output( self.opcodes[ self.RTS ])}
	| RETINT_KWD {self.append_output( self.opcodes[ self.RTI ])} );

//                            self.load_store_op( mnem, register,       addressing,         operand )
assign_stmt:
	( register '=' literal    {self.load_store_op( "LD", $register.name, self.IMM,           $literal.ret )}
	| register '=' ref_name   {self.load_store_op( "LD", $register.name, $ref_name.ret[0],   $ref_name.ret[1] )}
	| ref_direct '=' register {self.load_store_op( "ST", $register.name, None,               $ref_direct.ret )}
	| register '=' reference  {self.load_store_op( "LD", $register.name, $reference.ret[0],  $reference.ret[1] )}
	| reference '=' register  {self.load_store_op( "ST", $register.name, $reference.ret[0],  $reference.ret[1] )}
	);
// Statements <--

// --> References
reference returns [ret]:
	( ref_indexed_x  {addressing = self.ZPX if len(adrs)==1 else self.ABSX  ;  adrs = $ref_indexed_x.ret }
	| ref_indexed_y  {addressing = self.ZPY if len(adrs)==1 else self.ABSY  ;  adrs = $ref_indexed_y.ret }
	| ref_indirect_x {addressing = self.INDX  ;  adrs = self.check_zeropage( $ref_indirect_x.ret ) }
	| ref_indirect_y {addressing = self.INDY  ;  adrs = self.check_zeropage( $ref_indirect_y.ret ) }
	) {$ret = ( addressing, adrs )};

register returns [name]: reg=(A|X|Y) {$name = $reg.text.upper() };

ref_indexed_x returns [ret]: IDENTIFIER '[' X ']' {$ret = self.get_label( $IDENTIFIER.text.lower() )};
ref_indexed_y returns [ret]: IDENTIFIER '[' Y ']' {$ret = self.get_label( $IDENTIFIER.text.lower() )};
ref_indirect_x returns [ret]: '(' IDENTIFIER '[' X ']' ')' {$ret = self.get_label( $IDENTIFIER.text.lower() )};
ref_indirect_y returns [ret]: '(' IDENTIFIER ')' '[' Y ']' {$ret = self.get_label( $IDENTIFIER.text.lower() )};

// References not included in `reference` rule
ref_name returns [ret]: IDENTIFIER {$ret = self.get_name( $IDENTIFIER.text.lower() )};
ref_direct returns [ret]: IDENTIFIER {$ret = self.get_label( $IDENTIFIER.text.lower() )};
ref_indirect returns [ret]: '(' IDENTIFIER ')' {$ret = self.get_label( $IDENTIFIER.text.lower() )};
// References <--

// --> Values
value returns [ret]: 
	  literal {$ret = $literal.ret}
	| constant {$ret = $constant.ret}
	;
constant returns [ret]: IDENTIFIER {$ret = self.get_constant( $IDENTIFIER.text.lower() )};
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

// the_address: `the_` added to avoid conflict between myParser.address and fassParser.address()
the_address returns [ret]: 
	  hex_bigend {$ret = self.check_address( $hex_bigend.ret )}
	| dec_bigend {$ret = self.check_address( $dec_bigend.ret )}
	;

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