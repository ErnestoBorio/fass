import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import parseArgv from "minimist";
import Fass, { compile } from "./Fass";

const argv = parseArgv(process.argv.slice(2));
const source = readFileSync(argv["_"][0]).toString();
const parser = compile(source);
new Fass().visit(parser.program());

if (argv["o"]) {
	writeFileSync(argv["o"], fass.output);
} else {
	process.stdout.write(fass.output);
}
