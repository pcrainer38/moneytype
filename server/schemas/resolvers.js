import { User, UserSettings, UserUpgrades, Word } from "../models/index.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {},
    userSettings: async (parent, args, context) => {},
    userUpgrades: async (parent, args, context) => {},    
    words: async (parent, { difficulty }, context, info) => {
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.Word) {
        fields[field] = 1;
      }
      return Word.aggregate([
        {
          $match: {
            difficulty: {
              $lte: difficulty,
            },
          },
        },
        { $project: fields },
        {
          $sample: {
            size: 50,
          },
        },
      ]);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {},
    updateUser: async (parent, args, context) => {},
    login: async (parent, {email, password}) => {},
    updateUserSettings: async (parent, args) => {},
    updateUserUpgrades: async (parent, args) => {},
  }
};

export default resolvers;