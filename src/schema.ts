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
        f01k: Number
        salary: Number
	pre_tax_income: Number
	social_security: Number
	medicare_tax: Number
	federal_tax: Number
	state_tax: Number
	discretionary: Number
	
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
`
