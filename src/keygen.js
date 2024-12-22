if (process.argv.length < 3) {
	console.log(`Usage:\n$ keygen keyword_1 .. keyword_n`);
	process.exit();
}

const keywords = process.argv.slice(2);
for (const keyword of keywords) {
	let letters = ``;
	for (const letter of keyword) {
		if (/[a-zA-Z]/u.test(letter)) {
			letters += `[` + letter.toLowerCase() + letter.toUpperCase() + `]`;
		} else {
			letters += `'${letter}'`;
		}
	}
	console.log(keyword.toUpperCase() + `: ${letters};`);
}
