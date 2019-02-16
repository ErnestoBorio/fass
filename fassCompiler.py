
import re
from fassParser import fassParser
from fassLexer import fassLexer as lxr
from fassListener import fassListener
from antlr4.tree.Tree import TerminalNodeImpl
from antlr4.ParserRuleContext import ParserRuleContext
from petruza.misc import obj

prs = fassParser # just an alias

class fassCompiler(fassListener) :

	class reference:
		def __init__(my, label = None, address = None, addressing = None, zeropage = False ):
			my.label = label
			my.address = address
			my.addressing = addressing
			my.zeropage = zeropage

	# enum addressing modes:
	IMP = "IMP"; IMM = "IMM"; ZP = "ZP"; ZPX = "ZPX"; ZPY = "ZPY"; ABS = "ABS"
	ABSX = "ABSX"; ABSY = "ABSY"; IND = "IND"; INDX = "INDX"; INDY = "INDY"	

	# addressing mode names:
	addressings = { IMP:"implied", IMM:"immediate", ZP:"zero page", ZPX:"zero page x-indexed", 
		ZPY:"zero page y-indexed", ABS:"absolute", ABSX:"absolute x-indexed", ABSY:"absolute y-indexed", 
		IND:"indirect", INDX:"x-indexed indirect", INDY:"indirect y-indexed" }
	
	# enum operations:
	ADC = "ADC"; AND = "AND"; ASL = "ASL"; BCC = "BCC"; BCS = "BCS"; BEQ = "BEQ"; BIT = "BIT"; BMI = "BMI"
	BNE = "BNE"; BPL = "BPL"; BRK = "BRK"; BVC = "BVC"; BVS = "BVS"; CLC = "CLC"; CLD = "CLD"; CLI = "CLI"
	CLV = "CLV"; CMP = "CMP"; CPX = "CPX"; CPY = "CPY"; DEC = "DEC"; DEX = "DEX"; DEY = "DEY"; EOR = "EOR"
	INC = "INC"; INX = "INX"; INY = "INY"; JMP = "JMP"; JSR = "JSR"; LDA = "LDA"; LDX = "LDX"; LDY = "LDY"
	LSR = "LSR"; NOP = "NOP"; ORA = "ORA"; PHA = "PHA"; PHP = "PHP"; PLA = "PLA"; PLP = "PLP"; ROL = "ROL"
	ROR = "ROR"; RTI = "RTI"; RTS = "RTS"; SBC = "SBC"; SEC = "SEC"; SED = "SED"; SEI = "SEI"; STA = "STA"
	STX = "STX"; STY = "STY"; TAX = "TAX"; TAY = "TAY"; TSX = "TSX"; TXA = "TXA"; TXS = "TXS"; TYA = "TYA"
	NOP3 = "NOP3"; NOP4 = "NOP4" # undocumented operations
	
	opcodes = {
		LDA: { IMM:b"\xA9", ZP:b"\xA5", ZPX:b"\xB5", ABS:b"\xAD", ABSX:b"\xBD", ABSY:b"\xB9", INDX:b"\xA1", INDY:b"\xB1" },
		LDX: { IMM:b"\xA2", ZP:b"\xA6", ZPY:b"\xB6", ABS:b"\xAE", ABSY:b"\xBE" },
		LDY: { IMM:b"\xA0", ZP:b"\xA4", ZPX:b"\xB4", ABS:b"\xAC", ABSX:b"\xBC" },
		STA: { ZP:b"\x85", ZPX:b"\x95", ABS:b"\x8D", ABSX:b"\x9D", ABSY:b"\x99", INDX:b"\x81", INDY:b"\x91" },
		STX: { ZP:b"\x86", ZPY:b"\x96", ABS:b"\x8E" },
		STY: { ZP:b"\x84", ZPX:b"\x94", ABS:b"\x8C" },
		TAX: b"\xAA", TXA: b"\x8A", TAY: b"\xA8", TYA: b"\x98", TSX: b"\xBA", TXS: b"\x9A",
		JMP: { ABS:b"\x4C", IND:b"\x6C" },
		NOP:  b"\xEA", NOP3: b"\x04", NOP4: b"\x14",
		BRK:  b"\x00"
	}

	def __init__(my):
		my.filler = my.opcodes[my.NOP]
		my.cur_ref = None # holds current reference between enterStatement() and exitStatement() in a state machine fashion
		my.address = None
		my.offset = 0 # output byte current count
		my.address_2B_defined = b"\x2B\xDF" # to be defined, forward or undefined reference. $2BDF ;)
		my.pending_refs = [] # forward or undefined references
		my.labels = {}
		my.consts = {}
		my.output = bytearray()

	# ensure address is between valid 6502 bounds
	def assert_address_valid( my, address ):
		my.assert_value_16bits( address, "The 6502 has 64KB of memory, address" )

	def assert_value_8bits( my, value, element: str = 'Value' ):
		assert -128 <= value <= 0xFF, f"{element} should be 8 bits long, between -128 and 255($FF)"
	
	def assert_value_16bits( my, value, element: str = 'Value' ):
		assert 0 <= value <= 0xFFFF, f"{element} should be 16 bits long, between 0 and $FFFF"

	def get_mnemonic( my, operation, register ):
		return operation.upper() + register.upper()

	def get_output( my ):
		return my.output
	
	def as_dict(my):
		''' A quick debug output of relevant properties. '''
		return {
			"address": hex(my.address),
			"offset": my.offset,
			"labels": my.labels,
			"consts": my.consts,
			"pending_refs": my.pending_refs,
			"cur_ref": my.cur_ref,
			"output": my.output.hex().upper()
		}

	# ---------------------------------------------------------------------------------------------------- Utility methods
	
	# decode value string as read by the parser into a typed value. Don't pass values with L suffix
	def decode_value( my, value ):
		match = re.match( r"\$(.+)L?", value )
		if match: # hex
			return int( match[1], 16 )
		else:
			match = re.match( r"([0-9]+)L?", value )
			if match: # decimal
				return int( match[1] )
			else:
				match = re.match( r"%(.+)L?", value )
				if match: #binary
					return int( match[1], 2 )
				else:
					raise Exception(f"Value expression `{value}` can't be decoded yet")

	def serialize( my, data ):
		value = None
		match = re.match( r"\$([a-fA-F0-9]+)L?", data )
		if match: # hex
			value = match[1]
		else:
			match = re.match( r"([0-9]+)L?", data )
			if match: # decimal
				value = "%X"%( int( match[1] ))
			else:
				match = re.match( r"%([01]+)L?", data )
				if match: #binary
					value = "%X"%( int( match[1], 2 ))
		little_endian = True if (data[-1] == "L") else False
		output = bytearray()
		if value is None:
			raise Exception(f"Data expression `{data}` can't be serialized yet")
		else:
			if len(value)%2 == 1: # give value an even number of hex digits
				value = "0"+ value 
			for i in range( 0, len(value),2 ):
				byte = int( value[i:i+2], 16)
				if little_endian:
					output.insert(0, byte)
				else:
					output.append(byte)
		return output

	def append_output(my, output: bytearray):
		assert my.address is not None, "Output started without setting an address"
		my.output += output
		my.address += len( output )
		my.offset += len( output )

	def add_pending_reference(my, name: str, offset: int):
		""" When an unknown label is referenced, just store $2BDF as the operation's address and keep
		record of where it was for when the label is found and the correct address can be overwritten """
		my.pending_refs.append({
			"name": name, 
			"offset": offset+1 }) # skip the opcode and keep the offset for the address to be corrected
		""" WIP TODO quizas guardar también la referencia de línea del source por si no se encuentra el label """
	
	def find_ancestor(my, ctx: ParserRuleContext, context_type: type ) -> ParserRuleContext:
		''' Find the closest ancestor of the given type '''
		while type(ctx) is not context_type:
			try:
				ctx = ctx.parentCtx
			except AttributeError:
				return None

	def resolve_label(my, label: str, absolute: bool = False) -> (bytes, bool):
		''' Get the address of a label or handle it if it hasn't been yet defined '''
		label = label.lower()
		if label in my.labels:
			address = my.labels[label]
			if absolute: # force address to be absolute
				zeropage = False
				if len(address) == 1:
					address += b"\x00" # It's little endian, so append 0 to make absolute
			else:
				zeropage = (len(address) == 1)
		else:
			zeropage = False # if forward declaration, assume it's absolute. Zero page optimization is lost.
				# Anyway, who puts code in the zero page? very unlikely.
			address = my.address_2B_defined # put a placeholder address in the output code to be later replaced.
			my.add_pending_reference( label, my.offset)
		return address, zeropage
	
	def append_operation(my, mnemonic: str, addressing: str, operand: bytes = b"" ):
		try:
			operation = my.opcodes[ mnemonic ][ addressing ]
		except KeyError:
			raise Exception(f"Operation {mnemonic} doesn't have the {my.addressings[addressing]} addressing mode.")
		else:
			my.append_output( operation + operand )
	
	def get_register(my, ctx: ParserRuleContext) -> str:
		return ctx.REGISTER().symbol.text.upper()

	def get_identifier(my, ctx: ParserRuleContext) -> str:
		return ctx.IDENTIFIER().symbol.text.lower()
