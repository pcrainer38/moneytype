// RUN THIS WITH NODE USING
// node wordsNodeGenerateTextFile.cjs <option> 
//
// option: (replace with only the number)
// 1 - Update the words.txt to be alphabetized by line.
// 2 - Regenerate the wordsSeeds.json file.
// 3 



const fs = require('node:fs');

// Read from the "words.txt" file. Makes into a temp array by newline char
try {
    const wordsFile = fs.readFileSync('words.txt', 'utf8');
    unsortedWordsFile = wordsFile.split("\n");
} catch (err) {
    console.error(err);
}

// Write to the "words.txt" file with sorted by line
try {
    fs.writeFileSync('words.txt', [...unsortedWordsFile].sort().join("\n"));
} catch (err) {
    console.error(err);
}

// Read from the new "words.txt" file. Makes into a temp array by newline char
try {
    const sortedWordsFile = fs.readFileSync('words.txt', 'utf8');
    sortedWords = sortedWordsFile.split("\n");

    difficulties = {
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

      for (let word of sortedWords) {
        let difficulty = Math.min( Math.max(1, word.length - 4) , 10 );
        if (difficulty > 10 || difficulty == 0) {
          console.log(word, difficulty);
          continue;
        }
        difficulties[difficulty].push(word);
      }

} catch (err) {
    console.error(err);
}

// Write to the "./seeders/wordSeeds.json" file with formatted JSON
try {
    fs.writeFileSync('./seeders/wordSeeds.json', JSON.stringify(difficulties, null, 4));
} catch (err) {
    console.error(err);
}


