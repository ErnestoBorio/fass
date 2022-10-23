import 'dart:io';
import "fass.dart";

main() {
  compile(File("program.fass").readAsStringSync());
}
