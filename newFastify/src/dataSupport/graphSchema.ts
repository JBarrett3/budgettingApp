// TODO split Query into Query and Mutation (right now I can't do mutations as a separate type. Probably a querying issue)
export const graphSchema = `
    type Query {
        users: [User]
        user(userId: ID): User
        auths: [Auth]
        auth(authId: ID): Auth
        finances: [Finance]
        finance(finId: ID): Finance
        accounts: [Account]
        account(accntId: ID): Account
        
        createUserByName(name: String!, username: String, password: String, f01k: Float, salary: Float, pre_tax_income: Float, social_security: Float, medicare_tax: Float, federal_tax: Float, state_tax: Float, discretionary: Float): User
        addAccountByUserId(userId: ID!, holding: Float, interest_rate: Float): Account
        updateAuthByUserId(userId: ID!, username: String, password: String): Auth
        updateFinanceByUserId(userId: ID!, f01k: Float, salary: Float, pre_tax_income: Float, social_security: Float, medicare_tax: Float, federal_tax: Float, state_tax: Float, discretionary: Float): Finance
        updateAccountByAccntId(accntId: ID!, holding: Float, interest_rate: Float): Account
        deleteUserByUserId(userId: ID!): Boolean
        delAccountByAccntId(accntId: ID!): Boolean
    }
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
        interest_rate: Float
    }
`