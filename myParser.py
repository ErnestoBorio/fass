
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

	def __init__( self, input: TokenStream, output: TextIO = sys.stdout ):
		super().__init__(input, output)
		self.address = None # current address where next byte will be output
		self.filler = self.__class__.default_filler # filler for address gaps
		self.output = bytearray() # 6502 machine code bytes
		self.constants = {} # dict<str: bytes> of defined constants

# --> Utility functions	
	def append_output( self, output: bytes ):
		''' Append bytes to the program output '''
		if self.address is None:
			raise fassException("Output started without setting an address first.")
		self.output += output
		self.address += len( output )
	
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

	def get_constant(self, name: str, length: int = None) -> bytes:
		try:
			if length is None or len(self.constants[ name]) == length:
				return self.constants[ name]
			else:
				raise fassException(f"%i byte%s value expected, but constant `{name}` is %i byte%s long ({self.constants[name]})" \
					% ( length, 's' if length > 1 else '', len(self.constants[ name]), 's' if len(self.constants[ name]) > 1 else '' ))
		except KeyError:
			raise fassException(f"Constant `{name}` is not defined.")
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

# Statements <--