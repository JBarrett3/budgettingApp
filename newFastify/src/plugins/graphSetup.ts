import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { graphSchema } from '../dataSupport/graphSchema'
import { graphResolvers } from '../dataSupport/graphResolvers'

export default fp(async (fastify) => {
    fastify.register(mercurius, {
        schema: graphSchema,
        resolvers: graphResolvers
    })
  })
  