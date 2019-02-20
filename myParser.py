
import sys
from antlr4 import *
from math import ceil
from io import StringIO
from typing.io import TextIO
from fassParser import fassParser

class fassException( Exception) :
	pass

class myParser( fassParser ):
	default_filler = b"\xEA" # default filler for address gaps ($EA = NOP)

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

	def __init__( self, input: TokenStream, output: TextIO = sys.stdout ):
		super().__init__(input, output)
		self.address = None # current address where next byte will be output
		self.filler = self.__class__.default_filler # filler for address gaps
		self.output = bytearray() # 6502 machine code bytes
		self.constants = {} # dict<str: bytes> of defined constants
		self.labels = {} # dict<str: bytes> of defined labels

# --> Utility functions	
	def append_output( self, output: bytes ):
		''' Append bytes to the program output '''
		if self.address is None:
			raise fassException("Output started without setting an address first.")
		self.output += output
		self.address += len( output )
	
	def get_output(self) -> bytearray:
		return self.output
	
	def check_negative(self, negative: int ) -> bool:
		if not( -128 <= negative <= -1 ):
			raise fassException(f"Negative value `{negative}` out of range [-128..-1]")
		return negative
	
	def serialize(self, value, endian: str = 'big', signed: bool = False ) -> bytes:
		try: # int?
			return value.to_bytes( ceil( value.bit_length()/8 ), byteorder= endian, signed= signed)
		except AttributeError: # string
			return bytes( bytes(value, 'ascii').decode('unicode_escape'), 'ascii')
			# Serialized string with \" and \\ unescaped

	def get_constant(self, name: str ) -> bytes:
		try:
			return self.constants[ name]
		except KeyError:
			raise fassException(f"Constant `{name}` is not defined.")
	
	def check_length(self, data: bytes, length: int ) -> bytes:
		if len(data) != length:
			data = data.decode('ascii')
			raise fassException(f"A {length} byte%s value expected, `{data}` given." % ('s' if length > 1 else '' ))
		return data
# Utility functions <--

# --> Statements
	def set_address( self, new_address: str ):
		''' set current address for producing next output byte '''
		new_address = int( "0x"+ new_address[1:], 16 ) # Strip leading $ and convert hex->int
		if new_address > 0xFFFF:
			raise fassException("Address should be between 0 and $FFFF.")
		
		if self.address is not None:
			if new_address < self.address: # new address can't overlap current address
				hex_cur_address = hex( self.address )[2:].upper()
				hex_new_address = hex( new_address  )[2:].upper()
				raise fassException(f"Address ${hex_new_address} should be greater or equal to current address ${hex_cur_address}.")
			elif new_address > self.address: # got to fill the gap
				gap = new_address - self.address
				self.append_output( self.filler * gap )
			
		self.address = new_address

	def set_filler( self, filler: bytes ):		
		''' Change the current filler for address gaps '''
		if len(filler) > 1:
			filler = filler.decode('ascii') # WIP TODO this will print string values for ints, not great
			raise fassException(f"The filler value must be a single byte, `{filler}` given.")
		self.filler = filler

	def declare_constant(self, name: str, value: bytes ):
		if name in self.constants:
			raise fassException(f"Constant `{name}` already declared.")
		self.constants[ name] = value

	# WIP TODO If data() should do any additional checking, review data_stmt grammar rule's first sub-rule which calls append_output() directly
	def data(self, datas: list ):
		output = bytearray()
		for value in datas:
			output += value.ret
		self.append_output( output)
	
	def set_label(self, label: str, address: int = None ):
		if label in self.labels:
			raise fassException(f"Label `{label}` already declared.")
		if address is None:
			address = self.address
		elif not 0 <= address <= 0xFFFF:
			raise fassException(f"Address {address} is outside the 64KB range 0..$FFFF")
		self.labels[label] = self.serialize( address, 'little' )

# Statements <--