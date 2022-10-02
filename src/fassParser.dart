// Generated from /Users/petruza/Source/Drean64/fass/src/fass.g4 by ANTLR 4.11.1
// ignore_for_file: unused_import, unused_local_variable, prefer_single_quotes
import 'package:antlr4/antlr4.dart';

import 'fassVisitor.dart';
import 'fassBaseVisitor.dart';
const int RULE_program = 0, RULE_label = 1, RULE_statement = 2, RULE_address = 3, 
          RULE_address_stmt = 4, RULE_remote_label_stmt = 5, RULE_filler_stmt = 6, 
          RULE_const_stmt = 7, RULE_data_stmt = 8, RULE_flag_set_stmt = 9, 
          RULE_stack_stmt = 10, RULE_goto_stmt = 11, RULE_bit_shift_stmt = 12, 
          RULE_reference = 13, RULE_direct = 14, RULE_indirect = 15, RULE_indexed = 16, 
          RULE_value = 17, RULE_constant = 18, RULE_literal = 19, RULE_opcode_literal = 20, 
          RULE_hexadecimal = 21, RULE_decimal = 22, RULE_binary = 23, RULE_brk_literal = 24, 
          RULE_nop_literal = 25, RULE_nop3_literal = 26, RULE_negative_number = 27;
class fassParser extends Parser {
  static final checkVersion = () => RuntimeMetaData.checkVersion('4.11.1', RuntimeMetaData.VERSION);
  static const int TOKEN_EOF = IntStream.EOF;

  static final List<DFA> _decisionToDFA = List.generate(
      _ATN.numberOfDecisions, (i) => DFA(_ATN.getDecisionState(i), i));
  static final PredictionContextCache _sharedContextCache = PredictionContextCache();
  static const int TOKEN_T__0 = 1, TOKEN_T__1 = 2, TOKEN_T__2 = 3, TOKEN_T__3 = 4, 
                   TOKEN_T__4 = 5, TOKEN_T__5 = 6, TOKEN_T__6 = 7, TOKEN_T__7 = 8, 
                   TOKEN_HEXADECIMAL = 9, TOKEN_BINARY = 10, TOKEN_DECIMAL = 11, 
                   TOKEN_NEGATIVE_NUMBER = 12, TOKEN_BRK = 13, TOKEN_NOP = 14, 
                   TOKEN_NOP3 = 15, TOKEN_ADDRESS_KWD = 16, TOKEN_FILLER_KWD = 17, 
                   TOKEN_DEFAULT_KWD = 18, TOKEN_DATA_KWD = 19, TOKEN_CONST_KWD = 20, 
                   TOKEN_IF_KWD = 21, TOKEN_THEN_KWD = 22, TOKEN_ELSE_KWD = 23, 
                   TOKEN_GOTO_KWD = 24, TOKEN_GOSUB_KWD = 25, TOKEN_RETURN_KWD = 26, 
                   TOKEN_RETINT_KWD = 27, TOKEN_PUSH_KWD = 28, TOKEN_PULL_KWD = 29, 
                   TOKEN_FLAGS_KWD = 30, TOKEN_AND_KWD = 31, TOKEN_OR_KWD = 32, 
                   TOKEN_XOR_KWD = 33, TOKEN_BITTEST_KWD = 34, TOKEN_COMPARE_KWD = 35, 
                   TOKEN_ROTATE_KWD = 36, TOKEN_SHIFT_KWD = 37, TOKEN_ROL_KWD = 38, 
                   TOKEN_ROR_KWD = 39, TOKEN_ASL_KWD = 40, TOKEN_LSR_KWD = 41, 
                   TOKEN_CARRY = 42, TOKEN_OVERFLOW = 43, TOKEN_INTERRUPT = 44, 
                   TOKEN_DECIMAL_MODE = 45, TOKEN_NOT = 46, TOKEN_ZERO = 47, 
                   TOKEN_POSITIVE = 48, TOKEN_NEGATIVE = 49, TOKEN_EQUAL = 50, 
                   TOKEN_ON = 51, TOKEN_OFF = 52, TOKEN_A = 53, TOKEN_X = 54, 
                   TOKEN_Y = 55, TOKEN_STACK = 56, TOKEN_IDENTIFIER = 57, 
                   TOKEN_WHITESPACE = 58, TOKEN_EOL = 59;

  @override
  final List<String> ruleNames = [
    'program', 'label', 'statement', 'address', 'address_stmt', 'remote_label_stmt', 
    'filler_stmt', 'const_stmt', 'data_stmt', 'flag_set_stmt', 'stack_stmt', 
    'goto_stmt', 'bit_shift_stmt', 'reference', 'direct', 'indirect', 'indexed', 
    'value', 'constant', 'literal', 'opcode_literal', 'hexadecimal', 'decimal', 
    'binary', 'brk_literal', 'nop_literal', 'nop3_literal', 'negative_number'
  ];

