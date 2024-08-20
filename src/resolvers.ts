import { db } from './db.js'
export const resolvers = {
    Query: {
        users: () => db.users,
        getPasswordByUsername: (parent, args, context) => db.users.find(user => user.username === args.username).password
    },
}