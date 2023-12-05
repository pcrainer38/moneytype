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
        words(difficulty: Int!): [Word]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(email: String, password: String): User
        login(email: String!, password: String!): Auth
        updateUserSettings(theme: String): UserSettings
        updateUserUpgrades(moneyMultiplier: Int, wordLength: Int, wordDifficulty: Int, timeExtender: Int): UserUpgrades
    }

    type User {
        _id: ID
        username: String
        email: String
        virtualMoney: Int
        UserUpgrades: UserUpgrades
        UserSettings: UserSettings
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
    }
`;

export default typeDefs;
