
class fassException( Exception) :
	pass

class Fass():

	# enum addressing modes:
	IMP = 'IMP'; ACC = 'ACC'; IMM = 'IMM'; ZP = 'ZP'; ZPX = 'ZPX'; ZPY = 'ZPY'
	ABS = 'ABS'; ABSX = 'ABSX'; ABSY = 'ABSY'; IND = 'IND'; INDX = 'INDX'; INDY = 'INDY'

	# addressing mode names:
	addressings = { IMP:'implied', ACC:'accumulator', IMM:'immediate', ZP:'zero page',
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
		JMP: { ABS: b'\x4C', IND: b'\x6C' },
		TAX: b'\xAA', TXA: b'\x8A', TAY: b'\xA8', TYA: b'\x98', TSX: b'\xBA', TXS: b'\x9A',
		INX: b'\xE8', INY: b'\xC8', DEX: b'\xCA', DEY: b'\x88',
		CLV: b'\xB8', CLC: b'\x18', SEC: b'\x38', CLI: b'\x58', SEI: b'\x78', CLD: b'\xD8', SED: b'\xF8',
		NOP: b'\xEA', NOP3: b'\x04', NOP4: b'\x14',
		BRK: b'\x00', RTS: b'\x60', RTI: b'\x40'
	}

	default_filler = opcodes[NOP] # default filler for address gaps
	

	def __init__(self):
		self.address = None # The 'program counter' or current address
		self.filler = self.default_filler
		self.output = bytearray()
		self.labels = {}
		self.constants = {}

	def get_output(self) -> bytearray:
		return self.output
	
	def check_name(self, name: str) -> bool:
		''' Checks that a name hadn't been already defined '''
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