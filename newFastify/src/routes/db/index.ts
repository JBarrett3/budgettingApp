import { FastifyPluginAsync } from "fastify"

// TODO allow the user to send the request. This is tricky since the type interface with typescvript is a bit of a pain
const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (req, res) => {
    return res.graphql('{ users() }')
  });
  /*
  With graphQL, we only use the one route, but any query can hit the resolvers in the graphSetup.ts file
  Leaving a few examples here:
  '{ createUserByName(name: "john") }'
  '{ createUserByName(name: "john", username: "johnnyBoy", password: "superSafePass") }'
  '{ users() }' //this actually doesn't work yet but will eventually
  '{ users(id: "66cfab15ae08d4983eaf6000") }' //this actually doesn't work yet but will eventually
  */
}



export default dbRoutes;