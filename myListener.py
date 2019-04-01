
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

# Stack
	def exitStack_stmt(self, ctx:fassParser.Stack_stmtContext):
		self.fass.stack(ctx.op.text.lower(), ctx.reg.text.lower())

# Return
	def exitReturn(self, ctx:fassParser.ReturnContext):
		self.fass.operation(Fass.RTS)

	def exitRetint(self, ctx:fassParser.RetintContext):
		self.fass.operation(Fass.RTI)

# Assign
	def exitAssign_reg_lit(self, ctx:fassParser.Assign_reg_litContext):
		mnemonic = "LD"+ ctx.reg.reg_name.text.upper()
		operand = self.fass.serialize( ctx.lit.val )
		self.fass.assert_8bits(operand)
		self.fass.operation(mnemonic, Fass.IMM, operand)

	def exitAssign_reg_reg(self, ctx:fassParser.Assign_reg_regContext):
		self.fass.assign_reg_reg(ctx.reg1.reg_name.text.upper(), ctx.reg2.reg_name.text.upper())

	def exitAssign_reg_ref(self, ctx:fassParser.Assign_reg_refContext):
		address = ctx.ref.adrs
		addressing = ctx.ref.addressing
		register = ctx.reg.reg_name.text.upper()
		self.fass.operation("LD"+register, addressing, self.fass.serialize(address, 'little'))

	def exitAssign_ref_reg(self, ctx:fassParser.Assign_ref_regContext):
		address = ctx.ref.adrs
		addressing = ctx.ref.addressing
		register = ctx.reg.reg_name.text.upper()
		self.fass.operation("ST"+register, addressing, self.fass.serialize(address, 'little'))

	def exitAssign_ref_reg_lit(self, ctx:fassParser.Assign_ref_reg_litContext):
		pass

	def exitAssign_ref_reg_ref(self, ctx:fassParser.Assign_ref_reg_refContext):
		pass

# Statements <--

# --> References
	def enterReference(self, ctx:fassParser.ReferenceContext):
		ctx.lbl = ctx.children[0].lbl.text.lower()
		ctx.adrs = ctx.children[0].adrs = self.fass.get_label(ctx.lbl)

	def exitReference(self, ctx:fassParser.ReferenceContext):
		ctx.addressing = ctx.children[0].addressing

	def exitName(self, ctx:fassParser.NameContext):
		if ctx.adrs is None or ctx.adrs > 0xFF:
			ctx.addressing = Fass.ABS
		else:
			ctx.addressing = Fass.ZP

	def exitIndexed(self, ctx:fassParser.IndexedContext):
		if ctx.adrs is None or ctx.adrs > 0xFF:
			ctx.addressing = Fass.ABSX if ctx.reg.text.upper()=='X' else Fass.ABSY
		else:
			ctx.addressing = Fass.ZPX if ctx.reg.text.upper()=='X' else Fass.ZPY

	def exitIndir_x(self, ctx:fassParser.Indir_xContext):
		ctx.addressing = Fass.INDX
		if ctx.adrs > 0xFF:
			self.fass.error("Indirect indexed addressing can only be used with zeropage addresses. Label `{ctx.lbl}` is at {ctx.adrs}")

	def exitIndir_y(self, ctx:fassParser.Indir_yContext):
		ctx.addressing = Fass.INDY
		if ctx.adrs > 0xFF:
			self.fass.error("Indirect indexed addressing can only be used with zeropage addresses. Label `{ctx.lbl}` is at {ctx.adrs}")

	def exitIndirect(self, ctx:fassParser.IndirectContext):
		ctx.addressing = Fass.IND

# References <--

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
		ctx.val = self.fass.serialize( self.fass.assert_negative_8bits( int( ctx.NEGATIVE_NUMBER().symbol.text)), 'big', True)

	def exitBrk_literal(self, ctx:fassParser.Brk_literalContext):
		ctx.val = Fass.opcodes[Fass.BRK]

	def exitNop_literal(self, ctx:fassParser.Nop_literalContext):
		ctx.val = Fass.opcodes[Fass.NOP]
# Values <--