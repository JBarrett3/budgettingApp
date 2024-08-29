import { FastifyPluginAsync } from "fastify"

// TODO allow the user to send the request. This is tricky since the type interface with typescvript is a bit of a pain
const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/graphQL', async (req, res) => {
    return res.graphql('{ users { name, auth { username } } }')
  });
  /*
  With graphQL, we only use the one route, but any query can hit the resolvers in the graphSetup.ts file
  Leaving a few examples here:
  '{ users { name } }' //note that parenthesis are omitted if there are no args at all
  '{ users { name, auth { username } } }' //TODO note that this doesn't work right now since the inroutes are not set up
  '{ user(userId: "66cfb10d5967e545f2caaf8b") { name } }'
  '{ createUserByName(name: "john") }'
  '{ createUserByName(name: "john", username: "johnnyBoy", password: "superSafePass") }'
  '{ deleteUserByUserID(userId: "66cfb10d5967e545f2caaf8b" }' //you'll need to update this to an existing userId to really test
  '{ updateAuthByUserID(userId: "66cfb10d5967e545f2caaf8b", username: "newUsernameTest", password: "newPassTest") { username, password } }'
  '{ updateFinanceByUserID(userId: "66cfb10d5967e545f2caaf8b", f01k: 500) { f01k, salary } }'
  '{ addAccountByUserID(userId: "66cfb10d5967e545f2caaf8b", holding: 500, interest_rate: 0.01) { holding } }'
  '{ delAccountByAccntID(accntID: "66d06b54826546376d5fedb4") }'
  */
}



export default dbRoutes;