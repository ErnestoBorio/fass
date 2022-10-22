import "package:test/test.dart";
import "fass.dart";

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
}
