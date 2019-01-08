
from fassLexer import fassLexer
from fassParser import fassParser
from fassListener import fassListener

class fassCompiler(fassListener) :
	address = 0
	labels = []

	def enterAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		if( ctx.children[1].children[0].symbol.type == fassLexer.HEX_BIGEND ):
			address = ctx.children[1].children[0].symbol.text
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
		
if __name__ == '__main__':
	test = fassCompiler()
	pass

"""
imp
imm
zp
zpx
zpy
abs
absx
absy
absind
indx
indy
"""