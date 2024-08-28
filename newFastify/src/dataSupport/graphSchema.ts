export const graphSchema = `
    type Query {
        add(x: Int, y: Int): Int
    }
`
//     type Query {
//         users: [User]
//         user(userId: ID!): User
//     }
//     type User {
//         id: ID
//         name: String
//         auth: Auth
//         finance: Finance
//         accounts: [Account]
//     }
//     type Auth {
//         id: ID
//         user: User
//         username: String
//         password: String
//     }
//     type Finance {
//         id: ID
//         user: User
//         f01k: Float
//         salary: Float
//         pre_tax_income: Float
//         social_security: Float
//         medicare_tax: Float
//         federal_tax: Float
//         state_tax: Float
//         discretionary: Float
//     }
//     type Account {
//         id: ID
//         user: User
//         holding: Float
//         interest_rate: Float
//     }
//     type Mutation {
//         createUserByName(name: String!, username: String, password: String, f01k: Float, salary: Float, pre_tax_income: Float, social_security: Float, medicare_tax: Float, federal_tax: Float, state_tax: Float, discretionary: Float): ID
//         deleteUserByUserID(userId: ID!): Boolean
//         updateAuthByUserID(userId: ID!, username: String, password: String): Auth
//         updateFinanceByUserID(userId: ID!, f01k: Float, salary: Float, pre_tax_income: Float, social_security: Float, medicare_tax: Float, federal_tax: Float, state_tax: Float, discretionary: Float): Finance
//         addAccountByUserID(userId: ID!, holding: Float, interest_rate: Float): Account
//         delAccountByAccntID(accntID: ID!): Boolean
//     }
// `