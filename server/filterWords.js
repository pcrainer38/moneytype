const words = (await Bun.file("./words.txt").text()).split("\n");

const difficulties = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
};

for (let word of words) {
  let difficulty = Math.min(Math.max(1, Math.max(1, word.length - 4)), 10);
  if (difficulty > 10 || difficulty == 0) {
    console.log(word, difficulty);
    continue;
  }
  difficulties[difficulty].push(word);
}

Bun.write("./seeders/wordSeeds.json", JSON.stringify(difficulties, null, 4));
