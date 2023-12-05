import "dotenv/config";
import db from "../config/connection.js";
import { Word } from "../models/index.js";
import wordSeeds from "./wordSeeds.json" assert { type: "json" };
import cleanDB from "./cleanDB.js";

db.once("open", async () => {
  try {
    await cleanDB("Word", "words");

    for (let key in wordSeeds) {
      await Word.create(
        wordSeeds[key].map((word) => ({ word, difficulty: key }))
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("The seeds file is all done!");
  process.exit(0);
});
