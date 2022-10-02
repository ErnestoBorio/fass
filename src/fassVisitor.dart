// Generated from /Users/petruza/Source/Drean64/fass/src/fass.g4 by ANTLR 4.11.1
// ignore_for_file: unused_import, unused_local_variable, prefer_single_quotes
import 'package:antlr4/antlr4.dart';

import 'fassParser.dart';

/// This abstract class defines a complete generic visitor for a parse tree
/// produced by [fassParser].
///
/// [T] is the eturn type of the visit operation. Use `void` for
/// operations with no return type.
abstract class fassVisitor<T> extends ParseTreeVisitor<T> {
  /// Visit a parse tree produced by [fassParser.program].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitProgram(ProgramContext ctx);

  /// Visit a parse tree produced by [fassParser.label].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitLabel(LabelContext ctx);

  /// Visit a parse tree produced by [fassParser.statement].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitStatement(StatementContext ctx);

  /// Visit a parse tree produced by [fassParser.address].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitAddress(AddressContext ctx);

  /// Visit a parse tree produced by [fassParser.address_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitAddress_stmt(Address_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.remote_label_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitRemote_label_stmt(Remote_label_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.filler_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitFiller_stmt(Filler_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.const_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitConst_stmt(Const_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.data_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitData_stmt(Data_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.flag_set_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitFlag_set_stmt(Flag_set_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.stack_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitStack_stmt(Stack_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.goto_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitGoto_stmt(Goto_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.bit_shift_stmt].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitBit_shift_stmt(Bit_shift_stmtContext ctx);

  /// Visit a parse tree produced by [fassParser.reference].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitReference(ReferenceContext ctx);

  /// Visit a parse tree produced by [fassParser.direct].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitDirect(DirectContext ctx);

  /// Visit a parse tree produced by [fassParser.indirect].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitIndirect(IndirectContext ctx);

  /// Visit a parse tree produced by [fassParser.indexed].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitIndexed(IndexedContext ctx);

  /// Visit a parse tree produced by [fassParser.value].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitValue(ValueContext ctx);

  /// Visit a parse tree produced by [fassParser.constant].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitConstant(ConstantContext ctx);

  /// Visit a parse tree produced by [fassParser.literal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitLiteral(LiteralContext ctx);

  /// Visit a parse tree produced by [fassParser.opcode_literal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitOpcode_literal(Opcode_literalContext ctx);

  /// Visit a parse tree produced by [fassParser.hexadecimal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitHexadecimal(HexadecimalContext ctx);

  /// Visit a parse tree produced by [fassParser.decimal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitDecimal(DecimalContext ctx);

  /// Visit a parse tree produced by [fassParser.binary].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitBinary(BinaryContext ctx);

  /// Visit a parse tree produced by [fassParser.brk_literal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitBrk_literal(Brk_literalContext ctx);

  /// Visit a parse tree produced by [fassParser.nop_literal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitNop_literal(Nop_literalContext ctx);

  /// Visit a parse tree produced by [fassParser.nop3_literal].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitNop3_literal(Nop3_literalContext ctx);

  /// Visit a parse tree produced by [fassParser.negative_number].
  /// [ctx] the parse tree.
  /// Return the visitor result.
  T? visitNegative_number(Negative_numberContext ctx);
}