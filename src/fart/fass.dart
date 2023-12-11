import "fassLexer.dart";
import "fassParser.dart";
import "MyFassVisitor.dart";
import "package:antlr4/antlr4.dart";

class FassErrorListener extends BaseErrorListener {
  @override
  void syntaxError(
    Recognizer<ATNSimulator> recognizer,
    Object? offendingSymbol,
    int? line,
    int charPositionInLine,
    String msg,
    RecognitionException? e,
  ) {
    final symbol = (offendingSymbol as CommonToken).text;
    throw Exception(
        "Parsing error at line $line:$charPositionInLine. Erroneous symbol: $symbol. «$msg»");
  }
}

MyFassVisitor compile(String code) {
  fassLexer lexer = fassLexer(InputStream.fromString(code));
  lexer.removeErrorListeners();
  lexer.addErrorListener(FassErrorListener());

  CommonTokenStream tokens = CommonTokenStream(lexer);
  fassParser parser = fassParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(FassErrorListener());

  ParseTree tree = parser.program();
  var fass = MyFassVisitor();
  fass.visit(tree);
  return fass;
}