# ---------------------------------------------------------------------------------------------------- Grammar rules listeners

# ADDRESS
	def enterAddress_stmt(my, ctx:fassParser.Address_stmtContext):
		""" set current address for producing next output byte """
		address = ctx.address().children[0].symbol.text
		address = my.decode_value( address )
		my.assert_address_valid( address )
		assert (my.address is None) or (address >= my.address), f"Address {address} would overlap current address {my.address}"
		if my.address is not None and address > my.address : # have to fill output with filler byte
			gap = address - my.address
			my.output += my.filler * gap # fill the gap with the filler byte
		my.address = address

# LABEL
	def enterLabel(my, ctx:fassParser.LabelContext):
		# WIP TODO Doesn't handle zeropage addresses well
		assert my.address is not None, "Can't declare a label before an address has been set"
		label = ctx.children[0].symbol.text.lower()
		assert label not in my.labels, "Label `{label}` has already been declared"
		my.labels[ label] = my.serialize( str(my.address)+"L")

# REMOTE LABEL
	def enterRemote_label_stmt(my, ctx:fassParser.Remote_label_stmtContext):
		""" Define a label remotely, that is, not in the current address. Example: C64.border_color at $D020
		    Doesn't produce output """
		# WIP TODO Doesn't handle zeropage addresses well
		label = ctx.IDENTIFIER().symbol.text.lower()
		assert label not in my.labels
		raw_address = ctx.address().HEX_BIGEND().symbol.text.upper()
		address = my.decode_value( raw_address )
		my.assert_address_valid( address )
		# WIP TODO if address is like $00FF, should remove the leading zero and make it zeropage? 
		my.labels[ label] = my.serialize( raw_address+"L")

