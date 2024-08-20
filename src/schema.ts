export const typeDefs = `
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        desiredSavingsPercentage: Float
        salary: Float
    }
    type Query {
        users: [User]
        getPasswordByUsername(username: String): String
    }
`