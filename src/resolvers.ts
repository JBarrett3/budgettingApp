import { db } from './db.js'
export const resolvers = {
    Query: {
        books: () => db.books,
    },
}