# DATA
	# write arbitrary data to the output
	def enterData_stmt(my, ctx:fassParser.Data_stmtContext): # WIP TODO FIX
		output = bytearray()
		for token in ctx.children[1:]:
			if isinstance( token, fassParser.ValueContext ):
				output += my.serialize(
					token.children[0].symbol.text)
		my.append_output( output)

# FILLER
	def enterFiller_stmt(my, ctx:fassParser.Filler_stmtContext): # WIP TODO arreglar
		filler = ctx.children[1]
		if isinstance(filler, fassParser.ValueContext):
			filler = ctx.children[1].children[0].symbol.text
			my.assert_value_8bits( my.decode_value( filler), "Filler")
			filler = my.serialize( filler)
			my.filler = filler
		else: # is default
			my.filler = my.opcodes[my.NOP]
		
# GOTO
	def exitGoto_stmt(my, ctx:fassParser.Goto_stmtContext):
		try:
			label = ctx.IDENTIFIER().symbol.text.lower()
			addressing = my.ABS
		except AttributeError:
			label = ctx.ref_indirect().IDENTIFIER().symbol.text.lower()
			addressing = my.IND
		opcode = my.opcodes[ my.JMP][ addressing]
		address = my.resolve_label( label, absolute= True)[0]
		my.append_output( opcode + address)

# NOP
	def enterNop_stmt(my, ctx:fassParser.Nop_stmtContext): # WIP TODO Fix with children methods like NOP() and EAFP
		op = ctx.children[0].symbol
		output = bytearray()
		if op.type == lxr.NOP:
			output += my.opcodes[my.NOP]
		else:
			if op.type == lxr.NOP3:
				output += my.opcodes[my.NOP3]
			elif op.type == lxr.NOP4:
				output += my.opcodes[my.NOP4]
			else:
				raise Exception(f"Unrecognized NOP `{op.text}`")
			# it's either NOP3 or NOP4 so it needs a byte argument
			if len(ctx.children) > 1:
				argument = ctx.children[1].children[0].symbol.text
				my.assert_value_8bits( 
					my.decode_value( argument), "%s argument"%op.text )
				argument = my.serialize( argument)
			else:
				argument = my.opcodes[my.NOP] # default argument will be NOP, just in case
			output += argument
		my.append_output( output )

# BRK	
	def enterBrk_stmt(my, ctx:fassParser.Brk_stmtContext): # WIP TODO Fix with children methods like value() and EAFP
		""" if no argument follows BRK, output will have only BRK, so a normal interrupt process would skip next byte, be careful. """
		output = bytearray(my.opcodes[my.BRK])
		if len(ctx.children) > 1:
			argument = ctx.children[1].children[0].symbol.text
			my.assert_value_8bits( 
				my.decode_value( argument), "BRK argument")
			output += my.serialize( argument)
		my.append_output( output)

