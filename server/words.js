const words = (await Bun.file("./words.txt").text()).split("\n");
const wordsSet = new Set(words);

Bun.write("./words.txt", [...wordsSet].sort().join("\n"));
