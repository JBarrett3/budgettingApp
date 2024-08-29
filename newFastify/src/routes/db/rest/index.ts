import { FastifyPluginAsync } from "fastify"

// TODO implement some rest queries using graphQL, so that you can use 'db/graphQL' to interact with graphQL OR 'db/rest' to interact with traditional rest
const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (req, res) => {
    return res.graphql('')
  });
}



export default dbRoutes;