import { expect, test, describe } from "bun:test";
import Fass, { comparse } from "./Fass";
import { opcodes } from "./opcodes";

describe("Miscelaneous", () => {
	test("addOutput()", () => {
		const fass = new Fass();
		const res = fass.addOutput([0x69, 0xeb]);
		expect(res.length).toBe(2);
	});
});

describe("Data types", () => {
	test("Decimal", () => {
		const res = comparse("128", "decimal");
		expect(res.value).toBe(128);
	});

	test("Hexadecimal", () => {
		const res = comparse("$ff", "hexadecimal");
		expect(res.value).toBe(255);
	});

	test("Binary", () => {
		const res = comparse("%11101011", "binary");
		expect(res.value).toBe(0xeb);
	});

	test("Negative", () => {
		const res = comparse("-16", "negative_number");
		expect(res.value).toBe(240); // -16 == 240 as unsigned
	});

	test("NOP", () => {
		const res = comparse("NOP", "opcode_literal");
		expect(res.value).toBe(opcodes["NOP"]);
	});

	test("BRK", () => {
		const res = comparse("BRK", "opcode_literal");
		expect(res.value).toBe(opcodes["BRK"]);
	});

	test("NOP3", () => {
		const res = comparse("NOP3", "opcode_literal");
		expect(res.value).toBe(opcodes["NOP3"]);
	});
});

describe("References", () => {
	test("Direct", () => {
		expect(comparse("@$100", "direct")).toBeTruthy();

		let res = comparse("@$200", "reference");
		expect(res.value).toBe(0x200);
		expect(res.addressing).toBe("ABS");

		res = comparse("@$20", "reference");
		expect(res.value).toBe(0x20);
		expect(res.addressing).toBe("ZP");
	});

	test("Indirect", () => {
		expect(comparse("(@$300)", "indirect")).toBeTruthy();
		const res = comparse("(@$400)", "reference");
		expect(res.value).toBe(0x400);
		expect(res.addressing).toBe("IND");
	});

	test("Indexed", () => {
		expect(comparse("@$500[X]", "indexed")).toBeTruthy();
		expect(comparse("@$10[Y]", "indexed")).toBeTruthy();

		let res = comparse("@$600[X]", "reference");
		expect(res.value).toBe(0x600);
		expect(res.addressing).toBe("ABSX");

		res = comparse("@$EB[Y]", "reference");
		expect(res.value).toBe(0xeb);
		expect(res.addressing).toBe("ZPY");
	});

	test("(Indirect)[Y]", () => {
		expect(comparse("(@$70)[Y]", "indirect_y")).toBeTruthy();
		const res = comparse("(@$80)[Y]", "reference");
		expect(res.value).toBe(0x80);
		expect(res.addressing).toBe("INDY");
	});

	test("(Indexed[X])", () => {
		expect(comparse("(@$90[X])", "x_indirect")).toBeTruthy();
		const res = comparse("(@$AB[X])", "reference");
		expect(res.value).toBe(0xab);
		expect(res.addressing).toBe("INDX");
	});
});

describe("Assignments", () => {
	test("Reference = register", () => {
		const output = new Uint8Array(comparse("@$1000 = A", "program"));
		expect(output.length).toBe(3);
		expect(output[0]).toBe(opcodes["STA"]["ABS"]);
		expect(output[1]).toBe(0);
		expect(output[2]).toBe(0x10);
	});

	test("Register = Giver", () => {
		const output = new Uint8Array(comparse("X = $EB", "program"));
		expect(output.length).toBe(2);
		expect(output[0]).toBe(opcodes["LDX"]["IMM"]);
		expect(output[1]).toBe(0xeb);
	});
});
