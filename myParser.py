
import sys
from antlr4 import *
from math import ceil
from io import StringIO
from typing.io import TextIO
from fassParser import fassParser

class fassException( Exception) :
	pass

class myParser( fassParser ):
	default_filler = b'\xEA' # default filler for address gaps ($EA = NOP)

	# enum addressing modes:
	IMP = 'IMP'; ACC = 'ACC'; IMM = 'IMM'; ZP = 'ZP'; ZPX = 'ZPX'; ZPY = 'ZPY'
	ABS = 'ABS'; ABSX = 'ABSX'; ABSY = 'ABSY'; IND = 'IND'; INDX = 'INDX'; INDY = 'INDY'
	DIR = "DIR" # Not a real addressing mode, but means either ZP or ABS

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

	def __init__( self, input: TokenStream, output: TextIO = sys.stdout ):
		super().__init__(input, output)
		self.address = None # current address where next byte will be output
		self.offset = 0 # count of bytes output so far
		self.filler = self.default_filler # filler for address gaps
		self.output = bytearray() # 6502 machine code bytes
		self.constants = {} # dict<str: bytes> of defined constants
		self.labels = {} # dict<str: bytes> of defined labels
		self.pending_refs = [] # forward references to labels

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
			raise fassException(f"Constant `{name}` is not defined.") from None
	
	def check_length(self, data: bytes, length: int ) -> bytes:
		if len(data) != length:
			data = data.decode('ascii')
			raise fassException(f"A {length} byte%s value expected, `{data}` given." % ('s' if length > 1 else '' ))
		return data
	
	def get_name(self, name ) -> tuple:
		try: # name is a defined constant?
			operand = self.constants[ name]
			addressing = self.IMM
		except KeyError: # name is not a defined constant
			try: # name is a defined label?
				addressing = self.DIR
				operand = self.get_label( name)
			except fassException: # name is not a defined label either
				raise fassException(
					f"Name `{name}` is neither a constant nor a label, forward references not yet implemented.")\
					from None
		return ( addressing, operand )
	
	def get_label(self, label: str ) -> bytes:
		try:
			address = self.labels[ label]
		except KeyError:
			raise fassException(f"Label `{label}` is not defined or it's a forward reference, not yet implemented.")\
				from None
		return address
		# WIP TODO needs to check for forward references
	
	def check_address(self, address: bytes ) -> bytes:
		if 1<= len(address) <= 2:
			return address
		else:
			raise fassException( f"Address should be 1 or 2 bytes long, `{address}` given." )

	def check_zeropage(self, address: bytes ) -> bytes:
		if len(address) == 1:
			return address
		else:
			raise fassException( f"Zero page address expected (0..$FF), $`{address}` given. (little endian)" )
	
	def check_value_in(self, value, whitelist ):
		if value in whitelist:
			return value
		else:
			raise fassException(f"Expected values {whitelist}, but {value} given.")

	def get_opcode(self, mnemonic: str, addressing: str ) -> bytes:
		try:
			opcode = self.opcodes[ mnemonic][ addressing]
		except KeyError:
			raise fassException( f"Addressing mode {self.addressings[addressing]} is not available for generated instruction {mnemonic}." )\
				from None
		return opcode

# Utility functions <--

# --> Statements
	def set_address( self, new_address: int ):
		''' set current address for producing next output byte '''
		if new_address > 0xFFFF:
			raise fassException( f"Address should be between 0 and $FFFF, `{new_address}` given.")
		
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

	def data(self, datas: list ):
		output = bytearray()
		for value in datas:
			output += value.ret
		self.append_output( output)
	
	def set_label(self, label: str, address: bytes = None ):
		if label in self.labels:
			raise fassException(f"Label `{label}` already declared.")
		if address is None:
			address = self.serialize( self.address, 'little' )
		elif len(address) > 2:
			raise fassException(f"Address {address} is outside the 64KB range 0..$FFFF")
		self.labels[label] = address[1:] + address[0:1] # swap bytes to make address little endian
	
	# LDA LDX LDY STA STX STY
	def load_store_op(self, operation: str, register: str, addressing: str, operand: bytes ):
		if ( addressing == self.IMM ) and ( len( operand ) != 1 ):
			raise fassException( f"Registers can only be assigned 1-byte literal values, `{operand}` given." )
		elif addressing == self.DIR:
			addressing = self.ZP if len(operand)==1 else self.ABS
		mnemonic = operation + register
		opcode = self.get_opcode( mnemonic, addressing)
		self.append_output( opcode + operand)

	# A +=|-= literal --> ADC|SBC Immediate.  X|Y +=|-= 1 --> INX, INY, DEX, DEY
	def arith_reg_lit(self, register: str, op: str, literal: bytes ):
		if register == "a":
			if len(literal) != 1:
				raise fassException(f"Only a 1 byte value can be %s register A, {literal} given."%
					( "added to" if op == "+=" else "subtracted from" ))
			mnemonic = "ADC" if op=="+=" else "SBC"
			opcode = self.opcodes[ mnemonic][ self.IMM]
			self.append_output( opcode + literal )
		elif register in ["x","y"]:
			if literal != b'\x01':
				raise fassException(f"Only the value 1 can be %s register {register.upper()}, {literal} given."%
					( "added to" if op == "+=" else "subtracted from" ))
			oper = "IN" if op=="+=" else "DE"
			mnemonic = oper + register.upper()
			self.append_output( self.opcodes[ mnemonic])
		# else: what register is it?
	
	# ref +=|-= 1 --> INC, DEC
	def arith_ref_lit(self, reference: tuple, op: str, literal: bytes ):
		if literal != b'\x01':
			raise fassException(f"Only the value 1 can be %s memory, {literal} given."%
				( "added to" if op == "+=" else "subtracted from" ))
		address = reference[1]
		addressing = reference[0]
		if addressing == self.DIR:
			addressing = self.ZP if len(address)==1 else self.ABS
		mnemonic = "INC" if op=='+=' else "DEC"
		opcode = self.get_opcode( mnemonic, addressing)
		self.append_output( opcode + address)
	
	# A += label[X] --> ADC|SBC reference|ref_direct
	def arith_reg_ref(self, op: str, reference: tuple ):
		address = reference[1]
		addressing = reference[0]
		if addressing == self.DIR:
			addressing = self.ZP if len(address)==1 else self.ABS
		mnemonic = "ADC" if op=='+=' else "SBC"
		opcode = self.get_opcode( mnemonic, addressing)
		self.append_output( opcode + address)

# Statements <--