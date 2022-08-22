import { compile } from "./fass.js";
import FassListener from "./FassListener.js";
import { opcodes as op } from "./opcodes.js";

test("Address and Label", () => {
	expect(compile("address $FAFA \n Mafalda:").labels.get("mafalda")).toEqual(0xfafa);
	expect(() => compile("peto:\n peto:")).toThrow();
});

test("Remote label", () => {
	expect(compile("Batman at $0BA7").labels.get("batman")).toEqual(0xba7);
});

test("Filler", () => {
	const fass = new FassListener();
	const ctx = { value: () => ({ val: 42 }) };
	fass.exitFiller_stmt(ctx);
	expect(fass.filler).toBe(42);
});

test("Const", () => {
	expect(compile("const Bruce = 133").constants.get("bruce")).toEqual(133);
	expect(() => compile("const pete = 1\n const pete = 2")).toThrow();
});

test("Data", () => {
	const result = compile("data 0 1 BRK $FF NOP $ABCD NOP3");
	expect(result.output).toEqual([0, 1, 0, 255, 0xea, 0xab, 0xcd, 4]);
	expect(() => compile("data $10000 65536")).toThrow();
});

test("Flag set", () => {
	expect(compile("carry = 0 \n carry = 1 \n overflow = 0").output).toEqual([
		op.CLC,
		op.SEC,
		op.CLV
	]);
	expect(() => compile("overflow = 1")).toThrow();
	expect(() => compile("carry = 5")).toThrow();
	expect(compile("interrupt on\n decimal off\n interrupt off\n decimal on").output).toEqual([
		op.CLI,
		op.CLD,
		op.SEI,
		op.SED
	]);
});

test("Stack push & pull", () => {
	expect(compile("push a\n push flags\n a = pull\n flags = pull").output).toEqual([
		op.PHA,
		op.PHP,
		op.PLA,
		op.PLP
	]);
});
