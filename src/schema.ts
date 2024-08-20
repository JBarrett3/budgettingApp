export const typeDefs = `#grapql
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`