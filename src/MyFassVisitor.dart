import "fassParser.dart";
import "fassBaseVisitor.dart";
import "package:antlr4/antlr4.dart";
import "opcodes.dart";

class FassError implements Exception {
  late String message;

  FassError(String message, ParserRuleContext ctx) {
    this.message =
        "Line ${ctx.start?.line}:${ctx.start?.charPositionInLine} $message";
  }

  String toString() => message;
}

class UnexpectedError implements Exception {
  factory UnexpectedError(String msg) {
    return Exception("Unexpected Error: $msg") as UnexpectedError;
  }
}

class MyFassVisitor extends fassBaseVisitor<Object> {
  int address = 0;
  final content = <int>[];
  final labels = <String, int>{};

  int output(List<int> data) {
    content.addAll(data);
    address += data.length;
    return data.length;
  }

  setOutput(int address, int output) {
    content[address] = output;
  }

  void visitAddress_stmt(Address_stmtContext ctx) {
    address = visitAddress(ctx.address()!);
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

  void visitData_stmt(Data_stmtContext ctx) {
    for (var data in ctx.datas) {
      output(visitValue(data));
    }
  }

  List<int> visitValue(ValueContext ctx) {
    final chil = visitChildren(ctx);
    return chil as List<int>;
  }

  List<int> visitHexadecimal(HexadecimalContext ctx) {
    final number = int.parse(ctx.text.substring(1), radix: 16);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to \$FF", ctx);
    }
    return [number];
  }

  List<int> visitDecimal(DecimalContext ctx) {
    final number = int.parse(ctx.text);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to 255", ctx);
    }
    return [number];
  }

  List<int> visitBinary(BinaryContext ctx) {
    final value = int.parse(ctx.text.substring(1), radix: 2);
    if (value > 0xFF) {
      throw FassError(
          "Binary number ${ctx.text} should not be greater than 255", ctx);
    }
    return [value];
  }

  List<int> visitNegative_number(Negative_numberContext ctx) {
    final number = int.parse(ctx.text);
    if (number < -128) {
      throw FassError(
          "Negative number $number should be in the range [-128..-1]", ctx);
    }
    return [number + 256];
  }

  List<int> visitOpcode_literal(Opcode_literalContext ctx) {
    if (ctx.NOP() != null) {
      return [NOP];
    } else if (ctx.NOP3() != null) {
      return [NOP3];
    } else if (ctx.BRK() != null) {
      return [BRK];
    }
    throw UnexpectedError("Opcode_literal");
  }

  void visitIf_stmt(If_stmtContext ctx) {
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
    output([opcode, 0]); // 0 is the branch displacement placeholder
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
      output([JMP_ABS, 0, 0]);
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

  void visitLabel(LabelContext ctx) {
    setLabel(ctx.IDENTIFIER()!.text!, address, ctx);
  }

  void visitRemote_label_stmt(Remote_label_stmtContext ctx) {
    final address = visitAddress(ctx.address()!);
    setLabel(ctx.IDENTIFIER()!.text!, address, ctx);
  }

  setLabel(String name, int address, ParserRuleContext ctx) {
    name = name.toLowerCase();
    if (labels.containsKey(name)) {
      throw FassError("Label `$name` has already been defined", ctx);
    }
    labels.addAll({name: address});
  }
}

List<int> littleEndianize(int value) => [
      value & 0xFF,
      (value & 0xFF00) >> 8,
    ];
