
from math import ceil

class FassException( Exception) :
	pass

class Fass():

	# enum addressing modes:
	ACC = 'ACC'; IMM = 'IMM'; ZP = 'ZP'; ZPX = 'ZPX'; ZPY = 'ZPY'
	ABS = 'ABS'; ABSX = 'ABSX'; ABSY = 'ABSY'; IND = 'IND'; INDX = 'INDX'; INDY = 'INDY'

	# addressing mode names:
	addressings = { ACC:'accumulator', IMM:'immediate', ZP:'zero page',
		ZPX:'zero page x-indexed', ZPY:'zero page y-indexed', ABS:'absolute', ABSX:'absolute x-indexed', 
		ABSY:'absolute y-indexed', IND:'indirect', INDX:'x-indexed indirect', INDY:'indirect y-indexed' }
	
	# enum operations:
	ADC = 'ADC'; AND = 'AND'; ASL = 'ASL'; BCC = 'BCC'; BCS = 'BCS'; BEQ = 'BEQ'; BIT = 'BIT'; BMI = 'BMI'
	BNE = 'BNE'; BPL = 'BPL'; BRK = 'BRK'; BVC = 'BVC'; BVS = 'BVS'; CLC = 'CLC'; CLD = 'CLD'; CLI = 'CLI'
	CLV = 'CLV'; CMP = 'CMP'; CPX = 'CPX'; CPY = 'CPY'; DEC = 'DEC'; DEX = 'DEX'; DEY = 'DEY'; EOR = 'EOR'
	INC = 'INC'; INX = 'INX'; INY = 'INY'; JMP = 'JMP'; JSR = 'JSR'; LDA = 'LDA'; LDX = 'LDX'; LDY = 'LDY'
	LSR = 'LSR'; NOP = 'NOP'; ORA = 'ORA'; PHA = 'PHA'; PHP = 'PHP'; PLA = 'PLA'; PLP = 'PLP'; ROL = 'ROL'
	ROR = 'ROR'; RTI = 'RTI'; RTS = 'RTS'; SBC = 'SBC'; SEC = 'SEC'; SED = 'SED'; SEI = 'SEI'; STA = 'STA'
	STX = 'STX'; STY = 'STY'; TAX = 'TAX'; TAY = 'TAY'; TSX = 'TSX'; TXA = 'TXA'; TXS = 'TXS'; TYA = 'TYA'
	NOP3 = 'NOP3'; NOP4 = 'NOP4' # undocumented operations
	
	opcodes = {
		LDA: { IMM:b'\xA9', ZP:b'\xA5', ZPX:b'\xB5', ABS:b'\xAD', ABSX:b'\xBD', ABSY:b'\xB9', INDX:b'\xA1', INDY:b'\xB1' },
		LDX: { IMM:b'\xA2', ZP:b'\xA6', ZPY:b'\xB6', ABS:b'\xAE', ABSY:b'\xBE' },
		LDY: { IMM:b'\xA0', ZP:b'\xA4', ZPX:b'\xB4', ABS:b'\xAC', ABSX:b'\xBC' },
		STA: { ZP:b'\x85', ZPX:b'\x95', ABS:b'\x8D', ABSX:b'\x9D', ABSY:b'\x99', INDX:b'\x81', INDY:b'\x91' },
		STX: { ZP:b'\x86', ZPY:b'\x96', ABS:b'\x8E' },
		STY: { ZP:b'\x84', ZPX:b'\x94', ABS:b'\x8C' },
		ADC: { IMM:b'\x69', ZP:b'\x65', ZPX:b'\x75', ABS:b'\x6D', ABSX:b'\x7D', ABSY:b'\x79', INDX:b'\x61', INDY:b'\x71' },
		SBC: { IMM:b'\xE9', ZP:b'\xE5', ZPX:b'\xF5', ABS:b'\xED', ABSX:b'\xFD', ABSY:b'\xF9', INDX:b'\xE1', INDY:b'\xF1' },
		INC: { ZP:b'\xE6', ZPX:b'\xF6', ABS:b'\xEE', ABSX:b'\xFE' },
		DEC: { ZP:b'\xC6', ZPX:b'\xD6', ABS:b'\xCE', ABSX:b'\xDE' },
		JMP: { ABS: b'\x4C', IND: b'\x6C' }, JSR: { ABS: b'\x20' }, RTS: b'\x60', RTI: b'\x40',
		TAX: b'\xAA', TXA: b'\x8A', TAY: b'\xA8', TYA: b'\x98', TSX: b'\xBA', TXS: b'\x9A',
		INX: b'\xE8', INY: b'\xC8', DEX: b'\xCA', DEY: b'\x88',
		CLV: b'\xB8', CLC: b'\x18', SEC: b'\x38', CLI: b'\x58', SEI: b'\x78', CLD: b'\xD8', SED: b'\xF8',
		NOP: b'\xEA', NOP3: b'\x04', NOP4: b'\x14', BRK: b'\x00',
		PHA: b'\x48', PLA: b'\x68', PHP: b'\x08', PLP: b'\x28',
		ASL: { ACC: b'\x0A', ZP: b'\x06', ZPX: b'\x16', ABS: b'\x0E', ABSX: b'\x1E' },
		LSR: { ACC: b'\x4a', ZP: b'\x46', ZPX: b'\x56', ABS: b'\x4E', ABSX: b'\x5E' },
		ROL: { ACC: b'\x2a', ZP: b'\x26', ZPX: b'\x36', ABS: b'\x2E', ABSX: b'\x3E' },
		ROR: { ACC: b'\x6A', ZP: b'\x66', ZPX: b'\x76', ABS: b'\x6E', ABSX: b'\x7E' },
		AND: { IMM: b'\x29', ZP: b'\x25', ZPX: b'\x35', ABS: b'\x2D', ABSX: b'\x3D', ABSY: b'\x39', INDX: b'\x21', INDY: b'\x31' },
		ORA: { IMM: b'\x09', ZP: b'\x05', ZPX: b'\x15', ABS: b'\x0D', ABSX: b'\x1D', ABSY: b'\x19', INDX: b'\x01', INDY: b'\x11' },
		EOR: { IMM: b'\x49', ZP: b'\x45', ZPX: b'\x55', ABS: b'\x4D', ABSX: b'\x5D', ABSY: b'\x59', INDX: b'\x41', INDY: b'\x51' },
		CMP: { IMM: b'\xC9', ZP: b'\xC5', ZPX: b'\xD5', ABS: b'\xCD', ABSX: b'\xDD', ABSY: b'\xD9', INDX: b'\xC1', INDY: b'\xD1' },
		BIT: { ZP: b'\x24', ABS: b'\x2C' }
	}

	default_filler = opcodes[NOP] # default filler for address gaps
	

	def __init__(self):
		self.address = None # The 'program counter' or current address
		self.offset = 0 # byte offset of output since beginning of file
		self.filler = self.default_filler
		self.output = bytearray()
		self.labels = {}
		self.constants = {}
		self.pending_labels = {} # {label_name: [offset to replace actual address]}

