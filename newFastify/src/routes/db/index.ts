import { FastifyPluginAsync } from "fastify"

const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  /* these are techically supported, but we use graphQL as middleware, so we do not access the mongo database like this directly */
  // fastify.get('/users', async function (req, res) {
  //   res.send(await fastify.database.user.find({})).status(200)
  // })
  // fastify.get('/auths', async function (req, res) {
  //   res.send(await fastify.database.auth.find({})).status(200)
  // })
  // fastify.get('/finances', async function (req, res) {
  //   res.send(await fastify.database.finance.find({})).status(200)
  // })
  // fastify.get('/accounts', async function (req, res) {
  //   res.send(await fastify.database.account.find({})).status(200)
  // })
  fastify.get('/', async function (req, reply) {
    const query = '{ add(x: 2, y: 2) }'
    return reply.graphql(query)
  })
}

export default dbRoutes;