import 'dart:io';
import "fass.dart";

void main() async {
  final fass = compile(File("program.fass").readAsStringSync());
  print(fass.address);
}
