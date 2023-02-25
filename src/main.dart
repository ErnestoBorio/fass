import 'dart:io';
import "fass.dart";

main() async {
  final fass = compile(File("program.fass").readAsStringSync());
  final labels = fass.labels.map((key, address) {
    return MapEntry(key, "\$${address.toRadixString(16)}");
  });

  print("bin size: \$${fass.output.length.toRadixString(16)}\n"
      "labels: $labels\n"
      "const: ${fass.constants} \n");

  await File("output.bin").writeAsBytes(fass.output);
}
