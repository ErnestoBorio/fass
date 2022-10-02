// ignore: file_names
import "fassBaseVisitor.dart";
import 'fassParser.dart';
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

  @override
  void visitAddress_stmt(Address_stmtContext ctx) {
    var address = this.visitAddress(ctx.address()!);
    if (address is String) {
      throw FassError("Invalid address: $address", ctx.address()!);
    } else if (address is int) {
      this.address = address;
    } else {
      throw FassError("Unknown error", ctx);
    }
  }

  @override
  Object visitAddress(AddressContext ctx) {
    String? address = ctx.decimal()?.DECIMAL()?.symbol.text;
    if (address != null) {
      return int.parse(address);
    } else {
      address = ctx.hexadecimal()?.HEXADECIMAL()?.symbol.text;
      if (address != null) {
        return int.parse(address.substring(1), radix: 16);
      }
    }

    /// return the text of the address that couldn't be parsed
    return (ctx.children?[0].text)!;
  }
}
