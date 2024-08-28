import { FastifyPluginAsync } from "fastify"

const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async function (request, reply) {
    return fastify
  })
}

export default dbRoutes;