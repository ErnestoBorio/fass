
import re
from fassLexer import fassLexer as lxr
from fassParser import fassParser
from fassListener import fassListener

class fassCompiler(fassListener) :
	address = -1
	labels = {}
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
		NOP3: b"\x04", # Not really implied, but illegal opcodes, who cares the addressing anyway?
		NOP4: b"\x14", # idem ^
		BRK:  b"\x00"
	}

	# ensure address is between valid 6502 bounds
	def assert_address_valid( self, address ):
		self.assert_value_16bits( address, "MOS 6502 has 64KB of memory, address must be between 0 and $FFFF" )

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
		assert self.address > -1, "Output started without setting an address"
		self.output += output
		self.address += len( output )

# Grammar rules listeners:
	
	def enterLabel(self, ctx:fassParser.LabelContext):
		assert ctx.children[0].symbol.type == fassParser.IDENTIFIER
		label = ctx.children[0].symbol.text
		# WIP assert label hasn't been defined before
		self.labels[ label ] = { "address": self.address }

	# write arbitrary data to the output
	def enterData_stmt(self, ctx:fassParser.Data_stmtContext):
		for token in ctx.children[1:]:
			if isinstance( token, fassParser.ValueContext ):
				value = token.children[0].symbol.text
				data_bytes = self.serialize( value )
				self.output += data_bytes
				self.address += len(data_bytes)

	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		""" set current address for producing next output byte """
		address = ctx.children[1].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		self.address = address # set current address
	
	def enterRemote_label_stmt(self, ctx:fassParser.Remote_label_stmtContext):
		""" Define a label remotely, that is, not in the current address. Example: C64.border_color at $D020
		    Doesn't produce output """
		label = ctx.children[0].symbol.text
		assert label not in self.labels
		address = ctx.children[2].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		self.labels[ label ] = { "address": address }

	def enterAssign_reg_val(self, ctx:fassParser.Assign_reg_valContext):
		""" Assign register = value. asm example: LDA #5 """
		register = ctx.children[0].symbol.text
		raw_value = ctx.children[2].children[0].symbol.text
		value = self.decode_value( raw_value)
		self.assert_value_8bits( value, f"Immediate value `{raw_value}`" )
		mnemonic = self.get_mnemonic( "LD", register )
		addressing = self.IMM
		output = bytearray( self.opcodes[mnemonic][addressing])
		output += self.serialize( value)
		self.append_output( output)

	def enterAssign_ref_reg(self, ctx:fassParser.Assign_ref_regContext):
		""" Assign a memory reference = register. asm example: STA $D020 """
		reference = ctx.children[0].children[0].symbol.text
		register = ctx.children[2].symbol.text
		
		if reference in self.labels: # WIP this only accounts for direct addressings
			label = reference
			address = self.labels[ label ]["address"]
			mnemonic = self.get_mnemonic( "ST", register )
			
			if self.is_zeropage(address):
				addressing = self.ZP
			else:
				addressing = self.ABS
				self.address += 1 # Absolute addressing takes one additional byte

			opcode = self.opcodes[mnemonic][addressing]
			self.output.append( opcode )
			self.output.append(address & 0xFF) # output address LSB
			self.output.append((address & 0xFF00) >>8) # output address MSB
			self.address += 2

	def enterGoto_stmt(self, ctx:fassParser.Goto_stmtContext):
		label = ctx.children[1].symbol.text
		assert label in self.labels # it's possibly a forward reference or an undefined label
		self.output.append( self.opcodes[self.JMP][self.ABS] ) # output the opcode
		address = str( self.labels[label]["address"]) + "L"
		self.output += self.serialize( address )
		self.address += 3

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
	
	def enterBrk_stmt(self, ctx:fassParser.Brk_stmtContext):
		output = bytearray(self.opcodes[self.BRK])
		if len(ctx.children) > 1:
			argument = ctx.children[1].children[0].symbol.text
			self.assert_value_8bits( 
				self.decode_value( argument), "BRK argument")
			argument = self.serialize( argument)
		else:
			argument = self.opcodes[self.NOP] # default argument will be NOP, just in case
		output += argument
		self.append_output( output )

	def exitProgram(self, ctx:fassParser.ProgramContext):
		debug = "stop here for final debug"
		pass
