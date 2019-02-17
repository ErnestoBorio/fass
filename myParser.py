
import sys
from antlr4 import *
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

# --> Utility functions	
	def append_output( self, output: bytes ):
		''' Append bytes to the program output '''
		if self.address is None:
			raise fassException("Output started without setting an address first.")
		self.output += output
		self.address += len( output )
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

	def set_filler( self, filler ):		
		''' Change the current filler for address gaps '''
		try: # int value?
			if filler > 0xFF:
				raise fassException(f"The filler value must be a byte (0..$FF), {filler} given.")
		except TypeError: # str value
			if len(filler) > 1:
				raise fassException(f"The filler value must be a single byte, `{filler}` given.")
			self.filler = bytes( filler, 'ISO-8859-1')#[0:1] # cap to one byte, just in case.
				# WIP TODO Maybe factor this ↑ out for reuse
		else: # int value
			self.filler = bytes([filler])
# Statements <--