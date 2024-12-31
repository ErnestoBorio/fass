import { writeFile, readFile } from "fs/promises";
import parseArgv from "minimist";
import { run } from "./Fass";

const argv = parseArgv(process.argv.slice(2));
const source = (await readFile(argv["_"][0])).toString();
const { output } = run(source);

if (argv["o"]) {
	writeFile(argv["o"], output);
} else {
	process.stdout.write(output);
}
