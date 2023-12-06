import { User, UserSettings, UserUpgrades, Word } from "../models/index.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import {
  createToken,
  AuthenticationError,
  AuthenticatedError,
} from "../utils/auth.js";

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("UserSettings")
          .populate("UserUpgrades");

        return user;
      }

      throw AuthenticationError;
    },
    userSettings: async (parent, { userSettingsId }) => {
      try {
        const settings = await UserSettings.findById(userSettingsId);
        return settings;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    userUpgrades: async (parent, { userUpgradesId }) => {
      try {
        const upgrades = await UserUpgrades.findById(userUpgradesId);
        return upgrades;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    words: async (parent, { difficulty, minDifficulty = 1 }, context, info) => {
      // TODO: Determine difficulty based on upgrades, not input
      difficulty = Math.min(10, Math.max(1, difficulty));
      minDifficulty = Math.min(
        Math.min(8, difficulty),
        Math.max(1, minDifficulty)
      );
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
              $gte: minDifficulty,
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
    leaderboard: async (parent, { page }, context, info) => {
      const usersPerPage = 15;
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.PartialUser) {
        fields[field] = 1;
      }
      return User.find({}, fields)
        .sort({ virtualMoney: -1 })
        .limit(usersPerPage)
        .skip(page * usersPerPage);
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      if (context.user) throw AuthenticatedError;
      const user = await User.create(args);
      const token = createToken(user);

      return { token, user };
    },
    updatePassword: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      if (context.user) throw AuthenticatedError;
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = createToken(user);

      return { token, user };
    },
    updateUserSettings: async (parent, args, context) => {
      if (context.user) {
        const updatedSettings = await UserSettings.findOneAndUpdate(
          { user: context.user._id },
          { $set: args },
          { new: true }
        );

        return updatedSettings;
      }

      throw AuthenticationError;
    },
    updateUserUpgrades: async (parent, args) => {
      if (context.user) {
        const updatedUpgrades = await UserUpgrades.findOneAndUpdate(
          { user: context.user._id },
          { $set: args },
          { new: true }
        );

        return updatedUpgrades;
      }

      throw AuthenticationError;
    },
  },
};

export default resolvers;
