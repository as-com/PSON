import {ProgressivePair} from "../src/PSON/ProgressivePair";
import {isEqual} from "lodash";

// import {Encoder} from "../src/PSON/Encoder";
const OldPson = require("pson");

const packageJson = require("../package.json");

for (let j = 0; j < 3; j++) {
	const pson = new ProgressivePair([], {});

	console.time("package.json");
	for (let i = 0; i < 20000; i++) {
		pson.encode(packageJson);
	}
	console.timeEnd("package.json");
	//
	// const encoder = new Encoder([], true, {});
	// console.time("direct package.json");
	// for (let i = 0; i < 20000; i++) {
	//     encoder.encode(packageJson);
	// }
	// console.timeEnd("direct package.json");
	//
	const oldPson = new OldPson.ProgressivePair([]);
	console.time("old package.json");
	for (let i = 0; i < 20000; i++) {
		oldPson.encode(packageJson);
	}
	console.timeEnd("old package.json");
}

console.log("end");
const pson = new ProgressivePair([], {});
const oldPson = new OldPson.ProgressivePair([]);
const newEnc = pson.toBuffer(packageJson);
const oldDec = pson.decode(newEnc);
console.log("Roundtrip", isEqual(packageJson, oldDec));

// Round trip test

