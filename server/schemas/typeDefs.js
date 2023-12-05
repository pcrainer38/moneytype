const typeDefs = `#graphql
    type Word {
        _id: ID
        word: String
        difficulty: Int
    }

    type Query {
        word(difficulty: Int!): [Word]
    }
`;

export default typeDefs;
