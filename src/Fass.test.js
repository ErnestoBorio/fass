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
		expect(compile("@$300").direct()).toBeTruthy();
		const res = parse(compile("@$400").reference());
		expect(res.value).toBe(0x400);
		expect(res.addressing).toBe("absolute");
	});

	test("Indirect", () => {
		expect(compile("(@$700)").indirect()).toBeTruthy();
		const res = parse(compile("(@$800)").reference());
		expect(res.value).toBe(0x800);
		expect(res.addressing).toBe("indirect");
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
