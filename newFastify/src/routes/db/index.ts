import { FastifyPluginAsync } from "fastify"

const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async function (req, res) {
    res.send(await fastify.database.user.find({})).status(200)
  })
  fastify.get('/auths', async function (req, res) {
    res.send(await fastify.database.auth.find({})).status(200)
  })
  fastify.get('/finances', async function (req, res) {
    res.send(await fastify.database.finance.find({})).status(200)
  })
  fastify.get('/accounts', async function (req, res) {
    res.send(await fastify.database.account.find({})).status(200)
  })
}

export default dbRoutes;