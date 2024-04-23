import { InputStream, CharStream, CommonTokenStream } from "antlr4";
import Fass from "./Fass";
import fassLexer from "./parser/fassLexer";
import fassParser from "./parser/fassParser";

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
		if (!tests[name]()) {
			failed(name);
			if (stop_on_fail) {
				console.log(`Stopped on first test failed`);
				return;
			}
			continue;
		}
		passed(name);
	}
}

const tests = {
	address: () => {
		return compile("address $BEBA").address === 0xbeba;
	},

	data: () => {
		const fass = compile("data 1 2 3");
		const pete = fass.output.getLength();
		return pete === 3;
	}
};

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
