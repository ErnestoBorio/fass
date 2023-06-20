import "opcodes.dart";
import "fassParser.dart";
import "fassBaseVisitor.dart";
import "package:antlr4/antlr4.dart";

class FassError implements Exception {
  late String message;

  FassError(String message, [ParserRuleContext? ctx]) {
    if (ctx != null) {
      this.message =
          "Line ${ctx.start!.line!}:${ctx.start!.charPositionInLine} $message";
    } else {
      this.message = message;
    }
  }

  String toString() => message;
}

class UnexpectedError implements Exception {
  factory UnexpectedError([String msg = ""]) {
    if (msg != "") {
      msg = ": $msg";
    }
    msg = "Unexpected Error$msg";
    return Exception(msg) as UnexpectedError;
  }
}

class MyFassVisitor extends fassBaseVisitor {
  int address = 0;
  final output = <int>[];
  final labels = <String, int>{};
  final constants = <String, int>{};
  static const defaultFiller = NOP;
  int filler = defaultFiller;

  addOutput(List<int> data) {
    output.addAll(data);
    address += data.length;
  }

  setOutput(int address, int data) {
    if (address > output.length) {
      throw UnexpectedError("Trying to modify a byte out of bounds");
    }
    output[address] = data;
  }

  setLabel(String name, int address) {
    if (labels.containsKey(name.toLowerCase())) {
      throw Exception("Label `$name` has already been defined");
    }
    labels.addAll({name.toLowerCase(): address});
  }

  /// Gets label value or thows if label doesn't exist
  int getLabel(String name) {
    if (!labels.containsKey(name.toLowerCase())) {
      throw Exception("Label `$name` hasn't been defined");
    }
    return labels[name.toLowerCase()]!;
  }

  setConst(String name, int value) {
    if (constants.containsKey(name.toLowerCase())) {
      throw Exception("Constant `$name` has already been defined");
    }
    constants.addAll({name.toLowerCase(): value});
  }

  setAddress(int newAddress) {
    if (newAddress < address) {
      throw Exception(
          "Can't set new address $newAddress lower than current address $address, that could overlap output");
    }
    if (newAddress - address > 0) {
      fill(address, newAddress - 1);
    }
    address = newAddress;
  }

  fill(int startAddress, int endAddress, {int? filler}) {
    filler ??= this.filler;
    assert(filler >= 0 && filler <= 0xFF);

    if (startAddress != address) {
      throw FassError(
          "Can't start filling other than on current address $address");
    }
    if (output.length != startAddress) {
      throw UnexpectedError(
          "Binary content length and current address don't match");
    }
    for (var i = startAddress; i <= endAddress; i++) {
      output.add(filler);
    }
  }

  String getAddressing(ReferenceContext ctx) {
    if (ctx.direct() != null) {
      final label = ctx.direct()!.IDENTIFIER()!.text!.toLowerCase();
      return getLabel(label) <= 255 ? "ZP" : "ABS";
    } else if (ctx.indexed() != null) {
      final label = ctx.indexed()!.IDENTIFIER()!.text!.toLowerCase();
      final addressing = getLabel(label) <= 255 ? "ZP" : "ABS";
      return addressing + (ctx.indexed()!.X() != null ? "X" : "Y");
    }
    return ctx.x_indirect() != null ? "INDX" : "INDY";
  }

  int getLabelFromRef(ReferenceContext ctx) {
    if (ctx.direct() != null) {
      return getLabel(ctx.direct()!.IDENTIFIER()!.text!.toLowerCase());
    } else if (ctx.indexed() != null) {
      return getLabel(ctx.indexed()!.IDENTIFIER()!.text!.toLowerCase());
    } else if (ctx.indirect_y() != null) {
      return getLabel(ctx.indirect_y()!.IDENTIFIER()!.text!.toLowerCase());
    }
    return getLabel(ctx.x_indirect()!.IDENTIFIER()!.text!.toLowerCase());
  }

  visitAddress_stmt(Address_stmtContext ctx) {
    final newAddress = visitAddress(ctx.address()!);
    try {
      setAddress(newAddress);
    } catch (exp) {
      throw FassError(exp.toString(), ctx);
    }
  }

  int visitAddress(AddressContext ctx) {
    String address = ctx.text;
    if (ctx.decimal() != null) {
      return int.parse(address);
    } else if (ctx.hexadecimal() != null) {
      return int.parse(address.substring(1), radix: 16);
    }
    throw FassError("Invalid address: $address", ctx);
  }

  visitData_stmt(Data_stmtContext ctx) {
    for (var data in ctx.datas) {
      addOutput([visitValue(data)]);
    }
  }

