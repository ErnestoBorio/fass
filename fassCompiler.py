
import re
from fassParser import fassParser
from fassLexer import fassLexer as lxr
from fassListener import fassListener
from antlr4.tree.Tree import TerminalNodeImpl
from antlr4.ParserRuleContext import ParserRuleContext
prs = fassParser

class fassCompiler(fassListener) :
	address = None
	offset = 0 # output byte count
	filler = None
	address_2B_defined = b"\x2B\xDF" # to be defined, forward or undefined reference
	pending_references = [] # forward or undefined references
	labels = {}
	consts = {}
	output = bytearray()

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
		LDA: { IMM:b"\xA9", ZP:b"\xA5", ZPX:b"\xB5", ABS:b"\xAD", ABSX:b"\xBD", 
			ABSY:b"\xB9", INDX:b"\xA1", INDY:b"\xB1" },
		LDX: { IMM:b"\xA2", ZP:b"\xA6", ZPY:b"\xB6", ABS:b"\xAE", ABSY:b"\xBE" },
		LDY: { IMM:b"\xA0", ZP:b"\xA4", ZPX:b"\xB4", ABS:b"\xAC", ABSX:b"\xBC" },
		STA: { ABS:b"\x8D" },
		JMP: { ABS:b"\x4C", IND:b"\x6C" },
		NOP:  b"\xEA",
		NOP3: b"\x04",
		NOP4: b"\x14",
		BRK:  b"\x00"
	}

	def __init__(self):
		self.filler = self.opcodes[self.NOP]

	# ensure address is between valid 6502 bounds
	def assert_address_valid( self, address ):
		self.assert_value_16bits( address, "The 6502 has 64KB of memory, address" )

	def assert_value_8bits( self, value, element ):
		assert -128 <= value <= 0xFF, f"{element} should be 8 bits long, between -128 and 255($FF)"
	
	def assert_value_16bits( self, value, element ):
		assert 0 <= value <= 0xFFFF, f"{element} should be 16 bits long, between 0 and $FFFF"

	def get_mnemonic( self, operation, register ):
		return operation.upper() + register.upper()

	def is_zeropage( self, address ):
		return address < 0x100
	
	def get_output( self ):
		return self.output

	
	# decode value string as read by the parser into a typed value. Don't pass values with L suffix
	def decode_value( self, value ):
		match = re.match( r"\$(.+)", value )
		if match: # hex
			return int( match[1], 16 )
		else:
			match = re.match( r"([0-9]+)", value )
			if match: # decimal
				return int( match[1] )
			else:
				match = re.match( r"%(.+)", value )
				if match: #binary
					return int( match[1], 2 )
				else:
					raise Exception(f"Value expression `{value}` can't be decoded yet")

	def serialize( self, data ):
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

	def append_output(self, output: bytearray):
		assert self.address is not None, "Output started without setting an address"
		self.output += output
		self.address += len( output )
		self.offset += len( output )
	
	def is_name_unique(self, name):
		name = name.lower()
		return not( name in self.consts or name in self.labels )

	def add_pending_reference(self, name: str):
		""" When an unknown label is referenced, just store $2BDF as the operation's address and keep
		record of where it was for when the label is found and the correct address can be overwritten """
		self.pending_references.append({
			"name": name, 
			"offset": self.offset+1 }) # skip the opcode and keep the offset for the address to be corrected
		""" WIP TODO quizas guardar también la referencia de línea del source por si no se encuentra el label """
	
	def find_node(self,  ctx: ParserRuleContext, token_type: int = None, context_type: type = None):
		""" Find a node of the specified type within given context, regardless of tree structure and depth.
			Either a token or context type should be given, to search for. If both are given, whichever is
			found first will be returned """
		def traverse_tree( item ):
			# found the node yet?
			try:
				if context_type is type(item):				
					return item # if it's a context, return it as is
				elif item.symbol.type == token_type:
					return item.symbol.text # if it's a terminal, return its text
				# else it's not the item we're searching for, keep searching
			except AttributeError:
				pass # item.symbol.* failed, not a TerminalNode, keep going
			
			# haven't found it yet, keep searching:
			if hasattr( item, "children" ): # No EAFP way is suitable here
				for child in item.children:
					ret = traverse_tree( child )
					if ret is not None:
						return ret
			return None
		return traverse_tree( ctx )
	""" WIP TODO this could be optimized by searching for a set of item types, instead of just one at a time.
		collect the first of each type found and return them when the list is complete """

### Grammar rules listeners: ###
# ADDRESS
	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		""" set current address for producing next output byte """
		address = ctx.children[1].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		assert (self.address is None) or (address >= self.address), f"Address {address} would overlap current address {self.address}"
		if self.address is not None and address > self.address : # have to fill output with filler byte
			gap = address - self.address
			self.output += self.filler * gap # fill the gap with the filler byte
		self.address = address

# LABEL
	def enterLabel(self, ctx:fassParser.LabelContext):
		assert self.address is not None, "Can't declare a label before an address has been set"
		label = ctx.children[0].symbol.text.lower()
		assert label not in self.labels
		self.labels[ label ] = { "address": self.address }

# REMOTE LABEL
	def enterRemote_label_stmt(self, ctx:fassParser.Remote_label_stmtContext):
		""" Define a label remotely, that is, not in the current address. Example: C64.border_color at $D020
		    Doesn't produce output """
		label = ctx.children[0].symbol.text.lower()
		assert label not in self.labels
		address = ctx.children[2].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		self.labels[ label ] = { "address": address }

