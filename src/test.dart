import "package:test/test.dart";
import "fass.dart";

void main() {
  test("Address", () {
    expect(compile("address \$BEBA").address, 0xBEBA);
    expect(compile("address \$BABB \n data 1 2 3").address, 0xBABE);
    expect(() => compile("address -1"), throwsException);
  });
}
