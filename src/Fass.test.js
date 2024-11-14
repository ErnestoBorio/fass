import { expect, test, describe } from "bun:test";
import Fass, { compile } from "./Fass";
import { opcodes } from "./opcodes";

const parse = tree => new Fass().visit(tree);

describe("Miscelaneous", () => {
	test("addOutput()", () => {
		const fass = new Fass();
		const res = fass.addOutput([0x69, 0xeb]);
		expect(res.length).toBe(2);
	});
});

describe("Data types", () => {
	test("Decimal", () => {
		const tree = compile("128").decimal();
		const res = parse(tree);
		expect(res.value).toBe(128);
	});

	test("Hexadecimal", () => {
		const tree = compile("$ff").hexadecimal();
		const res = parse(tree);
		expect(res.value).toBe(255);
	});

	test("Binary", () => {
		const tree = compile("%11101011").binary();
		const res = parse(tree);
		expect(res.value).toBe(0xeb);
	});

	test("Negative", () => {
		const tree = compile("-16").negative_number();
		const res = parse(tree);
		expect(res.value).toBe(240); // -16 == 240 as unsigned
	});

	test("NOP", () => {
		const tree = compile("NOP").opcode_literal();
		const res = parse(tree);
		expect(res.value).toBe(opcodes["NOP"]);
	});

	test("BRK", () => {
		const tree = compile("BRK").opcode_literal();
		const res = parse(tree);
		expect(res.value).toBe(opcodes["BRK"]);
	});

	test("NOP3", () => {
		const tree = compile("NOP3").opcode_literal();
		const res = parse(tree);
		expect(res.value).toBe(opcodes["NOP3"]);
	});
});

describe("References", () => {
	test("Direct", () => {
		expect(compile("@$100").direct()).toBeTruthy();
		const res = parse(compile("@$200").reference());
		expect(res.value).toBe(0x200);
		expect(res.addressing).toBe("ABS");
	});

	test("Indirect", () => {
		expect(compile("(@$300)").indirect()).toBeTruthy();
		const res = parse(compile("(@$400)").reference());
		expect(res.value).toBe(0x400);
		expect(res.addressing).toBe("IND");
	});

	test("Indexed", () => {
		expect(compile("@$500[X]").indexed()).toBeTruthy();
		expect(compile("@$0[Y]").indexed()).toBeTruthy();

		let res = parse(compile("@$600[X]").reference());
		expect(res.value).toBe(0x600);
		expect(res.addressing).toBe("ABSX");

		res = parse(compile("@$EB[Y]").reference());
		expect(res.value).toBe(0xeb);
		expect(res.addressing).toBe("ZPY");
	});

	test("(Indirect)[Y]", () => {
		expect(compile("(@$700)[Y]").indirect_y()).toBeTruthy();
		const res = parse(compile("(@$800)[Y]").reference());
		expect(res.value).toBe(0x800);
		expect(res.addressing).toBe("INDY");
	});

	test("(Indexed[X])", () => {
		expect(compile("(@$900[X])").x_indirect()).toBeTruthy();
		const res = parse(compile("(@$A00[X])").reference());
		expect(res.value).toBe(0xa00);
		expect(res.addressing).toBe("INDX");
	});
});

describe("Assignments", () => {
	test("Reference = register", () => {
		const tree = compile("@$1000 = A").ref_assign_stmt();
		const fass = new Fass();
		let output;
		fass.addOutput = data => (output = data);
		fass.visit(tree);
		expect(output).toBeArrayOfSize(3);
		expect(output[0]).toBe(opcodes["STA"]["ABS"]);
		expect(output[1]).toBe(0);
		expect(output[2]).toBe(0x10);
	});

	test.skip("Register = RHS", () => {
		const tree = compile("X = $EB").reg_assign_stmt();
		const fass = new Fass();
		fass.visit(tree);
		expect(fass.output).toBeArrayOfSize(3);
		expect(fass.output[0]).toBe(opcodes["LDX"]["IMM"]);
		expect(fass.output[1]).toBe(0xeb);
		expect(fass.output[2]).toBe(0x11);
	});
});

/*
test("", () => {
	const tree = compile("").();
	const res = parse(tree);
	expect(1).toBe(1);
});
*/

// test("Literal Reference", () => {
// 	const parser = compile("@$400");
// 	const tree = parser.literal_ref();
// });