# CONST
	def enterConst_stmt(my, ctx:fassParser.Const_stmtContext):
		const = ctx.IDENTIFIER().symbol.text.lower()
		assert const not in my.consts, f"Constant `{const}` was already declared"
		try:
			literal = ctx.value().literal().children[0].symbol.text
		except AttributeError: # right hand side is another constant
			rhs_const = ctx.value().IDENTIFIER().symbol.text.lower()
			try:
				my.consts[ const] = my.consts[ rhs_const]
			except KeyError:
				raise Exception( f"Const `{rhs_const}` must be declared before being assigned to const `{const}`")
		else: # right hand side is a literal value
			literal = my.serialize( literal)
			assert len(literal) == 1, f"Value for constant `{const}` should be an 8 bit value, 0..$FF (-128..255)"
			my.consts[ const] = literal

# ------------------------------------------------------------------------------------------------------------ Assignments

	def enterReference(my, ctx:fassParser.ReferenceContext):
		""" All references will have exactly one identifier, the label """
		label = ctx.children[0].IDENTIFIER().symbol.text.lower()
		register = ctx.children[0].REGISTER().symbol.text.upper()
		if register == "A":
			raise Exception("The A register can't be used for indexing, use X or Y.")
		address, zeropage = my.resolve_label( label)
		my.cur_ref.append( obj({
			'label': label,
			'address': address,
			'register': register,
			'zeropage': zeropage,
			'addressing': None }))

	def enterRef_indexed(my, ctx:fassParser.Ref_indexedContext):
		ref = my.cur_ref[-1]
		if ref.zeropage:
			if ref.register == 'X':
				ref.addressing = my.ZPX
			else:
				ref.addressing = my.ZPY
		else:
			if ref.register == 'X':
				ref.addressing = my.ABSX
			else:
				ref.addressing = my.ABSY

	def enterRef_indirect_x(my, ctx:fassParser.Ref_indirect_xContext):
		my.cur_ref[-1].addressing = my.INDX

	def enterRef_indirect_y(my, ctx:fassParser.Ref_indirect_yContext):
		my.cur_ref[-1].addressing = my.INDY

	def enterStatement(my, ctx:fassParser.StatementContext):
		my.cur_ref = []

	def exitStatement(my, ctx:fassParser.StatementContext):
		my.cur_ref = None
	
	def enterAssign_reg_lit(my, ctx:fassParser.Assign_reg_litContext):
		''' A = $FF -> LDA $FF '''
		literal = ctx.literal().children[0].symbol.text
		my.assert_value_8bits( my.decode_value( literal))
		operand = my.serialize( literal)
		register = my.get_register(ctx)
		mnemonic = my.get_mnemonic( 'LD', register )
		my.append_operation( mnemonic, my.IMM, operand )

	def exitAssign_reg_id(my, ctx:fassParser.Assign_reg_idContext):
		''' A = label ; A = constant. -> LDA label ; LDA {immediate} '''
		identifier = ctx.IDENTIFIER().symbol.text.lower()
		register = my.get_register(ctx)
		mnemonic = my.get_mnemonic( 'LD', register )
		if identifier in my.consts:
			addressing = my.IMM
			operand = my.consts[identifier]
		else:
			operand, zeropage = my.resolve_label( identifier )
			addressing = my.ZP if zeropage else my.ABS
		my.append_operation( mnemonic, addressing, operand )
	
	def enterAssign_id_reg(my, ctx:fassParser.Assign_id_regContext):
		''' label = A -> STA, STX, STY '''
		identifier = my.get_identifier(ctx)
		if identifier in my.consts:
			raise Exception(f"Cant assign a value to a constant ({identifier})")
		register = my.get_register(ctx)
		mnemonic = my.get_mnemonic( 'ST', register )
		address, zeropage = my.resolve_label( identifier )
		addressing = my.ZP if zeropage else my.ABS 
		my.append_operation( mnemonic, addressing, address )

	def exitAssign_reg_ref(my, ctx:fassParser.Assign_reg_refContext):
		''' A = reference -> LDA ref ; with reference being any indexed addressing '''
		register = my.get_register(ctx)
		mnemonic = my.get_mnemonic( 'LD', register )
		ref = my.cur_ref[0] # this statement has only one reference, so directly use index [0]
		my.append_operation( mnemonic, ref.addressing, ref.address )
	
	### WIP TODO These two functions ↑ ↓ are exactly the same except for the mnemonic, should factor out. ###

	def exitAssign_ref_reg(my, ctx:fassParser.Assign_ref_regContext):
		''' label[X] = A -> STA, STX, STY '''
		register = my.get_register(ctx)
		mnemonic = my.get_mnemonic( 'ST', register )
		ref = my.cur_ref[0] # this statement has only one reference, so directly use index [0]
		my.append_operation( mnemonic, ref.addressing, ref.address )


	def exitProgram(my, ctx:fassParser.ProgramContext):
		pass