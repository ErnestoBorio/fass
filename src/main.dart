import "fassLexer.dart";
import "fassParser.dart";
import "MyFassVisitor.dart";
import 'package:antlr4/antlr4.dart';

main() {
  fassLexer lexer = fassLexer(InputStream.fromString("address \$8000"));
  CommonTokenStream tokens = CommonTokenStream(lexer);
  fassParser parser = fassParser(tokens);
  ParseTree tree = parser.program();
  var fass = MyFassVisitor();
  fass.visit(tree);
  print(fass.address);
}
