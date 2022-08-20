import { runFass } from "./fass";
import FassListener from "./FassListener";
import { opcodes as op } from "./opcodes";

test("Address and Label", () => {
	let result = runFass("address $FAFA \n Mafalda:");
	expect(result.labels.get("mafalda")).toEqual(0xfafa);
});

test("Remote label", () => {
	let result = runFass("Batman at $0BA7");
	console.log(result);
	expect(result.labels.get("batman")).toEqual(0xba7);
});

test("Filler", () => {
	const fass = new FassListener();
	const ctx = { value: () => ({ val: 42 }) };
	fass.exitFiller_stmt(ctx);
	expect(fass.filler).toBe(42);
});

test("Const", () => {
	let result = runFass("const Bruce = 133");
	expect(result.constants.get("bruce")).toEqual(133);
});

test("Data", () => {
	let result = runFass("data 0 1 BRK $FF NOP $ABCD NOP3");
	expect(result.output).toEqual([0, 1, 0, 255, 0xea, 0xab, 0xcd, 4]);
});
