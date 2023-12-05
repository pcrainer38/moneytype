import db from "../config/connection";
import { Word } from "../models";
import wordSeeds from "./wordSeeds.json";
import cleanDB from "./cleanDB";

db.once('open', async () => {
  try {
    await cleanDB('Word', 'words');

    await Word.create(wordSeeds);

    /*
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    */
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('The seeds file is all done!');
  process.exit(0);
});