  static final List<String?> _LITERAL_NAMES = [
      null, "':'", "'at'", "'='", "','", "'('", "')'", "'['", "']'"
  ];
  static final List<String?> _SYMBOLIC_NAMES = [
      null, null, null, null, null, null, null, null, null, "HEXADECIMAL", 
      "BINARY", "DECIMAL", "NEGATIVE_NUMBER", "BRK", "NOP", "NOP3", "ADDRESS_KWD", 
      "FILLER_KWD", "DEFAULT_KWD", "DATA_KWD", "CONST_KWD", "IF_KWD", "THEN_KWD", 
      "ELSE_KWD", "GOTO_KWD", "GOSUB_KWD", "RETURN_KWD", "RETINT_KWD", "PUSH_KWD", 
      "PULL_KWD", "FLAGS_KWD", "AND_KWD", "OR_KWD", "XOR_KWD", "BITTEST_KWD", 
      "COMPARE_KWD", "ROTATE_KWD", "SHIFT_KWD", "ROL_KWD", "ROR_KWD", "ASL_KWD", 
      "LSR_KWD", "CARRY", "OVERFLOW", "INTERRUPT", "DECIMAL_MODE", "NOT", 
      "ZERO", "POSITIVE", "NEGATIVE", "EQUAL", "ON", "OFF", "A", "X", "Y", 
      "STACK", "IDENTIFIER", "WHITESPACE", "EOL"
  ];
  static final Vocabulary VOCABULARY = VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

  @override
  Vocabulary get vocabulary {
    return VOCABULARY;
  }

  @override
  String get grammarFileName => 'fass.g4';

  @override
  List<int> get serializedATN => _serializedATN;

  @override
  ATN getATN() {
   return _ATN;
  }

  fassParser(TokenStream input) : super(input) {
    interpreter = ParserATNSimulator(this, _ATN, _decisionToDFA, _sharedContextCache);
  }

