const typeDefs = `#graphql
    type Word {
        _id: ID
        word: String
        difficulty: Number
    }

    type Query {
        words(difficulty: Int!): [Word]
    }

    type User {
        _id: ID
        username: String
        email: String
        virtualMoney: Number
        userUpgrades: [userUpgrades]
        userSettings: [userSettings]
    }

    type Auth {
        token: ID
        user: User
    }

    type UserUpgrades {
        _id: ID
        moneyMultiplier: Number
        wordLength: Number
        wordDifficulty: Number
        timeExtender: Number
    }

    type UserSettings {
        _id: ID
        theme: String        
    }
`;

export default typeDefs;
