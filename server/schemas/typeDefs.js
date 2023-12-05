const typeDefs = `#graphql
    type Word {
        _id: ID
        word: String
        difficulty: Int
    }

    type Query {
        words(difficulty: Int!): [Word]
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