
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

# Return / RTS RTI
	def exitReturn(self, ctx:fassParser.ReturnContext):
		self.fass.operation(Fass.RTS)

	def exitRetint(self, ctx:fassParser.RetintContext):
		self.fass.operation(Fass.RTI)

# Goto Gosub / JMP JSR
	def exitGoto_stmt(self, ctx:fassParser.Goto_stmtContext):
		ref = ctx.reference() or ctx.indirect()
		self.assert_not_const(ref)
		self.fass.operation(Fass.JMP, ref.addressing, self.fass.serialize(ref.adrs, 'little'))
	
	def exitGosub_stmt(self, ctx:fassParser.Gosub_stmtContext):
		if ctx.ref.addressing != Fass.ABS:
			return self.fass.error(f"Gosub (JSR) only accepts the absolute addressing mode.")
		self.fass.operation(Fass.JSR, Fass.ABS, self.fass.serialize(ctx.ref.adrs, 'little'))

# Assign
	def assign_reg_lit(self, register: str, literal):
		mnemonic = "LD"+ register
		operand = self.fass.serialize(literal)
		self.fass.assert_8bits(operand)
		self.fass.operation(mnemonic, Fass.IMM, operand)
	
	# depending on operation: LD -> reg=ref, ST -> ref=reg
	def assign(self, operation: str, register: str, addressing: str, address: int):
		self.fass.operation(operation+register, addressing, self.fass.serialize(address, 'little'))

	def assert_not_const(self, ref: fassParser.ReferenceContext):
		if ref.const:
			self.fass.error(f"Can't assign to constant {ref.lbl}")

	def exitAssign_reg_lit(self, ctx:fassParser.Assign_reg_litContext):
		self.assign_reg_lit(ctx.reg.reg_name.text.upper(), ctx.lit.val )

	def exitAssign_reg_reg(self, ctx:fassParser.Assign_reg_regContext):
		self.fass.assign_reg_reg(ctx.reg1.reg_name.text.upper(), ctx.reg2.reg_name.text.upper())

	def exitAssign_reg_ref(self, ctx:fassParser.Assign_reg_refContext):
		if ctx.ref.const:
			self.assign_reg_lit(ctx.reg.reg_name.text.upper(), ctx.ref.val)
		else:
			self.assign("LD", ctx.reg.reg_name.text.upper(), ctx.ref.addressing, ctx.ref.adrs)

	def exitAssign_ref_reg(self, ctx:fassParser.Assign_ref_regContext):
		self.assert_not_const(ctx.ref)
		self.assign("ST", ctx.reg.reg_name.text.upper(), ctx.ref.addressing, ctx.ref.adrs)

	def exitAssign_ref_reg_lit(self, ctx:fassParser.Assign_ref_reg_litContext):
		self.assert_not_const(ctx.ref)
		self.assign_reg_lit(ctx.reg.reg_name.text.upper(), ctx.lit.val)
		self.assign("ST", ctx.reg.reg_name.text.upper(), ctx.ref.addressing, ctx.ref.adrs)

	def exitAssign_ref_reg_ref(self, ctx:fassParser.Assign_ref_reg_refContext):
		self.assert_not_const(ctx.ref1)
		if ctx.ref2.const:
			self.assign_reg_lit(ctx.reg.reg_name.text.upper(), ctx.ref2.val)
		else:
			self.assign("LD", ctx.reg.reg_name.text.upper(), ctx.ref2.addressing, ctx.ref2.adrs)
		self.assign("ST", ctx.reg.reg_name.text.upper(), ctx.ref1.addressing, ctx.ref1.adrs)

