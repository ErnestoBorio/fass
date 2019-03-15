
class fassException( Exception) :
	pass

class Fass():
	default_filler = b'\xEA' # default filler for address gaps ($EA = NOP)
	
	def __init__(self):
		self.address = None # The 'program counter' or current address
		self.filler = self.default_filler
		self.output = bytearray()
		self.labels = {}
		self.constants = {}

	def get_output(self) -> bytearray:
		return self.output
	
	def check_name(self, name: str) -> bool:
		''' Checks that a name hasn't been already defined '''
		if name in self.constants or name in self.labels:
			return False
		return True

	def append_output( self, output: bytes ):
		''' Append bytes to the program output '''
		if self.address is None:
			raise fassException("Output started without setting an address first.")
		self.output += output
		self.address += len(output)

	def set_address(self, new_address: int):
		''' set current address for producing next output byte '''
		if new_address > 0xFFFF:
			raise fassException( f"Address should be between 0 and $FFFF, `{new_address}` given.")
		
		if self.address is not None:
			if new_address < self.address: # new address can't overlap current address
				hex_cur_address = hex(self.address)[2:].upper()
				hex_new_address = hex(new_address)[2:].upper()
				raise fassException(f"Address ${hex_new_address} should be greater or equal to current address ${hex_cur_address}.")
			elif new_address > self.address: # got to fill the gap
				gap = new_address - self.address
				self.append_output(self.filler * gap)
		
		self.address = new_address

	
	def set_label(self, label: str, address: int ):
		''' Declare a label, whether it points to the current or a remote address '''
		if not self.check_name(label):
			raise fassException(f"Name `{label}` already declared.")
		if address is None:
			address = self.address
		elif address > 0xFFFF:
			raise fassException(f"Address {address} is outside the 64KB range 0..$FFFF")
		self.labels[label] = address
	
	def set_filler(self, filler):
		if filler is None:
			filler = self.default_filler
		try: # is it a scalar value?
			filler = bytes([filler])
		except TypeError: # no, it's a string
			if len(filler) != 1:
				raise fassException(f"The filler value must be a single byte, `{filler}` given.") from None
			filler = bytes(filler, 'ascii')
		self.filler = filler