# DATA
	# write arbitrary data to the output
	def enterData_stmt(self, ctx:fassParser.Data_stmtContext):
		output = bytearray()
		for token in ctx.children[1:]:
			if isinstance( token, fassParser.ValueContext ):
				output += self.serialize(
					token.children[0].symbol.text)
		self.append_output( output)
# FILLER
	def enterFiller_stmt(self, ctx:fassParser.Filler_stmtContext):
		filler = ctx.children[1]
		if isinstance(filler, fassParser.ValueContext):
			filler = ctx.children[1].children[0].symbol.text
			self.assert_value_8bits( self.decode_value( filler), "Filler")
			filler = self.serialize( filler)
			self.filler = filler
		else: # is default
			self.filler = self.opcodes[self.NOP]
		
# GOTO
	def enterGoto_stmt(self, ctx:fassParser.Goto_stmtContext):
		indirect = self.find_node( ctx, context_type = prs.Ref_indirectContext)
		label = self.find_node( ctx, token_type = lxr.IDENTIFIER).lower()

		if indirect: # indirect addressing
			opcode = self.opcodes[self.JMP][self.IND]
		else: # direct addressing
			opcode = self.opcodes[self.JMP][self.ABS]

		# WIP TODO factor out the checking of forward references for reuse, resolve_reference()
		if label in self.labels:
			address = self.labels[label]['address']
			address = str(address) + "L" # make it little endian
			address = self.serialize( address)
		else:
			address = self.address_2B_defined
			self.add_pending_reference( label)
		
		self.append_output( opcode + address)

# NOP
	def enterNop_stmt(self, ctx:fassParser.Nop_stmtContext):
		op = ctx.children[0].symbol
		output = bytearray()
		if op.type == lxr.NOP:
			output += self.opcodes[self.NOP]
		else:
			if op.type == lxr.NOP3:
				output += self.opcodes[self.NOP3]
			elif op.type == lxr.NOP4:
				output += self.opcodes[self.NOP4]
			else:
				raise Exception(f"Unrecognized NOP `{op.text}`")
			# it's either NOP3 or NOP4 so it needs a byte argument
			if len(ctx.children) > 1:
				argument = ctx.children[1].children[0].symbol.text
				self.assert_value_8bits( 
					self.decode_value( argument), "%s argument"%op.text )
				argument = self.serialize( argument)
			else:
				argument = self.opcodes[self.NOP] # default argument will be NOP, just in case
			output += argument
		self.append_output( output )
# BRK	
	def enterBrk_stmt(self, ctx:fassParser.Brk_stmtContext):
		""" if no argument follows BRK, output will have only BRK, so a normal interrupt process would skip next byte, be careful. """
		output = bytearray(self.opcodes[self.BRK])
		if len(ctx.children) > 1:
			argument = ctx.children[1].children[0].symbol.text
			self.assert_value_8bits( 
				self.decode_value( argument), "BRK argument")
			output += self.serialize( argument)
		self.append_output( output)
# CONST
	def enterConst_stmt(self, ctx:fassParser.Const_stmtContext): # WIP TODO arreglar
		const = ctx.children[1].symbol.text.lower()
		assert self.is_name_unique( const), f"Name `{const}` was previously declared, can't redeclare"
		value = ctx.children[3].children[0]
		raw_value = value.children[0].symbol.text
		if isinstance( value, prs.LiteralContext ):
			value = self.decode_value( raw_value)
			self.assert_value_8bits( value, "Constants value") # For now constants will only be 1 byte wide
			value = self.serialize( raw_value) # WIP TODO should we store the value or serialized?
			self.consts[ const ] = value
		elif isinstance( value, prs.ConstantContext ):
			rhs_const = raw_value.lower()
			assert rhs_const in self.consts, f"Const `{rhs_const}` must be declared before being assigned to const `{const}`" # WIP TODO add forward const reference?
			self.consts[ const] = self.consts[ rhs_const]
		stop_debug = 1


## ASSIGNMENTS

# REGISTER = LITERAL
	def enterAssign_reg_lit(self, ctx:fassParser.Assign_reg_litContext): # WIP TODO arreglar
		""" Assign register = value. asm example: LDA #5 """
		register = ctx.children[0].symbol.text
		raw_value = ctx.children[2].children[0].symbol.text
		value = self.decode_value( raw_value)
		self.assert_value_8bits( value, f"Immediate value `{raw_value}`" )
		mnemonic = self.get_mnemonic( "LD", register )
		addressing = self.IMM
		output = self.opcodes[mnemonic][addressing] + self.serialize( raw_value)
		self.append_output( output)

# REG = DIRECT REF or REG = CONSTANT
	def enterAssign_reg_dir_const(self, ctx:fassParser.Assign_reg_dir_constContext):
		""" Both a direct addressing reference and a constant name are identifiers so the parser can't tell them apart """

# REF = REG
	def enterAssign_ref_reg(self, ctx:fassParser.Assign_ref_regContext): # WIP TODO arreglar
		reference = ctx.children[0].children[0].symbol.text
		""" Assign a memory reference = register. asm: STA $D020 """
		register = ctx.children[2].symbol.text
		
		if reference in self.labels: # WIP this only accounts for direct addressings
			label = reference
			address = self.labels[ label ]["address"]
			mnemonic = self.get_mnemonic( "ST", register )
			addressing = ( self.ZP if self.is_zeropage(address) else self.ABS )
			opcode = self.opcodes[mnemonic][addressing]
			address = str(address) + "L" # make it little endian
			address = self.serialize( address)
			self.append_output( opcode + address )
		else:
			raise Exception( f"Reference `{reference}` is either a yet unimplemented "+
				"addressing mode, or a forward reference or an undefined label" )

	def exitProgram(self, ctx:fassParser.ProgramContext):
		debug = "stop here for final debug"
		pass
