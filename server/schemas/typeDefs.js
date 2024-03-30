const typeDefs = `#graphql
    type Word {
        _id: ID
        word: String
        difficulty: Int
    }

    type Query {
        user: User
        userSettings: UserSettings
        userUpgrades: UserUpgrades
        virtualMoney: Int
        words(difficulty: Int!): [Word]
        leaderboard(page: Int): [PartialUser]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): ID
        updatePassword(password: String!): User
        login(email: String!, password: String!): ID
        updateUserSettings(theme: String, sound: Boolean): UserSettings
        updateUserUpgrades(moneyMultiplier: Int, wordLength: Int, wordDifficulty: Int, timeExtender: Int): UserUpgrades
        addMoney(money: Int!): Int
    }

    type User {
        _id: ID
        username: String
        email: String
        virtualMoney: Int
        userUpgrades: UserUpgrades
        userSettings: UserSettings
    }

    type PartialUser {
        _id: ID
        username: String
        virtualMoney: Int
    }

    type Auth {
        token: ID
        user: User
    }

    type UserUpgrades {
        _id: ID
        moneyMultiplier: Int
        wordLength: Int
        wordDifficulty: Int
        timeExtender: Int
    }

    type UserSettings {
        _id: ID
        theme: String
        sound: Boolean
    }
`;

export default typeDefs;
