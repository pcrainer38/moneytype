import { User, UserSettings, UserUpgrades, Word } from "../models/index.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import {
  createToken,
  AuthenticationError,
  AuthenticatedError,
} from "../utils/auth.js";
import { getUpgradeCost } from "../utils/gameLogic.js";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("userSettings")
          .populate("userUpgrades");

        return user;
      }

      throw AuthenticationError;
    },
    userSettings: async (parent, args, context, info) => {
      if (!context.user) throw AuthenticationError;
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.UserSettings) {
        fields[field] = 1;
      }
      try {
        const settings = await UserSettings.findById(
          context.user.userSettings,
          fields
        );
        return settings;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    userUpgrades: async (parent, args, context, info) => {
      if (!context.user) throw AuthenticationError;
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.UserUpgrades) {
        fields[field] = 1;
      }
      try {
        const upgrades = await UserUpgrades.findById(
          context.user.userUpgrades,
          fields
        );
        return upgrades;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    virtualMoney: async (parent, args, context) => {
      if (!context.user) throw AuthenticationError;
      try {
        const user = await User.findById(context.user._id, {
          virtualMoney: 1,
        });
        return user.virtualMoney;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    words: async (parent, { difficulty }, context, info) => {
      if (context.user) {
        const upgrades = await UserUpgrades.findById(context.user.userUpgrades);
        difficulty = upgrades.wordDifficulty;
      }

      let minDifficulty = difficulty - 5;
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
    addUser: async (parent, args, context) => {
      if (context.user) throw AuthenticatedError;
      const user = await User.create(args);
      const upgrades = await UserUpgrades.create({});
      const settings = await UserSettings.create({});
      user.userUpgrades = upgrades._id;
      user.userSettings = settings._id;
      user.save();
      const token = createToken(user);

      return token;
    },
    updatePassword: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }, context) => {
      if (context.user) throw AuthenticatedError;
      const user = await User.findOne(
        { email },
        {
          _id: 1,
          username: 1,
          password: 1,
          email: 1,
          userUpgrades: 1,
          userSettings: 1,
        }
      );
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = createToken(user);

      return token;
    },
    updateUserSettings: async (parent, args, context) => {
      if (context.user) {
        if (args.theme) {
          if (!["dark", "light"].includes(args.theme)) args.theme = "dark";
        }
        const updatedSettings = await UserSettings.findOneAndUpdate(
          { _id: context.user.userSettings },
          { $set: args },
          { new: true }
        );

        return updatedSettings;
      }

      throw AuthenticationError;
    },
    updateUserUpgrades: async (parent, args, context) => {
      if (context.user) {
        const upgrades = await UserUpgrades.findById(context.user.userUpgrades);
        const user = await User.findById(context.user._id, { virtualMoney: 1 });
        for (let upgrade in args) {
          const cost = getUpgradeCost(upgrade, upgrades[upgrade]);
          if (user.virtualMoney < cost)
            throw new GraphQLError("Not enough money to upgrade.", {
              extensions: {
                code: "UPGRADE_FAILED",
              },
            });
          user.virtualMoney -= cost;
          upgrades[upgrade]++;
        }
        await upgrades.save();
        await user.save();

        return upgrades;
      }

      throw AuthenticationError;
    },
    addMoney: async (parent, { money }, context) => {
      if (!context.user) throw AuthenticationError;
      if (money < 1)
        throw new GraphQLError("Invalid money amount.", {
          extensions: {
            code: "INVALID_MONEY_AMOUNT",
          },
        });
      const user = await User.findByIdAndUpdate(
        context.user._id,
        {
          $inc: { virtualMoney: money },
        },
        {
          new: true,
          fields: {
            virtualMoney: 1,
          },
        }
      );
      return user.virtualMoney;
    },
  },
};

export default resolvers;
