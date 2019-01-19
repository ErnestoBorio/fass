
import re
from fassLexer import fassLexer
from fassParser import fassParser
from fassListener import fassListener

class fassCompiler(fassListener) :
	address = 0
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
	
	opcodes = {
		LDA: { IMM: 0xA9, ZP: 0xA5, ZPX: 0xB5, ABS: 0xAD, ABSX: 0xBD, ABSY: 0xB9, INDX: 0xA1, INDY: 0xB1 },
		LDX: { IMM: 0xA2, ZP: 0xA6, ZPY: 0xB6, ABS: 0xAE, ABSY: 0xBE },
		LDY: { IMM: 0xA0, ZP: 0xA4, ZPX: 0xB4, ABS: 0xAC, ABSX: 0xBC },
		STA: { ABS: 0x8D }
	}

	# ensure address is between valid 6502 bounds
	def assert_address_valid( self, address ):
		self.assert_value_16bits( address, "MOS 6502 has 64KB of memory, address must be between 0 and $FFFF" )

	def assert_value_16bits( self, value, message = "Value `{value}` should be between 0 and $FFFF" ):
		assert ( 0 <= value <= 0xFFFF ), message
	
	def assert_value_8bits( self, value, message = "Value `{value}` should be between 0 and $FF" ):
		assert ( 0 <= value <= 0xFF ), message

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
			if len(value)%2 == 1: # give value even number of hex digits
				value = "0"+ value 
			for i in range( 0, len(value),2 ):
				byte = int( value[i:i+2], 16)
				if little_endian:
					output.insert(0, byte)
				else:
					output.append(byte)
		return output

# Grammar rules listeners:
	
	# write arbitrary data to the output
	def enterData_stmt(self, ctx:fassParser.Data_stmtContext):
		for token in ctx.children:
			if isinstance( token, fassParser.ValueContext ):
				value = token.children[0].symbol.text
				self.output += self.serialize( value )

	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		""" set current address for producing next output byte """
		address = ctx.children[1].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		self.address = address # set current address
	
	def enterRemote_label_stmt(self, ctx:fassParser.Remote_label_stmtContext):
		""" Define a label remotely, that is, not in the current address. Example: C64.border_color at $D020 """
		label = ctx.children[0].symbol.text
		address = ctx.children[2].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		# WIP assert label hasn't been defined before
		self.labels[ label ] = { "address": address }

	def enterAssign_reg_val(self, ctx:fassParser.Assign_reg_valContext):
		""" Assign register = value. asm example: LDA #5 """
		register = ctx.children[0].symbol.text
		value = self.decode_value( ctx.children[2].children[0].symbol.text )
		self.assert_value_8bits( value )
		mnemonic = self.get_mnemonic( "LD", register )
		addressing = self.IMM
		opcode = self.opcodes[mnemonic][addressing]
		self.output += ( bytearray([opcode, value]))
		self.address += 2

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

	def exitProgram(self, ctx:fassParser.ProgramContext):
		debug = "stop here for final debug"
		pass
