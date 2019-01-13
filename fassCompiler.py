
import re
from fassLexer import fassLexer
from fassParser import fassParser
from fassListener import fassListener

class fassCompiler(fassListener) :
	address = 0
	labels = {}
	output = bytearray()

	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		address = ctx.children[1].children[0].symbol
		if( address.type == fassLexer.HEX_BIGEND ):
			self.address = address.text
		pass
	
	def getOpcode( operation: str, addressing: int, argument: int ):
		# use self.opcodes to return the corresponding machine code bytes
		pass
		

	# enum addressing modes:
	IMP= 0; IMM= 1; ZP= 2; ZPX= 3; ZPY= 4; ABS= 5; ABSX= 6; ABSY= 7; IND= 8; INDX= 9; INDY= 10
	# addressing mode names:
	addressings = [ "implied", "immediate", "zero page", "zero page x-indexed", "zero page y-indexed", "absolute", 
		"absolute x-indexed", "absolute y-indexed", "indirect", "x-indexed indirect", "indirect y-indexed" ]
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
		LDY: { IMM: 0xA0, ZP: 0xA4, ZPX: 0xB4, ABS: 0xAC, ABSX: 0xBC }
	}

	# decode value string as read by the parser into a typed value
	def decode_value( self, value ):
		match = re.match( r"\$([0-9a-fA-F]+)", value )
		if match: # hex
			return int( match[1], 16 )
		else:
			match = re.match( r"[0-9]+", value )
			if match: # decimal
				return int( match[0] )
			else:
				raise Exception(f"Value expression `{value}` can't be decoded yet")
	
	# assure address is between valid 6502 bounds
	def assert_address_valid( self, address ):
		self.assert_value_16bits( address, "MOS 6502 has 64KB of memory, address must be between 0 and $FFFF" )

	def assert_value_16bits( self, value, message = "Value `{value}` should be between 0 and $FFFF" ):
		assert ( 0 <= value <= 0xFFFF ), message
	
	# write arbitrary data to the output
	def enterData_stmt(self, ctx:fassParser.Data_stmtContext):
		value = ctx.children[1].children[0].symbol.text # WIP It's only parsing one value for now
		value = self.decode_value(value)
		self.assert_value_16bits(value)
		output = bytes([ (value & 0xFF00)>>8, value & 0xFF ])
		self.output += output

	# set current address for producing next output byte
	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		address = ctx.children[1].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		self.address = address # set current address
	
	# define a label remotely, that is, not in the current address. Example: C64.border_color at $D020
	def enterRemote_label_stmt(self, ctx:fassParser.Remote_label_stmtContext):
		label = ctx.children[0].symbol.text
		address = ctx.children[2].children[0].symbol.text
		address = self.decode_value( address )
		self.assert_address_valid( address )
		# WIP assert label hasn't been defined before
		self.labels[ label ] = { "address": address }
	
	def exitProgram(self, ctx:fassParser.ProgramContext):
		pass
		

if __name__ == '__main__':
	#test = fassCompiler()
	pass
