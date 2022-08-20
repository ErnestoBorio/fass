import fs from "fs";
import { runFass } from "./fass.js";

if (!process.argv[2]) {
	throw new Error("Please specify input file, reading from stdin not implemented yet");
}
const input = fs.readFileSync(process.argv[2], "utf8");
var result = runFass(input);
console.log("constants", result.constants);
console.log("labels", result.labels);
console.log(
	"output",
	result.output.map(it => it.toString(16).toUpperCase().padStart(2, "0"))
);
