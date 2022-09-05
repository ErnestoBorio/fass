import { compile } from "./fass.js";
import FassListener from "./FassListener.js";
import { opcodes as op } from "./opcodes.js";

test("Address and Label", () => {
	const fass = compile("address $1000 \n Mafalda: data 1 2 3\n Manolito:");
	expect(fass.labels.get("mafalda")).toEqual(0x1000);
	expect(fass.labels.get("manolito")).toEqual(0x1003);
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
	const fass = compile("data 0 1 BRK $FF NOP $ABCD NOP3");
	expect(fass.output).toEqual([0, 1, 0, 255, 0xea, 0xab, 0xcd, 4]);
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

test("Goto (JMP)", () => {
	expect(compile("address $ABCD\n there: goto there\n goto (there)").output).toEqual([
		op.JMP.ABS,
		0xcd,
		0xab,
		op.JMP.IND,
		0xcd,
		0xab
	]);
	expect(() => compile("goto nowhere")).toThrow();
});

test("Bitwise Shift & Rotation", () => {
	const fass = compile(
		`address $10
		zeropage:
		rotate> zeropage
		shift< zeropage[x]

		address $ABCD
		absolute:
		rotate< absolute[x]
		shift> absolute`
	);
	console.log(fass.output);
	expect(fass.output).toEqual([
		op.ROR.ZP,
		0x10,
		op.ASL.ZPX,
		0x10,
		op.ROL.ABSX,
		0xcd,
		0xab,
		op.LSR.ABS,
		0xcd,
		0xab
	]);
});
