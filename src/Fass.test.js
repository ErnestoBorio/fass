import { expect, test, describe } from "bun:test";
import Fass, { run } from "./Fass";
import { opcodes } from "./opcodes";

describe("Miscelaneous", () => {
	test("addOutput()", () => {
		const res = new Fass().addOutput([0x69, 0xeb]);
		expect(res.length).toBe(2);
	});
});

describe("Data types", () => {
	test("Decimal", () => {
		const { output } = run("128", "decimal");
		expect(output.value).toBe(128);
	});

	test("Hexadecimal", () => {
		const { output } = run("$ff", "hexadecimal");
		expect(output.value).toBe(255);
	});

	test("Binary", () => {
		const { output } = run("%11101011", "binary");
		expect(output.value).toBe(0xeb);
	});

	test("Negative", () => {
		const { output } = run("-16", "negative_number");
		expect(output.value).toBe(240); // -16 == 240 as unsigned
		expect(() => run("-129", "negative_number")).toThrow();
	});

	test("NOP", () => {
		const { output } = run("NOP", "opcode_literal");
		expect(output.value).toBe(opcodes["NOP"]);
	});

	test("BRK", () => {
		const { output } = run("BRK", "opcode_literal");
		expect(output.value).toBe(opcodes["BRK"]);
	});

	test("NOP3", () => {
		const { output } = run("NOP3", "opcode_literal");
		expect(output.value).toBe(opcodes["NOP3"]);
	});
});

describe("References", () => {
	test("Direct", () => {
		expect(run("@$100", "direct")).toBeTruthy();

		const { output } = run("@$200", "reference");
		expect(output.value).toBe(0x200);
		expect(output.addressing).toBe("ABS");

		const { output: output2 } = run("@$20", "reference");
		expect(output2.value).toBe(0x20);
		expect(output2.addressing).toBe("ZP");
	});

	test("Indirect", () => {
		expect(run("(@$300)", "indirect")).toBeTruthy();
		const { output } = run("(@$400)", "reference");
		expect(output.value).toBe(0x400);
		expect(output.addressing).toBe("IND");
	});

	test("Indexed", () => {
		expect(run("@$500[X]", "indexed")).toBeTruthy();
		expect(run("@$10[Y]", "indexed")).toBeTruthy();

		const { output } = run("@$600[X]", "reference");
		expect(output.value).toBe(0x600);
		expect(output.addressing).toBe("ABSX");

		const { output: output2 } = run("@$EB[Y]", "reference");
		expect(output2.value).toBe(0xeb);
		expect(output2.addressing).toBe("ZPY");
	});

	test("(Indirect)[Y]", () => {
		expect(run("(@$70)[Y]", "indirect_y")).toBeTruthy();
		const { output } = run("(@$80)[Y]", "reference");
		expect(output.value).toBe(0x80);
		expect(output.addressing).toBe("INDY");
	});

	test("(Indexed[X])", () => {
		expect(run("(@$90[X])", "x_indirect")).toBeTruthy();
		const { output } = run("(@$AB[X])", "reference");
		expect(output.value).toBe(0xab);
		expect(output.addressing).toBe("INDX");
	});
});

describe("Assignments", () => {
	test("Reference = register", () => {
		const output = new Uint8Array(run("@$1000 = A").output);
		expect(output.length).toBe(3);
		expect(output[0]).toBe(opcodes["STA"]["ABS"]);
		expect(output[1]).toBe(0);
		expect(output[2]).toBe(0x10);
	});

	test("Register = Giver", () => {
		const output = new Uint8Array(run("X = $EB").output);
		expect(output.length).toBe(2);
		expect(output[0]).toBe(opcodes["LDX"]["IMM"]);
		expect(output[1]).toBe(0xeb);
	});
});

test("Bitmap", () => {
	const { output } = run(`bitmap width 8 height 10
					.......#
					......#.
					.....#..
					....#...
					...#....
					..#.....
					.#......
					#.......
				end`);
	return expect(output).toEqual(
		Buffer.from([1, 2, 4, 8, 16, 32, 64, 128, 0, 0]).buffer
	);
});

test("Address", () => {
	const { fass, output } = run("address $12AB");
	expect(fass.address).toBe(0x12ab);
	expect(output).toEqual(Buffer.from([]).buffer);
});

test("Label", () => {
	const { fass } = run("address $ABBA\nstart: A = @$DC");
	return expect(fass.labels["start"]).toBe(0xabba);
});

test("Remote label", () => {
	const { fass } = run("labello at $C0DE");
	return expect(fass.labels["labello"]).toBe(0xc0de);
});

test("name", () => {
	const source = "pete.soc_oro: A = 1";
	expect(() => run(source)).not.toThrow();

	const { fass } = run(source);
	expect(fass.labels).toContainKey("pete.soc_oro");

	/**
	 * @TODO These don't throw. See how to catch this case
	 *
	 * expect(() => run(".locro: X = $FF")).toThrow();
	 * expect(() => run("loc_.ro: X = $FF")).toThrow();
	 * expect(() => run("locro__: X = $FF")).toThrow();
	 */
});

test("filler", () => {
	const { output } = run(
		"X = $DE \n address 5 \n A = $1\n filler $FF \n address 9 \n Y = $AB"
	);
	const expected = Buffer.from([
		162, 0xde, 0xea, 0xea, 0xea, 169, 1, 0xff, 0xff, 160, 0xab
	]);
	expect(output).toEqual(expected.buffer);
});

test("data", () => {
	const { output } = run(
		"data 1, 256, 65538, $FF, $11CD22EB, %100101, NOP, BRK, NOP3"
	);
	expect(output).toEqual(
		Buffer.from([
			1, 1, 0, 1, 0, 2, 0xff, 0x11, 0xcd, 0x22, 0xeb, 0b100101, 0xea, 0, 4
		]).buffer
	);
});

test("Stack", () => {
	const { output } = run("push A \n pull A \n push flags \n pull flags");
	expect(output).toEqual(Buffer.from([0x48, 0x68, 0x08, 0x28]).buffer);
});

test("goto & gosub", () => {
	const { output } = run("address $ABCD \n sola: goto sola");
	expect(output).toEqual(Buffer.from([0x4c, 0xcd, 0xab]).buffer);

	const { output: output2 } = run("address $C010 \n label: gosub label");
	expect(output2).toEqual(Buffer.from([0x20, 0x10, 0xc0]).buffer);
});

test("returns", () => {
	const { output } = run("return \n retint");
	expect(output).toEqual(Buffer.from([0x60, 0x40]).buffer);
});

test("bit shift", () => {
	const { output } = run(
		"shift> A \n shift< @$FE \n here: rotate> @$ABCD \n rotate< here[X]"
	);
	expect(output).toEqual(
		Buffer.from([0x4a, 0x06, 0xfe, 0x6e, 0xcd, 0xab, 0x36, 0x3]).buffer
	);
});

test("flag set", () => {
	const { output } = run(
		"carry = 1 \n overflow = 0 \n decimal = 1 \n interrupt = 0"
	);
	expect(output).toEqual(Buffer.from([0x38, 0xb8, 0xf8, 0x78]).buffer);
});
