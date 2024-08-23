import { db } from './db.js'
export const resolvers = {
    Query: {
        users: () => db.users
    },
    User: {
        auth(parent, args, context) {
            return db.auths.find((auth) => auth.userId === parent.id)
        },
        finance(parent, args, context) {
            return db.finances.find((fin) => fin.userId === parent.id)
        },
        accounts(parent, args, context) {
            return db.accounts.filter((accnt) => accnt.userId === parent.id)
        }
    },
    Auth: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId)
        }
    },
    Finance: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId)
        }
    },
    Account: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId)
        }
    }
}