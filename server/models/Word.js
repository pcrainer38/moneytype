import { Schema, model } from "mongoose";

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
});

const Word = model("Word", wordSchema);

export default Word;
