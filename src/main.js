import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import parseArgv from "minimist";
import { compile, run } from "./Fass";

const argv = parseArgv(process.argv.slice(2));
const source = readFileSync(argv["_"][0]).toString();
const parser = compile(source);
const output = run(parser);

if (argv["o"]) {
	writeFileSync(argv["o"], output);
} else {
	process.stdout.write(output);
}
