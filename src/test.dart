import "package:test/test.dart";
import "fass.dart";
import 'opcodes.dart';

void main() {
  test("Address", () {
    expect(compile("address \$BEBA").address, 0xBEBA);
    expect(compile("address \$BABB \n data 1 2 3").address, 0xBABE);
    expect(() => compile("address -1"), throwsException);
  });

  test("Label", () {
    expect(compile("address 99 \n aLabel:").labels["alabel"], 99);
    expect(compile("soto: address 55").labels["soto"], 0);
  });

  test("Remote label", () {
    expect(compile("soTo at \$FAFE").labels["soto"], 0xFAFE);
  });

  test("Filler", () {
    expect(compile("filler default \n filler \$BA").filler, 0xBA);
  });

  test("Const", () {
    expect(compile("const tango = 215").constants["tango"], 215);
  });

  test("Flags set & reset", () {
    const code = "carry = 0 \n carry = 1 \n overflow = 0 \n"
        "interrupt on \n interrupt off \n decimal on \n decimal off";
    expect(compile(code).output, [CLC, SEC, CLV, CLI, SEI, SED, CLD]);
  });

  test("Stack", () {
    expect(compile("pull A \n push A \n pull flags \n push flags").output,
        [PLA, PHA, PLP, PHP]);
  });

  test("Goto", () {
    expect(compile("address \$ABCD \n label: \n goto label").output,
        [JMP_ABS, 0xCD, 0xAB]);
  });
}
