import { runFass } from "./fass";
import { opcodes as op } from "./opcodes";

test("Data", () => {
	let result = runFass("address 0 \n data 1 BRK $FF NOP $ABCD NOP3 0");
	expect(result.output).toEqual([op.CLC]);
});
