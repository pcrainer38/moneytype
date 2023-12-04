import { Word } from "../models/index.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";

const resolvers = {
  Query: {
    words: async (parent, { difficulty }, context, info) => {
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.Word) {
        fields[field] = 1;
      }
      return Word.find(
        {
          difficulty: {
            $lte: difficulty,
          },
        },
        fields
      ).limit(50);
    },
  },
};

export default resolvers;