  int visitHexadecimal(HexadecimalContext ctx) {
    final number = int.parse(ctx.text.substring(1), radix: 16);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to \$FF", ctx);
    }
    return number;
  }

  int visitDecimal(DecimalContext ctx) {
    final number = int.parse(ctx.text);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to 255", ctx);
    }
    return number;
  }

  int visitBinary(BinaryContext ctx) {
    final value = int.parse(ctx.text.substring(1), radix: 2);
    if (value > 0xFF) {
      throw FassError(
          "Binary number ${ctx.text} should not be greater than 255", ctx);
    }
    return value;
  }

  int visitNegative_number(Negative_numberContext ctx) {
    final number = int.parse(ctx.text);
    if (number < -128) {
      throw FassError(
          "Negative number $number should be in the range [-128..-1]", ctx);
    }
    return number + 256;
  }

  int visitOpcode_literal(Opcode_literalContext ctx) {
    if (ctx.NOP() != null) {
      return NOP;
    } else if (ctx.NOP3() != null) {
      return NOP3;
    } else if (ctx.BRK() != null) {
      return BRK;
    }
    throw UnexpectedError("Opcode_literal");
  }

  visitIf_stmt(If_stmtContext ctx) {
    final condition = ctx.if_part()!.condition()!;
    int opcode;
    final NOT = (condition.NOT() != null);

    if (condition.ZERO() != null || condition.EQUAL() != null) {
      opcode = NOT ? BEQ : BNE;
    } else if (condition.CARRY() != null) {
      opcode = NOT ? BCS : BCC;
    } else if (condition.OVERFLOW() != null) {
      opcode = NOT ? BVS : BVC;
    } else if (condition.POSITIVE() != null) {
      opcode = BMI; // `Not positive` is ruled out by the grammar
    } else if (condition.NEGATIVE() != null) {
      opcode = BPL; // `Not negative` is ruled out by the grammar
    } else {
      throw UnexpectedError("visitIf_stmt/condition");
    }
    addOutput([opcode, 0]); // 0 is the branch displacement placeholder
    final branchAddress = address - 1;

    // How long can the branch jump to the else or end, minus the 3 bytes for the JMP instruction
    const thenLimit = 124;

    final branchOrigin = address; // Origin of relative branching address
    final thenLines = ctx.then_part()!.lines();
    int bytesOutputted = 0;
    for (LineContext line in thenLines) {
      visitStatement(line.statement()!);
      bytesOutputted = address - branchOrigin;
      if (bytesOutputted > thenLimit) {
        throw FassError(
            "Statements in the `then` part of the `if` occupy more bytes than the current limit of $thenLimit",
            ctx);
        // TODO: Implement an additional JMP if the then part is longer than 124 bytes
      }
    }

    final elsePart = ctx.else_part() != null;

    // overwrite the placeholder with the correct address
    setOutput(branchAddress, bytesOutputted + (elsePart ? 3 : 0));

    if (elsePart) {
      // Placeholder jmp address
      addOutput([JMP_ABS, 0, 0]);
      final jumpAddress = address - 2;
      final elseLines = ctx.else_part()!.lines();
      for (LineContext line in elseLines) {
        visitStatement(line.statement()!);
      }

      final lowHigh = littleEndianize(address);
      setOutput(jumpAddress, lowHigh[0]);
      setOutput(jumpAddress + 1, lowHigh[1]);
    }
  }

  visitLabel(LabelContext ctx) {
    try {
      setLabel(ctx.IDENTIFIER()!.text!, address);
    } on Exception catch (err) {
      throw FassError(err.toString(), ctx);
    }
  }

  visitRemote_label_stmt(Remote_label_stmtContext ctx) {
    final address = visitAddress(ctx.address()!);
    try {
      setLabel(ctx.IDENTIFIER()!.text!, address);
    } on Exception catch (err) {
      throw FassError(err.toString(), ctx);
    }
  }

  visitFiller_stmt(Filler_stmtContext ctx) {
    if (ctx.DEFAULT_KWD() != null) {
      filler = defaultFiller;
    } else {
      filler = visitValue(ctx.value()!);
    }
  }

  visitConst_stmt(Const_stmtContext ctx) {
    try {
      setConst(ctx.IDENTIFIER()!.text!, visitValue(ctx.value()!));
    } on Exception catch (err) {
      throw FassError(err.toString(), ctx);
    }
  }

  visitFlag_set_stmt(Flag_set_stmtContext ctx) {
    if (ctx.CARRY() != null) {
      if (ctx.decimal()!.text == "0") {
        addOutput([CLC]);
      } else if (ctx.decimal()!.text == "1") {
        addOutput([SEC]);
      } else {
        throw FassError("carry can only be set to 0 or 1", ctx);
      }
    } else if (ctx.OVERFLOW() != null) {
      if (ctx.decimal()!.text == "0") {
        addOutput([CLV]);
      } else {
        throw FassError("overflow can only be set to 0", ctx);
      }
    } else if (ctx.INTERRUPT() != null) {
      addOutput([ctx.ON() != null ? CLI : SEI]);
    } else if (ctx.DECIMAL_MODE() != null) {
      addOutput([ctx.ON() != null ? SED : CLD]);
    }
  }

  visitStack_stmt(Stack_stmtContext ctx) {
    if (ctx.A() != null) {
      if (ctx.PULL_KWD() != null) {
        addOutput([PLA]);
      } else if (ctx.PUSH_KWD() != null) {
        addOutput([PHA]);
      }
    } else if (ctx.FLAGS_KWD() != null) {
      if (ctx.PULL_KWD() != null) {
        addOutput([PLP]);
      } else if (ctx.PUSH_KWD() != null) {
        addOutput([PHP]);
      }
    }
  }

  visitGotosub_stmt(Gotosub_stmtContext ctx) {
    final int opcode;
    final String identifier;
    final keyword = ctx.keyword!.text!.toLowerCase();

    if (ctx.direct() != null) {
      opcode = (keyword == "goto" ? JMP_ABS : JSR_ABS);
      identifier = ctx.direct()!.IDENTIFIER()!.text!.toLowerCase();
    } else {
      if (keyword == "gosub") {
        throw FassError(
            "${ctx.keyword!.text} only accepts direct addressing", ctx);
      }
      opcode = JMP_IND;
      identifier = ctx.indirect()!.IDENTIFIER()!.text!.toLowerCase();
    }

    final address = getLabel(identifier);
    addOutput([opcode, ...littleEndianize(address, true)]);
  }

  visitReturn_stmt(Return_stmtContext ctx) {
    addOutput([ctx.RETURN_KWD() != null ? RTS : RTI]);
  }

  visitBit_shift_stmt(Bit_shift_stmtContext ctx) {
    final mnemonic = ctx.ASL_KWD() != null
        ? "ASL"
        : ctx.LSR_KWD() != null
            ? "LSR"
            : ctx.ROL_KWD() != null
                ? "ROL"
                : "ROR";
    if (ctx.A() != null) {
      addOutput([opcodes[mnemonic]!["ACC"]!]);
      return;
    }
    final addressing = getAddressing(ctx.reference()!);
    addOutput([
      opcodes[mnemonic]![addressing]!,
      ...littleEndianize(getLabelFromRef(ctx.reference()!), true)
    ]);
  }

  visitLogic_stmt(Logic_stmtContext ctx) {
    final operation = ctx.AND_KWD() != null
        ? "AND"
        : ctx.OR_KWD() != null
            ? "ORA"
            : ctx.XOR_KWD() != null
                ? "EOR"
                : ctx.COMPARE_KWD() != null
                    ? "CMP"
                    : "BIT";

    String addressing;
    List<int> operands;

    if (ctx.literal() != null) {
      addressing = "IMM";
      operands = [visitLiteral(ctx.literal()!)];
    } else {
      (operands, addressing) = visitReference(ctx.reference()!);
    }
    addOutput([opcodes[operation]![addressing]!, ...operands]);
  }

  (List<int>, String) visitReference(ReferenceContext ctx) {
    final (address, addressing) = visitChildren(ctx);
    return (littleEndianize(address), addressing);
  }

  (int, String) visitDirect(DirectContext ctx) {
    final address = getLabel(ctx.IDENTIFIER()!.text!.toLowerCase());
    return (address, address <= 0xFF ? "ZP" : "ABS");
  }

  (int, String) visitIndexed(IndexedContext ctx) {
    final address = getLabel(ctx.IDENTIFIER()!.text!.toLowerCase());
    final addressing = address <= 0xFF ? "ZP" : "ABS";
    if (ctx.X() != null) {
      return (address, "${addressing}X");
    }
    return (address, "${addressing}Y");
  }

  (int, String) visitIndirect_y(Indirect_yContext ctx) {
    final address = getLabel(ctx.IDENTIFIER()!.text!.toLowerCase());
    return (address, "INDY");
  }

  (int, String) visitX_indirect(X_indirectContext ctx) {
    final address = getLabel(ctx.IDENTIFIER()!.text!.toLowerCase());
    return (address, "INDX");
  }
}

List<int> littleEndianize(int value, [bool forceWord = false]) {
  if (value <= 255 && !forceWord) {
    return [value];
  }
  return [
    value & 0xFF,
    (value & 0xFF00) >> 8,
  ];
}