# --> Utility functions
	def get_output(self) -> bytearray:
		return self.output
	
	def check_name(self, name: str) -> bool:
		''' Checks that a name hadn't been already defined '''
		if name in self.constants or name in self.labels:
			return False
		return True
	
	def assert_8bits(self, value):
		try: # it's a scalar?
			bits = value.bit_length()
		except AttributeError: # no, it must be a string
			bits = len(value) * 8
		else:
			if value < -128: # bit_length of (-129..-255) returns 8 for some reason
				bits = 9 # workaround to force the exception
		if bits > 8:
			raise FassException(f"An 8 bit value was expected, but `{value}` was given.")
		return value
	
	def assert_negative_8bits(self, value: int):
		if -128 <= value <= -1:
			return value
		else:
			raise FassException(f"A negative 8 bit value was expected (-128..-1), but {value} was given.")

	# WIP TODO: Should add a way to serialize a 0..FF number into 2 bytes, for addresses
	def serialize(self, value, endian: str = 'big', signed: bool = False ) -> bytes:
		''' Convert value to bytes to be output '''
		try: # it's a scalar?
			return value.to_bytes( max( 1, ceil( value.bit_length()/8 )), byteorder= endian, signed= signed)
			# added max to ensure at least 1 byte or else a zero value would return b'' instead of b'\00'
		except AttributeError:
			if type(value) is bytes:
				return value
			elif type(value) is str:
				return bytes(bytes(value, 'ascii').decode('unicode_escape'), 'ascii')
			else:
				raise FassException(f"Unexpected type `{type(value)}` of value `{value}`.") from None

	def error(self, message: str):
		raise FassException(message)

	def append_output( self, output: bytes ):
		''' Append bytes to the program output '''
		if self.address is None:
			raise FassException("Output started without setting an address first.")
		self.output += output
		self.address += len(output)
		self.offset += len(output)
# Utility functions <--

