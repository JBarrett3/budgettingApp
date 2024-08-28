import fp from 'fastify-plugin'
import { URI, DB_USER, DB_PASSWORD, DB_ENV } from '../consts.js'
import mongoose from 'mongoose'
import {User, Auth, Finance, Account, userSchema, authSchema, financeSchema, accountSchema} from '../dataSupport/mongoSchema.js'

export default fp(async (fastify) => {
    const dbURL: string = URI(DB_USER, DB_PASSWORD)
    const mongooseConn = await mongoose.createConnection(dbURL, {
        dbName: DB_ENV
    });
    fastify.decorate('database', {
        user: mongooseConn.model('user', userSchema),
        auth: mongooseConn.model('auth', authSchema),
        finance: mongooseConn.model('finance', financeSchema),
        account: mongooseConn.model('account', accountSchema)
    })
})

declare module 'fastify' {
  export interface FastifyInstance {
    database: {
        user: mongoose.Model<User>,
        auth: mongoose.Model<Auth>,
        finance: mongoose.Model<Finance>,
        account: mongoose.Model<Account>
    }
  }
}
