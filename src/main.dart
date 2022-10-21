import 'dart:io';
import "fass.dart";

main() {
  final fass = compile(File("program.fass").readAsStringSync());
  print(fass.content);
}
