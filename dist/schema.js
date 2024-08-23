export const typeDefs = `
    type User {
        id: ID!
        name: String
        auth: Auth
        finance: Finance
        accounts: [Account!]
    }
    type Auth {
        id: ID
        user: User
        username: String
        password: String
    }
    type Finance {
        id: ID
        user: User
        desiredSavingsPercentage: Float
        salary: Float
    }
    type Account {
        id: ID
        user: User
        holding: Float
        interestRate: Float
    }
    type Query {
        users: [User]
    }
`;
