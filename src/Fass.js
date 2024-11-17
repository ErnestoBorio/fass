import nearley from "nearley";
import grammar from "./fassGrammar";

/*
const compiled = nearley.Grammar.fromCompiled(grammar);
const parser = new nearley.Parser(compiled, { keepHistory: true });
parser.feed("$D020");

const ast = parser.results[0];
console.log(JSON.stringify(ast, null, 2));

import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import parseArgv from "minimist";
---
const argv = parseArgv(process.argv.slice(2));
const source = readFileSync(argv["_"][0]).toString();
const parser = compile(source);
new Fass().visit(parser.program());

if (argv["o"]) {
	writeFileSync(argv["o"], fass.output);
} else {
	process.stdout.write(fass.output);
}
//*/

class FassParser {}

export class FassCompiler {
	/**
	 * Compiles the Fass grammar and returns it
	 * @returns {Grammar}
	 */
	compile() {
		return nearley.Grammar.fromCompiled(grammar);
	}

	/**
	 * Creates a parser for the given Fass grammar
	 * @param {Grammar} compiled
	 * @returns {Parser}
	 */
	parser(compiled) {
		return new nearley.Parser(compiled, { keepHistory: true });
	}

	/**
	 * Parses the given source code
	 * @param {string | Buffer} source
	 */
	run(source) {
		if (typeof source === "object") {
			source = source.toString();
		}
	}
}
