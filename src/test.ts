import { InputStream, CharStream, CommonTokenStream } from "antlr4";
import Fass from "./Fass";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";
import { Slice } from "./types";
import { opcodes } from "./opcodes";

function compile(source: string) {
	const fass = new Fass();
	const chars = new InputStream(source);
	const stream = new CharStream(chars.toString());
	const lexer = new fassLexer(stream);
	const tokens = new CommonTokenStream(lexer);
	const parser = new fassParser(tokens);
	const tree = parser.program();
	fass.visit(tree);
	return fass;
}

function failed(name: string) {
	console.error(`❌ [${name}] failed`);
}

function passed(name: string) {
	console.log(`✅ [${name}] passed`);
}

function test1(name: string) {
	if (!tests[name!]()) {
		failed(name);
		return;
	}
	passed(name);
}

function test_all(stop_on_fail: boolean = false) {
	for (const name in tests) {
		const test = tests[name];
		const result = test();

		if (result !== true) {
			failed(name);

			if (typeof result !== "boolean") {
				console.error(result);
			}

			if (stop_on_fail) {
				console.log(`Stopped on first test failed`);
				return;
			}
			continue;
		}
		passed(name);
	}
}

function expect(got: any, expected: any) {
	let condition = false;
	if (
		got instanceof Buffer &&
		expected instanceof Buffer &&
		got.equals(expected)
	) {
		condition = true;
	} else if (got === expected) {
		condition = true;
	}

	if (!condition) {
		return { got, expected };
	}
	return true;
}

//------------------------------------------------------------------------------ Tests
const tests = {
	slice: () => {
		const s = new Slice(Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 0, 4);
		s.append(Buffer.from([20, 21, 22, 23]));
		const bufferCondition = s
			.getBuffer()
			.equals(Buffer.from([0, 1, 2, 3, 20, 21, 22, 23, 8, 9]));
		const sliceCondition = s
			.get()
			.equals(Buffer.from([0, 1, 2, 3, 20, 21, 22, 23]));
		return bufferCondition && sliceCondition;
	},

	address: () => {
		return compile("address $BEBA").address === 0xbeba;
	},

	data: () => {
		return compile("data 1 2 $ABC").output.getLength() === 4;
	},

	label: () => {
		const fass = compile("data 1 2 3 \n labelix: data 4 5 6");
		return fass.labels["labelix"] === 3;
	},

	"remote-label": () => {
		return expect(compile("etiquette at $FAFA").labels["etiquette"], 0xfafa);
	},

	filler: () => {
		return expect(
			compile("address 2 \n filler $BB \n data 1 \n address 5").output.get(),
			Buffer.from([1, 0xbb, 0xbb])
		);
	},

	const: () => {
		return expect(compile("const tango = 215").constants["tango"], 215);
	},

	flags: () => {
		return expect(
			compile(
				"carry = 0 \n carry = 1 \n overflow = 0 \n interrupt = 1 \n\
					interrupt = 0 \n decimal = 1 \n decimal = 0"
			).output.get(),
			Buffer.from([
				opcodes["CLC"],
				opcodes["SEC"],
				opcodes["CLV"],
				opcodes["SEI"],
				opcodes["CLI"],
				opcodes["SED"],
				opcodes["CLD"]
			])
		);
	},
	stack: () => {
		return expect(
			compile("pull A \n push A \n pull flags \n push flags").output.get(),
			Buffer.from([
				opcodes["PLA"],
				opcodes["PHA"],
				opcodes["PLP"],
				opcodes["PHP"]
			])
		);
	}
};

//------------------------------------------------------------------------------
(function main() {
	if (process.argv[2]) {
		if (["--list", "-l"].includes(process.argv[2])) {
			let test_names = "";
			for (const name of Object.keys(tests)) {
				test_names += `${name}, `;
			}
			test_names = test_names.slice(0, -2);
			console.log(`Tests: ${test_names}`);
			return;
		}
		test1(process.argv[2]);
		return;
	}
	test_all();
})();
