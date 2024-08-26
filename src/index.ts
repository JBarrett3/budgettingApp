import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PORT } from './consts.js';
import { typeDefs } from './graphSchema.js';
import { resolvers } from './resolvers.js';
import { setupDB } from './setupDB.js';

await setupDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);