
from fass import Fass
from fassParser import fassParser
from fassListener import fassListener

class myListener(fassListener):
	
	def __init__(self, fass: Fass):
		self.fass = fass

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
		self.fass.set_filler( ctx.filler_byte().val )

	def exitFiller_default(self, ctx:fassParser.Filler_defaultContext):
		self.fass.set_filler(None)

	def exitFiller_byte(self, ctx:fassParser.Filler_byteContext):
		ctx.val = ctx.children[0].val
		

# --> Values
	def exitHex_bigend(self, ctx:fassParser.Hex_bigendContext):
		ctx.val = int( ctx.HEX_BIGEND().symbol.text[1:], 16 )

	def exitDec_bigend(self, ctx:fassParser.Dec_bigendContext):
		ctx.val = int( ctx.DEC_BIGEND().symbol.text )
	
	def exitBin_bigend(self, ctx:fassParser.Bin_bigendContext):
		ctx.val = int( ctx.BIN_BIGEND().symbol.text[1:], 2 )
	
	def exitString(self, ctx:fassParser.StringContext):
		ctx.val = ctx.STRING().symbol.text[1:-1]
# Values <--