  ProgramContext program() {
    dynamic _localctx = ProgramContext(context, state);
    enterRule(_localctx, 0, RULE_program);
    int _la;
    try {
      int _alt;
      enterOuterAlt(_localctx, 1);
      state = 62;
      errorHandler.sync(this);
      _alt = interpreter!.adaptivePredict(tokenStream, 1, context);
      while (_alt != 2 && _alt != ATN.INVALID_ALT_NUMBER) {
        if (_alt == 1) {
          state = 57;
          errorHandler.sync(this);
          _la = tokenStream.LA(1)!;
          if (((_la) & ~0x3f) == 0 && ((1 << _la) & 153192482557591552) != 0) {
            state = 56;
            statement();
          }

          state = 59;
          match(TOKEN_EOL); 
        }
        state = 64;
        errorHandler.sync(this);
        _alt = interpreter!.adaptivePredict(tokenStream, 1, context);
      }
      state = 66;
      errorHandler.sync(this);
      _la = tokenStream.LA(1)!;
      if (((_la) & ~0x3f) == 0 && ((1 << _la) & 153192482557591552) != 0) {
        state = 65;
        statement();
      }

      state = 68;
      match(TOKEN_EOF);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  LabelContext label() {
    dynamic _localctx = LabelContext(context, state);
    enterRule(_localctx, 2, RULE_label);
    try {
      enterOuterAlt(_localctx, 1);
      state = 70;
      match(TOKEN_IDENTIFIER);
      state = 71;
      match(TOKEN_T__0);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  StatementContext statement() {
    dynamic _localctx = StatementContext(context, state);
    enterRule(_localctx, 4, RULE_statement);
    int _la;
    try {
      state = 86;
      errorHandler.sync(this);
      switch (interpreter!.adaptivePredict(tokenStream, 4, context)) {
      case 1:
        enterOuterAlt(_localctx, 1);
        state = 73;
        address_stmt();
        break;
      case 2:
        enterOuterAlt(_localctx, 2);
        state = 74;
        remote_label_stmt();
        break;
      case 3:
        enterOuterAlt(_localctx, 3);
        state = 75;
        filler_stmt();
        break;
      case 4:
        enterOuterAlt(_localctx, 4);
        state = 76;
        const_stmt();
        break;
      case 5:
        enterOuterAlt(_localctx, 5);
        state = 77;
        data_stmt();
        break;
      case 6:
        enterOuterAlt(_localctx, 6);
        state = 78;
        flag_set_stmt();
        break;
      case 7:
        enterOuterAlt(_localctx, 7);
        state = 79;
        stack_stmt();
        break;
      case 8:
        enterOuterAlt(_localctx, 8);
        state = 80;
        goto_stmt();
        break;
      case 9:
        enterOuterAlt(_localctx, 9);
        state = 81;
        bit_shift_stmt();
        break;
      case 10:
        enterOuterAlt(_localctx, 10);
        state = 82;
        label();
        state = 84;
        errorHandler.sync(this);
        _la = tokenStream.LA(1)!;
        if (((_la) & ~0x3f) == 0 && ((1 << _la) & 153192482557591552) != 0) {
          state = 83;
          statement();
        }

        break;
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  AddressContext address() {
    dynamic _localctx = AddressContext(context, state);
    enterRule(_localctx, 6, RULE_address);
    try {
      state = 90;
      errorHandler.sync(this);
      switch (tokenStream.LA(1)!) {
      case TOKEN_DECIMAL:
        enterOuterAlt(_localctx, 1);
        state = 88;
        decimal();
        break;
      case TOKEN_HEXADECIMAL:
        enterOuterAlt(_localctx, 2);
        state = 89;
        hexadecimal();
        break;
      default:
        throw NoViableAltException(this);
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Address_stmtContext address_stmt() {
    dynamic _localctx = Address_stmtContext(context, state);
    enterRule(_localctx, 8, RULE_address_stmt);
    try {
      enterOuterAlt(_localctx, 1);
      state = 92;
      match(TOKEN_ADDRESS_KWD);
      state = 93;
      address();
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Remote_label_stmtContext remote_label_stmt() {
    dynamic _localctx = Remote_label_stmtContext(context, state);
    enterRule(_localctx, 10, RULE_remote_label_stmt);
    try {
      enterOuterAlt(_localctx, 1);
      state = 95;
      match(TOKEN_IDENTIFIER);
      state = 96;
      match(TOKEN_T__1);
      state = 97;
      address();
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Filler_stmtContext filler_stmt() {
    dynamic _localctx = Filler_stmtContext(context, state);
    enterRule(_localctx, 12, RULE_filler_stmt);
    try {
      state = 103;
      errorHandler.sync(this);
      switch (interpreter!.adaptivePredict(tokenStream, 6, context)) {
      case 1:
        enterOuterAlt(_localctx, 1);
        state = 99;
        match(TOKEN_FILLER_KWD);
        state = 100;
        value();
        break;
      case 2:
        enterOuterAlt(_localctx, 2);
        state = 101;
        match(TOKEN_FILLER_KWD);
        state = 102;
        match(TOKEN_DEFAULT_KWD);
        break;
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Const_stmtContext const_stmt() {
    dynamic _localctx = Const_stmtContext(context, state);
    enterRule(_localctx, 14, RULE_const_stmt);
    try {
      enterOuterAlt(_localctx, 1);
      state = 105;
      match(TOKEN_CONST_KWD);
      state = 106;
      _localctx.const_name = match(TOKEN_IDENTIFIER);
      state = 107;
      match(TOKEN_T__2);
      state = 108;
      value();
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Data_stmtContext data_stmt() {
    dynamic _localctx = Data_stmtContext(context, state);
    enterRule(_localctx, 16, RULE_data_stmt);
    int _la;
    try {
      enterOuterAlt(_localctx, 1);
      state = 110;
      match(TOKEN_DATA_KWD);
      state = 115; 
      errorHandler.sync(this);
      _la = tokenStream.LA(1)!;
      do {
        state = 111;
        _localctx._value = value();
        _localctx.datas.add(_localctx._value);
        state = 113;
        errorHandler.sync(this);
        _la = tokenStream.LA(1)!;
        if (_la == TOKEN_T__3) {
          state = 112;
          match(TOKEN_T__3);
        }

        state = 117; 
        errorHandler.sync(this);
        _la = tokenStream.LA(1)!;
      } while (((_la) & ~0x3f) == 0 && ((1 << _la) & 144115188075920896) != 0);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Flag_set_stmtContext flag_set_stmt() {
    dynamic _localctx = Flag_set_stmtContext(context, state);
    enterRule(_localctx, 18, RULE_flag_set_stmt);
    int _la;
    try {
      state = 124;
      errorHandler.sync(this);
      switch (tokenStream.LA(1)!) {
      case TOKEN_CARRY:
      case TOKEN_OVERFLOW:
        enterOuterAlt(_localctx, 1);
        state = 119;
        _la = tokenStream.LA(1)!;
        if (!(_la == TOKEN_CARRY || _la == TOKEN_OVERFLOW)) {
        errorHandler.recoverInline(this);
        } else {
          if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
          errorHandler.reportMatch(this);
          consume();
        }
        state = 120;
        match(TOKEN_T__2);
        state = 121;
        _localctx.one_zero = decimal();
        break;
      case TOKEN_INTERRUPT:
      case TOKEN_DECIMAL_MODE:
        enterOuterAlt(_localctx, 2);
        state = 122;
        _la = tokenStream.LA(1)!;
        if (!(_la == TOKEN_INTERRUPT || _la == TOKEN_DECIMAL_MODE)) {
        errorHandler.recoverInline(this);
        } else {
          if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
          errorHandler.reportMatch(this);
          consume();
        }
        state = 123;
        _la = tokenStream.LA(1)!;
        if (!(_la == TOKEN_ON || _la == TOKEN_OFF)) {
        errorHandler.recoverInline(this);
        } else {
          if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
          errorHandler.reportMatch(this);
          consume();
        }
        break;
      default:
        throw NoViableAltException(this);
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Stack_stmtContext stack_stmt() {
    dynamic _localctx = Stack_stmtContext(context, state);
    enterRule(_localctx, 20, RULE_stack_stmt);
    try {
      state = 136;
      errorHandler.sync(this);
      switch (interpreter!.adaptivePredict(tokenStream, 10, context)) {
      case 1:
        enterOuterAlt(_localctx, 1);
        state = 126;
        match(TOKEN_A);
        state = 127;
        match(TOKEN_T__2);
        state = 128;
        match(TOKEN_PULL_KWD);
        break;
      case 2:
        enterOuterAlt(_localctx, 2);
        state = 129;
        match(TOKEN_PUSH_KWD);
        state = 130;
        match(TOKEN_A);
        break;
      case 3:
        enterOuterAlt(_localctx, 3);
        state = 131;
        match(TOKEN_FLAGS_KWD);
        state = 132;
        match(TOKEN_T__2);
        state = 133;
        match(TOKEN_PULL_KWD);
        break;
      case 4:
        enterOuterAlt(_localctx, 4);
        state = 134;
        match(TOKEN_PUSH_KWD);
        state = 135;
        match(TOKEN_FLAGS_KWD);
        break;
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Goto_stmtContext goto_stmt() {
    dynamic _localctx = Goto_stmtContext(context, state);
    enterRule(_localctx, 22, RULE_goto_stmt);
    try {
      enterOuterAlt(_localctx, 1);
      state = 138;
      match(TOKEN_GOTO_KWD);
      state = 139;
      reference();
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Bit_shift_stmtContext bit_shift_stmt() {
    dynamic _localctx = Bit_shift_stmtContext(context, state);
    enterRule(_localctx, 24, RULE_bit_shift_stmt);
    int _la;
    try {
      enterOuterAlt(_localctx, 1);
      state = 141;
      _la = tokenStream.LA(1)!;
      if (!(((_la) & ~0x3f) == 0 && ((1 << _la) & 4123168604160) != 0)) {
      errorHandler.recoverInline(this);
      } else {
        if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
        errorHandler.reportMatch(this);
        consume();
      }
      state = 144;
      errorHandler.sync(this);
      switch (tokenStream.LA(1)!) {
      case TOKEN_A:
        state = 142;
        match(TOKEN_A);
        break;
      case TOKEN_T__4:
      case TOKEN_IDENTIFIER:
        state = 143;
        reference();
        break;
      default:
        throw NoViableAltException(this);
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  ReferenceContext reference() {
    dynamic _localctx = ReferenceContext(context, state);
    enterRule(_localctx, 26, RULE_reference);
    try {
      state = 149;
      errorHandler.sync(this);
      switch (interpreter!.adaptivePredict(tokenStream, 12, context)) {
      case 1:
        enterOuterAlt(_localctx, 1);
        state = 146;
        direct();
        break;
      case 2:
        enterOuterAlt(_localctx, 2);
        state = 147;
        indirect();
        break;
      case 3:
        enterOuterAlt(_localctx, 3);
        state = 148;
        indexed();
        break;
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  DirectContext direct() {
    dynamic _localctx = DirectContext(context, state);
    enterRule(_localctx, 28, RULE_direct);
    try {
      enterOuterAlt(_localctx, 1);
      state = 151;
      match(TOKEN_IDENTIFIER);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  IndirectContext indirect() {
    dynamic _localctx = IndirectContext(context, state);
    enterRule(_localctx, 30, RULE_indirect);
    try {
      enterOuterAlt(_localctx, 1);
      state = 153;
      match(TOKEN_T__4);
      state = 154;
      match(TOKEN_IDENTIFIER);
      state = 155;
      match(TOKEN_T__5);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  IndexedContext indexed() {
    dynamic _localctx = IndexedContext(context, state);
    enterRule(_localctx, 32, RULE_indexed);
    int _la;
    try {
      enterOuterAlt(_localctx, 1);
      state = 157;
      match(TOKEN_IDENTIFIER);
      state = 158;
      match(TOKEN_T__6);
      state = 159;
      _la = tokenStream.LA(1)!;
      if (!(_la == TOKEN_X || _la == TOKEN_Y)) {
      errorHandler.recoverInline(this);
      } else {
        if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
        errorHandler.reportMatch(this);
        consume();
      }
      state = 160;
      match(TOKEN_T__7);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  ValueContext value() {
    dynamic _localctx = ValueContext(context, state);
    enterRule(_localctx, 34, RULE_value);
    try {
      state = 164;
      errorHandler.sync(this);
      switch (tokenStream.LA(1)!) {
      case TOKEN_HEXADECIMAL:
      case TOKEN_BINARY:
      case TOKEN_DECIMAL:
      case TOKEN_NEGATIVE_NUMBER:
      case TOKEN_BRK:
      case TOKEN_NOP:
      case TOKEN_NOP3:
        enterOuterAlt(_localctx, 1);
        state = 162;
        literal();
        break;
      case TOKEN_IDENTIFIER:
        enterOuterAlt(_localctx, 2);
        state = 163;
        constant();
        break;
      default:
        throw NoViableAltException(this);
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  ConstantContext constant() {
    dynamic _localctx = ConstantContext(context, state);
    enterRule(_localctx, 36, RULE_constant);
    try {
      enterOuterAlt(_localctx, 1);
      state = 166;
      match(TOKEN_IDENTIFIER);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  LiteralContext literal() {
    dynamic _localctx = LiteralContext(context, state);
    enterRule(_localctx, 38, RULE_literal);
    try {
      state = 173;
      errorHandler.sync(this);
      switch (tokenStream.LA(1)!) {
      case TOKEN_HEXADECIMAL:
        enterOuterAlt(_localctx, 1);
        state = 168;
        hexadecimal();
        break;
      case TOKEN_DECIMAL:
        enterOuterAlt(_localctx, 2);
        state = 169;
        decimal();
        break;
      case TOKEN_BINARY:
        enterOuterAlt(_localctx, 3);
        state = 170;
        binary();
        break;
      case TOKEN_NEGATIVE_NUMBER:
        enterOuterAlt(_localctx, 4);
        state = 171;
        negative_number();
        break;
      case TOKEN_BRK:
      case TOKEN_NOP:
      case TOKEN_NOP3:
        enterOuterAlt(_localctx, 5);
        state = 172;
        opcode_literal();
        break;
      default:
        throw NoViableAltException(this);
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Opcode_literalContext opcode_literal() {
    dynamic _localctx = Opcode_literalContext(context, state);
    enterRule(_localctx, 40, RULE_opcode_literal);
    int _la;
    try {
      enterOuterAlt(_localctx, 1);
      state = 175;
      _la = tokenStream.LA(1)!;
      if (!(((_la) & ~0x3f) == 0 && ((1 << _la) & 57344) != 0)) {
      errorHandler.recoverInline(this);
      } else {
        if ( tokenStream.LA(1)! == IntStream.EOF ) matchedEOF = true;
        errorHandler.reportMatch(this);
        consume();
      }
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  HexadecimalContext hexadecimal() {
    dynamic _localctx = HexadecimalContext(context, state);
    enterRule(_localctx, 42, RULE_hexadecimal);
    try {
      enterOuterAlt(_localctx, 1);
      state = 177;
      match(TOKEN_HEXADECIMAL);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  DecimalContext decimal() {
    dynamic _localctx = DecimalContext(context, state);
    enterRule(_localctx, 44, RULE_decimal);
    try {
      enterOuterAlt(_localctx, 1);
      state = 179;
      match(TOKEN_DECIMAL);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  BinaryContext binary() {
    dynamic _localctx = BinaryContext(context, state);
    enterRule(_localctx, 46, RULE_binary);
    try {
      enterOuterAlt(_localctx, 1);
      state = 181;
      match(TOKEN_BINARY);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Brk_literalContext brk_literal() {
    dynamic _localctx = Brk_literalContext(context, state);
    enterRule(_localctx, 48, RULE_brk_literal);
    try {
      enterOuterAlt(_localctx, 1);
      state = 183;
      match(TOKEN_BRK);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Nop_literalContext nop_literal() {
    dynamic _localctx = Nop_literalContext(context, state);
    enterRule(_localctx, 50, RULE_nop_literal);
    try {
      enterOuterAlt(_localctx, 1);
      state = 185;
      match(TOKEN_NOP);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Nop3_literalContext nop3_literal() {
    dynamic _localctx = Nop3_literalContext(context, state);
    enterRule(_localctx, 52, RULE_nop3_literal);
    try {
      enterOuterAlt(_localctx, 1);
      state = 187;
      match(TOKEN_NOP3);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  Negative_numberContext negative_number() {
    dynamic _localctx = Negative_numberContext(context, state);
    enterRule(_localctx, 54, RULE_negative_number);
    try {
      enterOuterAlt(_localctx, 1);
      state = 189;
      match(TOKEN_NEGATIVE_NUMBER);
    } on RecognitionException catch (re) {
      _localctx.exception = re;
      errorHandler.reportError(this, re);
      errorHandler.recover(this, re);
    } finally {
      exitRule();
    }
    return _localctx;
  }

  static const List<int> _serializedATN = [
      4,1,59,192,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,
      2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,
      14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,
      2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,
      27,1,0,3,0,58,8,0,1,0,5,0,61,8,0,10,0,12,0,64,9,0,1,0,3,0,67,8,0,1,
      0,1,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,
      85,8,2,3,2,87,8,2,1,3,1,3,3,3,91,8,3,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,
      6,1,6,1,6,1,6,3,6,104,8,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,3,8,114,
      8,8,4,8,116,8,8,11,8,12,8,117,1,9,1,9,1,9,1,9,1,9,3,9,125,8,9,1,10,
      1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,137,8,10,1,11,1,
      11,1,11,1,12,1,12,1,12,3,12,145,8,12,1,13,1,13,1,13,3,13,150,8,13,
      1,14,1,14,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,17,1,17,3,
      17,165,8,17,1,18,1,18,1,19,1,19,1,19,1,19,1,19,3,19,174,8,19,1,20,
      1,20,1,21,1,21,1,22,1,22,1,23,1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,
      27,1,27,1,27,0,0,28,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
      34,36,38,40,42,44,46,48,50,52,54,0,6,1,0,42,43,1,0,44,45,1,0,51,52,
      1,0,38,41,1,0,54,55,1,0,13,15,192,0,62,1,0,0,0,2,70,1,0,0,0,4,86,1,
      0,0,0,6,90,1,0,0,0,8,92,1,0,0,0,10,95,1,0,0,0,12,103,1,0,0,0,14,105,
      1,0,0,0,16,110,1,0,0,0,18,124,1,0,0,0,20,136,1,0,0,0,22,138,1,0,0,
      0,24,141,1,0,0,0,26,149,1,0,0,0,28,151,1,0,0,0,30,153,1,0,0,0,32,157,
      1,0,0,0,34,164,1,0,0,0,36,166,1,0,0,0,38,173,1,0,0,0,40,175,1,0,0,
      0,42,177,1,0,0,0,44,179,1,0,0,0,46,181,1,0,0,0,48,183,1,0,0,0,50,185,
      1,0,0,0,52,187,1,0,0,0,54,189,1,0,0,0,56,58,3,4,2,0,57,56,1,0,0,0,
      57,58,1,0,0,0,58,59,1,0,0,0,59,61,5,59,0,0,60,57,1,0,0,0,61,64,1,0,
      0,0,62,60,1,0,0,0,62,63,1,0,0,0,63,66,1,0,0,0,64,62,1,0,0,0,65,67,
      3,4,2,0,66,65,1,0,0,0,66,67,1,0,0,0,67,68,1,0,0,0,68,69,5,0,0,1,69,
      1,1,0,0,0,70,71,5,57,0,0,71,72,5,1,0,0,72,3,1,0,0,0,73,87,3,8,4,0,
      74,87,3,10,5,0,75,87,3,12,6,0,76,87,3,14,7,0,77,87,3,16,8,0,78,87,
      3,18,9,0,79,87,3,20,10,0,80,87,3,22,11,0,81,87,3,24,12,0,82,84,3,2,
      1,0,83,85,3,4,2,0,84,83,1,0,0,0,84,85,1,0,0,0,85,87,1,0,0,0,86,73,
      1,0,0,0,86,74,1,0,0,0,86,75,1,0,0,0,86,76,1,0,0,0,86,77,1,0,0,0,86,
      78,1,0,0,0,86,79,1,0,0,0,86,80,1,0,0,0,86,81,1,0,0,0,86,82,1,0,0,0,
      87,5,1,0,0,0,88,91,3,44,22,0,89,91,3,42,21,0,90,88,1,0,0,0,90,89,1,
      0,0,0,91,7,1,0,0,0,92,93,5,16,0,0,93,94,3,6,3,0,94,9,1,0,0,0,95,96,
      5,57,0,0,96,97,5,2,0,0,97,98,3,6,3,0,98,11,1,0,0,0,99,100,5,17,0,0,
      100,104,3,34,17,0,101,102,5,17,0,0,102,104,5,18,0,0,103,99,1,0,0,0,
      103,101,1,0,0,0,104,13,1,0,0,0,105,106,5,20,0,0,106,107,5,57,0,0,107,
      108,5,3,0,0,108,109,3,34,17,0,109,15,1,0,0,0,110,115,5,19,0,0,111,
      113,3,34,17,0,112,114,5,4,0,0,113,112,1,0,0,0,113,114,1,0,0,0,114,
      116,1,0,0,0,115,111,1,0,0,0,116,117,1,0,0,0,117,115,1,0,0,0,117,118,
      1,0,0,0,118,17,1,0,0,0,119,120,7,0,0,0,120,121,5,3,0,0,121,125,3,44,
      22,0,122,123,7,1,0,0,123,125,7,2,0,0,124,119,1,0,0,0,124,122,1,0,0,
      0,125,19,1,0,0,0,126,127,5,53,0,0,127,128,5,3,0,0,128,137,5,29,0,0,
      129,130,5,28,0,0,130,137,5,53,0,0,131,132,5,30,0,0,132,133,5,3,0,0,
      133,137,5,29,0,0,134,135,5,28,0,0,135,137,5,30,0,0,136,126,1,0,0,0,
      136,129,1,0,0,0,136,131,1,0,0,0,136,134,1,0,0,0,137,21,1,0,0,0,138,
      139,5,24,0,0,139,140,3,26,13,0,140,23,1,0,0,0,141,144,7,3,0,0,142,
      145,5,53,0,0,143,145,3,26,13,0,144,142,1,0,0,0,144,143,1,0,0,0,145,
      25,1,0,0,0,146,150,3,28,14,0,147,150,3,30,15,0,148,150,3,32,16,0,149,
      146,1,0,0,0,149,147,1,0,0,0,149,148,1,0,0,0,150,27,1,0,0,0,151,152,
      5,57,0,0,152,29,1,0,0,0,153,154,5,5,0,0,154,155,5,57,0,0,155,156,5,
      6,0,0,156,31,1,0,0,0,157,158,5,57,0,0,158,159,5,7,0,0,159,160,7,4,
      0,0,160,161,5,8,0,0,161,33,1,0,0,0,162,165,3,38,19,0,163,165,3,36,
      18,0,164,162,1,0,0,0,164,163,1,0,0,0,165,35,1,0,0,0,166,167,5,57,0,
      0,167,37,1,0,0,0,168,174,3,42,21,0,169,174,3,44,22,0,170,174,3,46,
      23,0,171,174,3,54,27,0,172,174,3,40,20,0,173,168,1,0,0,0,173,169,1,
      0,0,0,173,170,1,0,0,0,173,171,1,0,0,0,173,172,1,0,0,0,174,39,1,0,0,
      0,175,176,7,5,0,0,176,41,1,0,0,0,177,178,5,9,0,0,178,43,1,0,0,0,179,
      180,5,11,0,0,180,45,1,0,0,0,181,182,5,10,0,0,182,47,1,0,0,0,183,184,
      5,13,0,0,184,49,1,0,0,0,185,186,5,14,0,0,186,51,1,0,0,0,187,188,5,
      15,0,0,188,53,1,0,0,0,189,190,5,12,0,0,190,55,1,0,0,0,15,57,62,66,
      84,86,90,103,113,117,124,136,144,149,164,173
  ];

  static final ATN _ATN =
      ATNDeserializer().deserialize(_serializedATN);
}
class ProgramContext extends ParserRuleContext {
  TerminalNode? EOF() => getToken(fassParser.TOKEN_EOF, 0);
  List<TerminalNode> EOLs() => getTokens(fassParser.TOKEN_EOL);
  TerminalNode? EOL(int i) => getToken(fassParser.TOKEN_EOL, i);
  List<StatementContext> statements() => getRuleContexts<StatementContext>();
  StatementContext? statement(int i) => getRuleContext<StatementContext>(i);
  ProgramContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_program;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitProgram(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class LabelContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  LabelContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_label;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitLabel(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class StatementContext extends ParserRuleContext {
  Address_stmtContext? address_stmt() => getRuleContext<Address_stmtContext>(0);
  Remote_label_stmtContext? remote_label_stmt() => getRuleContext<Remote_label_stmtContext>(0);
  Filler_stmtContext? filler_stmt() => getRuleContext<Filler_stmtContext>(0);
  Const_stmtContext? const_stmt() => getRuleContext<Const_stmtContext>(0);
  Data_stmtContext? data_stmt() => getRuleContext<Data_stmtContext>(0);
  Flag_set_stmtContext? flag_set_stmt() => getRuleContext<Flag_set_stmtContext>(0);
  Stack_stmtContext? stack_stmt() => getRuleContext<Stack_stmtContext>(0);
  Goto_stmtContext? goto_stmt() => getRuleContext<Goto_stmtContext>(0);
  Bit_shift_stmtContext? bit_shift_stmt() => getRuleContext<Bit_shift_stmtContext>(0);
  LabelContext? label() => getRuleContext<LabelContext>(0);
  StatementContext? statement() => getRuleContext<StatementContext>(0);
  StatementContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_statement;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitStatement(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class AddressContext extends ParserRuleContext {
  DecimalContext? decimal() => getRuleContext<DecimalContext>(0);
  HexadecimalContext? hexadecimal() => getRuleContext<HexadecimalContext>(0);
  AddressContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_address;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitAddress(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Address_stmtContext extends ParserRuleContext {
  TerminalNode? ADDRESS_KWD() => getToken(fassParser.TOKEN_ADDRESS_KWD, 0);
  AddressContext? address() => getRuleContext<AddressContext>(0);
  Address_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_address_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitAddress_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Remote_label_stmtContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  AddressContext? address() => getRuleContext<AddressContext>(0);
  Remote_label_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_remote_label_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitRemote_label_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Filler_stmtContext extends ParserRuleContext {
  TerminalNode? FILLER_KWD() => getToken(fassParser.TOKEN_FILLER_KWD, 0);
  ValueContext? value() => getRuleContext<ValueContext>(0);
  TerminalNode? DEFAULT_KWD() => getToken(fassParser.TOKEN_DEFAULT_KWD, 0);
  Filler_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_filler_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitFiller_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Const_stmtContext extends ParserRuleContext {
  Token? const_name;
  TerminalNode? CONST_KWD() => getToken(fassParser.TOKEN_CONST_KWD, 0);
  ValueContext? value() => getRuleContext<ValueContext>(0);
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  Const_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_const_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitConst_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Data_stmtContext extends ParserRuleContext {
  ValueContext? _value;
  var datas = <ValueContext>[];
  TerminalNode? DATA_KWD() => getToken(fassParser.TOKEN_DATA_KWD, 0);
  List<ValueContext> values() => getRuleContexts<ValueContext>();
  ValueContext? value(int i) => getRuleContext<ValueContext>(i);
  Data_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_data_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitData_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Flag_set_stmtContext extends ParserRuleContext {
  DecimalContext? one_zero;
  TerminalNode? CARRY() => getToken(fassParser.TOKEN_CARRY, 0);
  TerminalNode? OVERFLOW() => getToken(fassParser.TOKEN_OVERFLOW, 0);
  DecimalContext? decimal() => getRuleContext<DecimalContext>(0);
  TerminalNode? INTERRUPT() => getToken(fassParser.TOKEN_INTERRUPT, 0);
  TerminalNode? DECIMAL_MODE() => getToken(fassParser.TOKEN_DECIMAL_MODE, 0);
  TerminalNode? ON() => getToken(fassParser.TOKEN_ON, 0);
  TerminalNode? OFF() => getToken(fassParser.TOKEN_OFF, 0);
  Flag_set_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_flag_set_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitFlag_set_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Stack_stmtContext extends ParserRuleContext {
  TerminalNode? A() => getToken(fassParser.TOKEN_A, 0);
  TerminalNode? PULL_KWD() => getToken(fassParser.TOKEN_PULL_KWD, 0);
  TerminalNode? PUSH_KWD() => getToken(fassParser.TOKEN_PUSH_KWD, 0);
  TerminalNode? FLAGS_KWD() => getToken(fassParser.TOKEN_FLAGS_KWD, 0);
  Stack_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_stack_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitStack_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Goto_stmtContext extends ParserRuleContext {
  TerminalNode? GOTO_KWD() => getToken(fassParser.TOKEN_GOTO_KWD, 0);
  ReferenceContext? reference() => getRuleContext<ReferenceContext>(0);
  Goto_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_goto_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitGoto_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Bit_shift_stmtContext extends ParserRuleContext {
  TerminalNode? ROL_KWD() => getToken(fassParser.TOKEN_ROL_KWD, 0);
  TerminalNode? ROR_KWD() => getToken(fassParser.TOKEN_ROR_KWD, 0);
  TerminalNode? ASL_KWD() => getToken(fassParser.TOKEN_ASL_KWD, 0);
  TerminalNode? LSR_KWD() => getToken(fassParser.TOKEN_LSR_KWD, 0);
  TerminalNode? A() => getToken(fassParser.TOKEN_A, 0);
  ReferenceContext? reference() => getRuleContext<ReferenceContext>(0);
  Bit_shift_stmtContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_bit_shift_stmt;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitBit_shift_stmt(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class ReferenceContext extends ParserRuleContext {
  DirectContext? direct() => getRuleContext<DirectContext>(0);
  IndirectContext? indirect() => getRuleContext<IndirectContext>(0);
  IndexedContext? indexed() => getRuleContext<IndexedContext>(0);
  ReferenceContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_reference;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitReference(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class DirectContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  DirectContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_direct;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitDirect(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class IndirectContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  IndirectContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_indirect;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitIndirect(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class IndexedContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  TerminalNode? X() => getToken(fassParser.TOKEN_X, 0);
  TerminalNode? Y() => getToken(fassParser.TOKEN_Y, 0);
  IndexedContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_indexed;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitIndexed(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class ValueContext extends ParserRuleContext {
  LiteralContext? literal() => getRuleContext<LiteralContext>(0);
  ConstantContext? constant() => getRuleContext<ConstantContext>(0);
  ValueContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_value;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitValue(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class ConstantContext extends ParserRuleContext {
  TerminalNode? IDENTIFIER() => getToken(fassParser.TOKEN_IDENTIFIER, 0);
  ConstantContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_constant;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitConstant(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class LiteralContext extends ParserRuleContext {
  HexadecimalContext? hexadecimal() => getRuleContext<HexadecimalContext>(0);
  DecimalContext? decimal() => getRuleContext<DecimalContext>(0);
  BinaryContext? binary() => getRuleContext<BinaryContext>(0);
  Negative_numberContext? negative_number() => getRuleContext<Negative_numberContext>(0);
  Opcode_literalContext? opcode_literal() => getRuleContext<Opcode_literalContext>(0);
  LiteralContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_literal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitLiteral(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Opcode_literalContext extends ParserRuleContext {
  TerminalNode? BRK() => getToken(fassParser.TOKEN_BRK, 0);
  TerminalNode? NOP() => getToken(fassParser.TOKEN_NOP, 0);
  TerminalNode? NOP3() => getToken(fassParser.TOKEN_NOP3, 0);
  Opcode_literalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_opcode_literal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitOpcode_literal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class HexadecimalContext extends ParserRuleContext {
  TerminalNode? HEXADECIMAL() => getToken(fassParser.TOKEN_HEXADECIMAL, 0);
  HexadecimalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_hexadecimal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitHexadecimal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class DecimalContext extends ParserRuleContext {
  TerminalNode? DECIMAL() => getToken(fassParser.TOKEN_DECIMAL, 0);
  DecimalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_decimal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitDecimal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class BinaryContext extends ParserRuleContext {
  TerminalNode? BINARY() => getToken(fassParser.TOKEN_BINARY, 0);
  BinaryContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_binary;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitBinary(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Brk_literalContext extends ParserRuleContext {
  TerminalNode? BRK() => getToken(fassParser.TOKEN_BRK, 0);
  Brk_literalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_brk_literal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitBrk_literal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Nop_literalContext extends ParserRuleContext {
  TerminalNode? NOP() => getToken(fassParser.TOKEN_NOP, 0);
  Nop_literalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_nop_literal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitNop_literal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Nop3_literalContext extends ParserRuleContext {
  TerminalNode? NOP3() => getToken(fassParser.TOKEN_NOP3, 0);
  Nop3_literalContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_nop3_literal;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitNop3_literal(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

class Negative_numberContext extends ParserRuleContext {
  TerminalNode? NEGATIVE_NUMBER() => getToken(fassParser.TOKEN_NEGATIVE_NUMBER, 0);
  Negative_numberContext([ParserRuleContext? parent, int? invokingState]) : super(parent, invokingState);
  @override
  int get ruleIndex => RULE_negative_number;
  @override
  T? accept<T>(ParseTreeVisitor<T> visitor) {
    if (visitor is fassVisitor<T>) {
     return visitor.visitNegative_number(this);
    } else {
    	return visitor.visitChildren(this);
    }
  }
}

