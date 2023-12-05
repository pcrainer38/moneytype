import { User, UserSettings, UserUpgrades, Word } from "../models/index.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import { createToken, AuthenticationError } from "../utils/auth.js";

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id)
          .populate('UserSettings')
          .populate('UserUpgrades');
  
          return user;
        }
  
        throw AuthenticationError;
    },
    userSettings: async (parent, args, context) => {
        try {
            const settings = await UserSettings.findOne({user: context.user._id});
            return settings;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    },
    userUpgrades: async (parent, args, context) => { 
        try {
            const upgrades = await UserUpgrades.findOne({user: context.user._id});
            return upgrades;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    },
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
    leaderboard: async (parent, {page}, context, info) => {
      const ast = parseResolveInfo(info);
      const fields = {};
      for (const field in ast.fieldsByTypeName.PartialUser) {
        fields[field] = 1;
      }
      return User.find({}, fields).sort({virtualMoney: -1}).limit(25).skip(page * 25);
    }
  },
  
  Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = createToken(user);
  
        return { token, user };
    },
    updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(
            context.user._id, 
            args, 
            { new: true });
        }
  
        throw AuthenticationError;
    },
    login: async (parent, {email, password}) => {
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
                {user: context.user._id},
                {$set: args},
                {new: true}
            );

            return updatedSettings;
        }

        throw AuthenticationError;
    },
    updateUserUpgrades: async (parent, args) => {
        if (context.user) {
            const updatedUpgrades = await UserUpgrades.findOneAndUpdate(
                {user: context.user._id},
                {$set: args},
                {new: true}
            );

            return updatedUpgrades;
        }

        throw AuthenticationError;
    },
  }
};

export default resolvers;