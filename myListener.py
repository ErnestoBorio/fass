
from fass import Fass
from fassParser import fassParser
from fassListener import fassListener

class myListener(fassListener):
	
	def __init__(self, fass: Fass):
		self.fass = fass

# --> Statements

# Address
	def exitAddress_stmt(self, ctx:fassParser.Address_stmtContext):
		self.fass.set_address( ctx.address().val )

	def exitAddress_hex(self, ctx:fassParser.Address_hexContext):
		ctx.val = ctx.hex_bigend().val

	def exitAddress_dec(self, ctx:fassParser.Address_decContext):
		ctx.val = ctx.dec_bigend().val


# Labels
	def exitLabel(self, ctx:fassParser.LabelContext):
		self.fass.set_label( ctx.IDENTIFIER().symbol.text.lower(), None )
	
	def exitRemote_label_stmt(self, ctx:fassParser.Remote_label_stmtContext):
		self.fass.set_label( ctx.IDENTIFIER().symbol.text.lower(), ctx.address().val )


# Filler
	def exitFiller_value(self, ctx:fassParser.Filler_valueContext):
		self.fass.set_filler( ctx.value().val )

	def exitFiller_default(self, ctx:fassParser.Filler_defaultContext):
		self.fass.set_filler(None)

# NOP BRK
	def exitNop_brk_stmt(self, ctx:fassParser.Nop_brk_stmtContext):
		if len(ctx.children)>1:
			operand = ctx.children[1].val
			operand = self.fass.serialize( self.fass.assert_8bits(operand))
		else:
			operand = None
		self.fass.operation(ctx.mnemonic.text.upper(), None, operand)
# Const
	def exitConst_stmt(self, ctx:fassParser.Const_stmtContext):
		self.fass.set_constant(ctx.lhs.text.lower(), ctx.value().val)

# Data
	def exitData_stmt(self, ctx:fassParser.Data_stmtContext):
		self.fass.data(ctx.datas)

# Flags
	def exitFlag_set_stmt(self, ctx:fassParser.Flag_set_stmtContext):
		self.fass.flag_set(ctx.flag.text.lower(), ctx.operand.text.lower())

# Statements <--

# --> Values
	def exitValue(self, ctx:fassParser.ValueContext):
		ctx.val = ctx.children[0].val # passthrough the specific value to calling rule

	def exitLiteral(self, ctx:fassParser.LiteralContext):
		ctx.val = ctx.children[0].val # passthrough the specific value to calling rule

	def exitConstant(self, ctx:fassParser.ConstantContext):
		ctx.val = self.fass.get_constant(ctx.IDENTIFIER().symbol.text.lower())

	def exitHex_bigend(self, ctx:fassParser.Hex_bigendContext):
		ctx.val = int( ctx.HEX_BIGEND().symbol.text[1:], 16 )

	def exitDec_bigend(self, ctx:fassParser.Dec_bigendContext):
		ctx.val = int( ctx.DEC_BIGEND().symbol.text )
	
	def exitBin_bigend(self, ctx:fassParser.Bin_bigendContext):
		ctx.val = int( ctx.BIN_BIGEND().symbol.text[1:], 2 )
	
	def exitString(self, ctx:fassParser.StringContext):
		ctx.val = ctx.STRING().symbol.text[1:-1]
	
	# Values are first parsed (where they lose their leading zeroes) and then they are turned into little endian.
	# This could cause the confusion that $00ABCDL equates to $CDAB00 when it's actually $CDAB. WIP TODO
	def exitHex_litend(self, ctx:fassParser.Hex_litendContext):
		ctx.val = self.fass.serialize( int( ctx.HEX_LITEND().symbol.text[1:-1], 16), 'little');

	def exitDec_litend(self, ctx:fassParser.Dec_litendContext):
		ctx.val = self.fass.serialize( int( ctx.DEC_LITEND().symbol.text[:-1]), 'little');

	def exitBin_litend(self, ctx:fassParser.Bin_litendContext):
		ctx.val = self.fass.serialize( int( ctx.BIN_LITEND().symbol.text[1:-1], 2), 'little');

	def exitNegative_number(self, ctx:fassParser.Negative_numberContext):
		ctx.val = self.fass.serialize( self.fass.assert_negative_8bits( int( ctx.NEGATIVE_NUMBER().symbol.text)), 'little', True)

	def exitBrk_literal(self, ctx:fassParser.Brk_literalContext):
		ctx.val = Fass.opcodes[Fass.BRK]

	def exitNop_literal(self, ctx:fassParser.Nop_literalContext):
		ctx.val = Fass.opcodes[Fass.NOP]
# Values <--