# --> Statements
	def set_address(self, new_address: int):
		''' set current address for producing next output byte '''
		if new_address > 0xFFFF:
			raise FassException( f"Address should be between 0 and $FFFF, `{new_address}` given.")
		
		if self.address is not None:
			if new_address < self.address: # new address can't overlap current address
				hex_cur_address = hex(self.address)[2:].upper()
				hex_new_address = hex(new_address)[2:].upper()
				raise FassException(f"Address ${hex_new_address} should be greater or equal to current address ${hex_cur_address}.")
			elif new_address > self.address: # got to fill the gap
				gap = new_address - self.address
				self.append_output(self.filler * gap)
		
		self.address = new_address
	
	def set_label(self, label: str, address: int ):
		''' Declare a label, whether it points to the current or a remote address '''
		if not self.check_name(label):
			raise FassException(f"Name `{label}` already declared.")
		if address is None:
			address = self.address
		elif address > 0xFFFF:
			raise FassException(f"Address {address} is outside the 64KB range 0..$FFFF")
		self.labels[label] = address
	
	def get_label(self, label: str):
		if label in self.constants:
			raise FassException(f"Name `{label}` already defined as a constant.")
		if label in self.labels:
			return self.labels[label]
		else:
			return None
			# WIP TODO implement forward references
			# if label in self.pending_labels:
			# 	self.pending_labels[label].append(self.offset)
			# else:
			# 	self.pending_labels[label] = [self.offset]

	def set_filler(self, filler):
		if filler is None:
			filler = self.default_filler
		original_filler = filler
		try: # is it an 8 bit scalar value?
			filler = bytes([filler])
		except TypeError: # no, it's a string
			filler = bytes(filler, 'ascii')
		except ValueError:
			filler = '' # it's longer than 8 bits, force following `if` to fail
		if len(filler) != 1:
			raise FassException(f"The filler value must be a single byte, `{original_filler}` given.")
		self.filler = filler
	
	def set_constant(self, name: str, value):
		original_name = name
		name = name.lower()
		if self.check_name(name):
			self.constants[name] = value
		else:
			raise FassException(f"Name `{original_name}` has already been defined.")

	def get_constant(self, name: str):
		try:
			return self.constants[name]
		except KeyError:
			raise FassException(f"Constant `{name}` hasn't been defined.") from None

	def data(self, datas: list):
		output = bytearray()
		for data in datas:
			output += self.serialize(data.val)
		self.append_output(output)

	def flag_set(self, flag: str, value: str):
		if flag == 'carry':
			opcode = self.SEC if value=='1' else self.CLC
		elif flag == 'overflow':
			if value == '0':
				opcode = self.CLV
			else:
				raise FassException("The overflow flag can't be set to 1, only cleared (overflow = 0)")
		elif flag == 'interrupt':
			opcode = self.CLI if value=='on' else self.SEI
		elif flag == 'decimal mode':
			opcode = self.SED if value=='on' else self.CLD
		self.append_output(self.opcodes[opcode])
	
	def stack(self, operation: str, register: str):
		if register == 'a':
			mnemonic = self.PHA if operation=='push' else self.PLA
		elif register == 'flags':
			mnemonic = self.PHP if operation=='push' else self.PLP
		self.append_output(self.opcodes[mnemonic])

	def operation(self, mnemonic: str, addressing: str = None, operand: bytes = None):
		opcode = self.opcodes[mnemonic] # operations with a single implied addressing mode
		if addressing:
			try:
				opcode = opcode[addressing] # operations with proper addressing modes
			except KeyError:
				# prepare exception for reuse
				exp = FassException(f"Addressing mode `{self.addressings[addressing]}` "+
						f"is not available for generated instruction {mnemonic}.")
				# if a zero page address was given, but only absolute addressings are available for this mnemonic, 
				# use them instead. (example: there's no LDA.ZPY but there's equivalent LDA.ABSY)
				if len(operand) == 1:
					alternates = {self.ZP: self.ABS, self.ZPX: self.ABSX, self.ZPY: self.ABSY}
					try:
						opcode = opcode[alternates[addressing]]
					except KeyError:
						raise exp from None # No equivalent absolute addressing available
					else:
						operand += b'\x00' # make address 16 bit little endian
				else:
					raise exp from None # given addressing is not available for given mnemonic

		output = bytearray(opcode)
		if operand:
			output += operand # TODO WIP I think caller rules should check operand length, right?
		self.append_output(output)

	
	def assign_reg_reg(self, reg1: str, reg2: str):
		transfer = {
			'A': {'X': self.TXA, 'Y': self.TYA},
			'Y': {'A': self.TAY},
			'X': {'A': self.TAX, 'STACK': self.TSX},
			'STACK': {'X': self.TXS}
		}
		try:
			opcode = self.opcodes[transfer[reg1][reg2]]
		except KeyError:
			raise FassException(f"Invalid register assignment {reg1} = {reg2}.") from None
		else:
			self.append_output(opcode)
# Statements <--

# test
if __name__ == '__main__':
	fass = Fass()
	for d in [128, 129, 255, 256, 257, -1, -127, -128, "A"]:
		s = fass.serialize(d)
		print(f"`{d}` -> `{s}`")