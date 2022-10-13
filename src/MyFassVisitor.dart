// ignore: file_names
import 'fassParser.dart';
import "fassBaseVisitor.dart";
import 'package:antlr4/antlr4.dart';

class FassError implements Exception {
  late String message;

  FassError(String message, ParserRuleContext ctx) {
    this.message =
        "Line ${ctx.start?.line}:${ctx.start?.charPositionInLine} ${message}";
  }

  @override
  String toString() => this.message;
}

class MyFassVisitor extends fassBaseVisitor<Object> {
  int address = 0;
  final content = <int>[];
  final labels = Map<String, int>();
  static const NOP = 0xea;
  static const NOP3 = 4;
  static const BRK = 0;

  void output(List<int> data) {
    content.addAll(data);
    address += data.length;
  }

  @override
  void visitAddress_stmt(Address_stmtContext ctx) {
    var address = this.visitAddress(ctx.address()!);
    if (address is String) {
      throw FassError("Invalid address: $address", ctx.address()!);
    } else if (address is int) {
      this.address = address;
    } else {
      throw Exception("Address_stmt");
    }
  }

  @override
  Object visitAddress(AddressContext ctx) {
    String address = ctx.text;
    if (ctx.decimal() != null) {
      return int.parse(address);
    } else if (ctx.hexadecimal() != null) {
      return int.parse(address.substring(1), radix: 16);
    }

    /// Else return the text of the address that couldn't be parsed
    return address;
  }

  @override
  void visitData_stmt(Data_stmtContext ctx) {
    for (var data in ctx.datas) {
      output(visitValue(data));
    }
  }

  @override
  List<int> visitValue(ValueContext ctx) {
    final chil = visitChildren(ctx);
    return chil as List<int>;
  }

  @override
  List<int> visitHexadecimal(HexadecimalContext ctx) {
    final number = int.parse(ctx.text.substring(1), radix: 16);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to \$FF", ctx);
    }
    return [number];
  }

  @override
  List<int> visitDecimal(DecimalContext ctx) {
    final number = int.parse(ctx.text);
    if (number > 0xFFFF) {
      throw FassError(
          "Value ${ctx.text} should be 8 bits, I.E. up to 255", ctx);
    }
    return [number];
  }

  @override
  List<int> visitBinary(BinaryContext ctx) {
    final value = int.parse(ctx.text.substring(1), radix: 2);
    if (value > 0xFF) {
      throw FassError(
          "Binary number ${ctx.text} should not be greater than 255", ctx);
    }
    return [value];
  }

  @override
  List<int> visitNegative_number(Negative_numberContext ctx) {
    final number = int.parse(ctx.text);
    if (number < -128) {
      throw FassError(
          "Negative number $number should be in the range [-128..-1]", ctx);
    }
    return [number + 256];
  }

  @override
  List<int> visitOpcode_literal(Opcode_literalContext ctx) {
    if (ctx.NOP() != null) {
      return [NOP];
    } else if (ctx.NOP3() != null) {
      return [NOP3];
    } else if (ctx.BRK() != null) {
      return [BRK];
    }
    throw Exception("Opcode_literal");
  }
}
