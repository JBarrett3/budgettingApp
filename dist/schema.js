export const typeDefs = `
    type User {
        id: ID
        name: String
        auth: Auth
        finance: Finance
        accounts: [Account]
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
        f01k: Float
        salary: Float
	pre_tax_income: Float
	social_security: Float
	medicare_tax: Float
	federal_tax: Float
	state_tax: Float
	discretionary: Float
	
    }
    type Account {
        id: ID
        user: User
        holding: Float
        interestRate: Float
    }
    type Query {
        users: [User]
        user(userId: ID!): User
    }
    type Mutation {
        createUserByName(name: String!): ID
        deleteUserByUserID(userId: ID!): Boolean
        updateAuthByUserID(userId: ID!, username: String!, password: String!): Auth
        updateFinanceByUserID(userId: ID!, desiredSavingsPercentage: Float!, salary: Float!): Finance
        addAccountByUserID(userId: ID!, holding: Float!, interestRate: Float!): Account
        delAccountByAccntID(accntID: ID!): Boolean
    }
`;