# Arithmetic: INC INX INY ADC SBC  
	def exitArithmetic_a_lit(self, ctx:fassParser.Arithmetic_a_litContext):
		self.fass.assert_8bits(ctx.lit.val)
		mnemonic = 'ADC' if ctx.op.text=='+=' else 'SBC'
		self.fass.operation(mnemonic, Fass.IMM, self.fass.serialize(ctx.lit.val))
	
	def exitArithmetic_a_ref(self, ctx:fassParser.Arithmetic_a_refContext):
		mnemonic = 'ADC' if ctx.op.text=='+=' else 'SBC'
		self.fass.operation(mnemonic, ctx.ref.addressing, self.fass.serialize(ctx.ref.adrs, 'little'))

	def exitArithmetic_reg_inc(self, ctx:fassParser.Arithmetic_reg_incContext):
		if ctx.lit.val != 1:
			self.fass.error(f"Registers X and Y can only be incremented or decremented by 1, but {ctx.lit.val} given.")
		oper = 'IN' if ctx.op.text=='+=' else 'DE'
		self.fass.operation(oper + ctx.reg.reg_name.text.upper())
	
	def exitArithmetic_ref_lit(self, ctx:fassParser.Arithmetic_ref_litContext):
		if ctx.lit.val != 1:
			self.fass.error(f"Memory references can only be incremented or decremented by 1, but {ctx.lit.val} given.")
		mnemonic = 'INC' if ctx.op.text=='+=' else 'DEC'
		self.fass.operation( mnemonic, ctx.ref.addressing, self.fass.serialize(ctx.ref.adrs, 'little'))

# Bit shifting: LSR ASL ROL ROR
	def exitBit_shift_stmt(self, ctx:fassParser.Bit_shift_stmtContext):
		if ctx.A():
			addressing = Fass.ACC
			address = None
		else:
			ref = ctx.reference()
			addressing = ref.addressing
			address = self.fass.serialize(ref.adrs, 'little')
		mnemonic = {'>>': Fass.LSR, '<<': Fass.ASL, '->': Fass.ROR, '<-': Fass.ROL}[ctx.op.text]
		self.fass.operation(mnemonic, addressing, address)

#Logical AND ORA EOR
	def exitLogic_stmt(self, ctx:fassParser.Logic_stmtContext):
		literal = ctx.literal()
		if literal is not None:
			operand = self.fass.serialize(literal.val)
			addressing = Fass.IMM
		else:
			ref = ctx.reference()
			addressing = ref.addressing
			operand = self.fass.serialize(ref.adrs, 'little')
		mnemonic = {'and=': Fass.AND, 'or=': Fass.ORA, 'xor=': Fass.EOR}[ctx.op.text.lower()]
		self.fass.operation(mnemonic, addressing, operand)

# Compare
	def exitCompare_stmt(self, ctx:fassParser.Compare_stmtContext):
		literal = ctx.literal()
		if literal:
			addressing = Fass.IMM
			operand = self.fass.serialize( self.fass.assert_8bits( literal.val))
		else:
			ref = ctx.reference()
			addressing = ref.addressing
			operand = self.fass.serialize(ref.adrs, 'little')
		self.fass.operation(Fass.CMP, addressing, operand)

# Bit test
	def exitBittest_stmt(self, ctx:fassParser.Bittest_stmtContext):
		self.fass.operation(Fass.BIT, ctx.ref.addressing, self.fass.serialize(ctx.ref.adrs, 'little'))

# Statements <--

# --> References
	def enterReference(self, ctx:fassParser.ReferenceContext):
		ctx.lbl = ctx.children[0].lbl.text.lower()
		ctx.const = False
		ctx.adrs = None
		ctx.val = None
		if ctx.name():
			const = self.fass.get_constant(ctx.lbl)
			if const is not None:
				ctx.val = const
				ctx.adrs = ctx.children[0].adrs = None
				ctx.const = True
		if not ctx.const or not ctx.name(): # it's not a constant, assume it's a label
			ctx.adrs = ctx.children[0].adrs = self.fass.get_label(ctx.lbl)

	def exitReference(self, ctx:fassParser.ReferenceContext):
		ctx.addressing = ctx.children[0].addressing

	def exitName(self, ctx:fassParser.NameContext):
		if ctx.const:
			ctx.addressing = None
		elif ctx.adrs > 0xFF:
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