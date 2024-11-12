import { expect, test, describe } from "bun:test";
import Fass, { compile } from "./Fass";
import IndirectContext from "./parser/fassParser";

const parse = tree => new Fass().visit(tree);

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
});

describe("References", () => {
	test("Direct", () => {
		expect(compile("@$100").direct()).toBeTruthy();
		const res = parse(compile("@$200").reference());
		expect(res.value).toBe(0x200);
		expect(res.addressing).toBe("absolute");
	});

	test("Indirect", () => {
		expect(compile("(@$300)").indirect()).toBeTruthy();
		const res = parse(compile("(@$400)").reference());
		expect(res.value).toBe(0x400);
		expect(res.addressing).toBe("indirect");
	});

	test("Indexed", () => {
		expect(compile("@$500[X]").indexed()).toBeTruthy();
		expect(compile("@$0[Y]").indexed()).toBeTruthy();

		let res = parse(compile("@$600[X]").reference());
		expect(res.value).toBe(0x600);
		expect(res.addressing).toBe("absolute, X");

		res = parse(compile("@$EB[Y]").reference());
		expect(res.value).toBe(0xeb);
		expect(res.addressing).toBe("zero page, Y");
	});

	test("(Indirect)[Y]", () => {
		expect(compile("(@$700)[Y]").indirect_y()).toBeTruthy();
		const res = parse(compile("(@$800)[Y]").reference());
		expect(res.value).toBe(0x800);
		expect(res.addressing).toBe("indirect indexed Y");
	});

	test("(Indexed[X])", () => {
		expect(compile("(@$900[X])").x_indirect()).toBeTruthy();
		const res = parse(compile("(@$A00[X])").reference());
		expect(res.value).toBe(0xa00);
		expect(res.addressing).toBe("indexed indirect X");
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
