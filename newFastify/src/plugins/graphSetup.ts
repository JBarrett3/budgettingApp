import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { graphSchema } from '../dataSupport/graphSchema'
import { DEFAULTS } from '../consts'
import { User, Auth, Account, Finance } from '../dataSupport/mongoSchema'
import { ObjectId } from '@fastify/mongodb'
import { FastifyBaseLogger, FastifyInstance, FastifyTypeProviderDefault, RawServerDefault } from 'fastify'
import mongoose from 'mongoose'
import { IncomingMessage, ServerResponse } from 'http'

//arg interfaces
interface allQueryArgs {}
interface userArgs {
    userId: string
}
interface authArgs {
    authId: string
}
interface finArgs {
    finId: string
}
interface AccntArgs {
    accntId: string
}
interface newUserArgs {
    name: string,
    username?: string,
    password?: string,
    f01k?: number,
    salary?: number,
    pre_tax_income?: number,
    social_security?: number,
    medicare_tax?: number,
    federal_tax?: number,
    state_tax?: number,
    discretionary?: number
}
interface deleteUserByUserIdArgs {
    userId: string
}
interface updateAuthByUserIdArgs {
    userId: string,
    username?: string, 
    password?: string
}
interface updateFinanceByUserIdArgs {
    userId: string, 
    f01k?: number, 
    salary?: number, 
    pre_tax_income?: number, 
    social_security?: number, 
    medicare_tax?: number, 
    federal_tax?: number, 
    state_tax?: number, 
    discretionary?: number
}
interface updateAccountByAccntIdArgs {
    accntId: string, 
    holding: number,
    interest_rate: number
}
interface addAccountByUserIdArgs {
    userId: string, 
    holding?: number, 
    interest_rate?: number
}
interface delAccountByAccntIdArgs {
    accntId: string
}

interface fastifyWithDB extends FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProviderDefault> {
    database: {
        user: mongoose.Model<User>,
        auth: mongoose.Model<Auth>,
        finance: mongoose.Model<Finance>,
        account: mongoose.Model<Account>
    }
}

export default fp(async (fastifyWithoutDB) => {
    const fastify = fastifyWithoutDB as fastifyWithDB
    //resolvers definitions
    const graphResolvers = {
        Query: {
            users: async (_: undefined, args: allQueryArgs): Promise<User[]> => {
                return await fastify.database.user.find({})
            },
            user: async (_: undefined, args: userArgs): Promise<User|null> => {
                if (args.userId !== null) {
                    const user = await fastify.database.user.findById(args.userId)
                    if (user !== null) {
                        return user
                    }
                    return null
                }
                throw new Error("missing userId field in request")
            },
            auths: async (_: undefined, args: allQueryArgs): Promise<Auth[]> => {
                return await fastify.database.auth.find({})
            },
            auth: async (_: undefined, args: authArgs): Promise<Auth|null> => {
                if (args.authId !== null) {
                    const auth = await fastify.database.auth.findById(args.authId)
                    if (auth !== null) {
                        return auth
                    }
                    return null
                }
                throw new Error("missing authId field in request")
            },
            finances: async (_: undefined, args: allQueryArgs): Promise<Finance[]> => {
                return await fastify.database.finance.find({})
            },
            finance: async (_: undefined, args: finArgs): Promise<Finance|null> => {
                if (args.finId !== null) {
                    const fin = await fastify.database.finance.findById(args.finId)
                    if (fin !== null) {
                        return fin
                    }
                    return null
                }
                throw new Error("missing finId field in request")
            },
            accounts: async (_: undefined, args: allQueryArgs): Promise<Account[]> => {
                return await fastify.database.account.find({})
            },
            account: async (_: undefined, args: AccntArgs): Promise<Account|null> => {
                if (args.accntId !== null) {
                    const accnt = await fastify.database.account.findById(args.accntId)
                    if (accnt !== null) {
                        return accnt
                    }
                    return null
                }
                throw new Error("missing accntId field in request")
            },
            createUserByName: async (_: undefined, args: newUserArgs): Promise<User> => {
                const newUser = await fastify.database.user.create({
                    name: args.name,
                    accntIds: []
                });
                const newAuth = await fastify.database.auth.create({
                    userId: newUser.id,
                    username: (typeof args.username === 'undefined') ? DEFAULTS.username : args.username,
                    password: (typeof args.password === 'undefined') ? DEFAULTS.password : args.password
                })
                newUser.authId = newAuth.id;
                const newFin = await fastify.database.finance.create({
                    userId: newUser.id,
                    f01k: (typeof args.f01k === 'undefined') ? DEFAULTS.f01k : args.f01k,
                    salary: (typeof args.salary === 'undefined') ? DEFAULTS.salary : args.salary,
                    pre_tax_income: (typeof args.pre_tax_income === 'undefined') ? DEFAULTS.pre_tax_income : args.pre_tax_income,
                    social_security: (typeof args.social_security === 'undefined') ? DEFAULTS.social_security : args.social_security,
                    medicare_tax: (typeof args.medicare_tax === 'undefined') ? DEFAULTS.medicare_tax : args.medicare_tax,
                    federal_tax: (typeof args.federal_tax === 'undefined') ? DEFAULTS.federal_tax : args.federal_tax,
                    state_tax: (typeof args.state_tax === 'undefined') ? DEFAULTS.state_tax : args.state_tax,
                    discretionary: (typeof args.discretionary === 'undefined') ? DEFAULTS.discretionary : args.discretionary
                });
                newUser.finId = newFin.id;
                // TODO support sending accounts with initial creation
                // args.accntDetails.map(async accntDetail => {
                //     const newAccnt = await fastify.database.account.create({
                //         userId: newUser.id,
                //         holding: accntDetail.holding,
                //         interestRate: accntDetail.interestRate
                //     });
                //     newUser.accntIds.push(newAccnt.id)
                // })
                newUser.save();
                return newUser;
            },
            addAccountByUserId: async (_: undefined, args: addAccountByUserIdArgs): Promise<Account> => {
                const user = await fastify.database.user.findById(args.userId);
                if (user !== null) {
                    const newAccnt = await fastify.database.account.create({
                        userId: args.userId,
                        holding: (typeof args.holding === 'undefined') ? DEFAULTS.holding : args.holding,
                        interest_rate: (typeof args.interest_rate === 'undefined') ? DEFAULTS.interest_rate : args.interest_rate
                    });
                    console.log(newAccnt)
                    user.accntIds.push(newAccnt.id);
                    await user.save();
                    return newAccnt
                }
                throw Error("userId not found");
            },
            updateAuthByUserId: async (_: undefined, args: updateAuthByUserIdArgs): Promise<Auth> =>  {
                const user = await fastify.database.user.findById(args.userId);
                if (user !== null) {
                    const auth = await fastify.database.auth.findById(user.authId);
                    if (auth !== null) {
                        auth.username = (typeof args.username === 'undefined') ? auth.username : args.username;
                        auth.password = (typeof args.password === 'undefined') ? auth.password : args.password;
                        await auth.save();
                        return auth;
                    }
                    throw Error("Internal error: user missing an auth obj");
                }
                throw Error("userId not found");
            },
            updateFinanceByUserId: async (_: undefined, args: updateFinanceByUserIdArgs): Promise<Finance> => {
                const user = await fastify.database.user.findById(args.userId);
                if (user !== null) {
                    const fin = await fastify.database.finance.findById(user.finId);
                    if (fin !== null) {
                        fin.f01k = (typeof args.f01k === 'undefined') ? fin.f01k : args.f01k;
                        fin.salary = (typeof args.salary === 'undefined') ? fin.salary : args.salary;
                        fin.pre_tax_income = (typeof args.pre_tax_income === 'undefined') ? fin.pre_tax_income : args.pre_tax_income;
                        fin.social_security = (typeof args.social_security === 'undefined') ? fin.social_security : args.social_security;
                        fin.medicare_tax = (typeof args.medicare_tax === 'undefined') ? fin.medicare_tax : args.medicare_tax;
                        fin.federal_tax = (typeof args.federal_tax === 'undefined') ? fin.federal_tax : args.federal_tax;
                        fin.state_tax = (typeof args.state_tax === 'undefined') ? fin.state_tax : args.state_tax;
                        fin.discretionary = (typeof args.discretionary === 'undefined') ? fin.discretionary : args.discretionary;
                        await fin.save();
                        return fin;
                    }
                    throw Error("Internal error: user missing an finance obj");
                };
                throw Error("userId not found");
            },
            updateAccountByAccntId: async (_: undefined, args: updateAccountByAccntIdArgs): Promise<Account|null> => {
                const accnt = await fastify.database.account.findById(args.accntId)
                if (accnt !== null) {
                    accnt.holding = (typeof args.holding === 'undefined') ? accnt.holding : args.holding;
                    accnt.interest_rate = (typeof args.interest_rate === 'undefined') ? accnt.interest_rate : args.interest_rate;
                    await accnt.save()
                    return accnt
                }
                return null
            },
            deleteUserByUserId: async (_: undefined, args: deleteUserByUserIdArgs): Promise<boolean> => {
                const user = await fastify.database.user.findById(args.userId);
                if (user !== null) {
                    console.log(user)
                    await fastify.database.finance.deleteOne({ _id: new ObjectId(user.finId) });
                    await fastify.database.auth.deleteOne({ _id: new ObjectId(user.authId) });
                    user.accntIds.map(async (accntId) => await fastify.database.account.deleteOne({ _id: new ObjectId(accntId) }));
                    await fastify.database.user.deleteOne({ _id: new ObjectId(args.userId) });
                    return true
                }
                return false
            },
            delAccountByAccntId: async (_: undefined, args: delAccountByAccntIdArgs): Promise<boolean> => {
                const accnt = await fastify.database.account.findById(args.accntId);
                if (accnt !== null) {
                    const user = await fastify.database.user.findById(accnt.userId)
                    if (user !== null) {
                        const index = user.accntIds.indexOf(accnt.id)
                        user.accntIds.splice(index, 1)
                        await user.save();
                        await fastify.database.account.deleteOne({ _id: new ObjectId(accnt.id) });
                        return true;
                    }
                    throw Error("Internal error: account missing a user obj");
                };
                return false;
            }
        },
        User: {
            auth: async (parent: User): Promise<Auth|null> => {
                return await fastify.database.auth.findById(parent.authId);
            },
            finance: async (parent: User): Promise<Finance|null> => {
                return await fastify.database.finance.findById(parent.finId);
            },
            accounts: async (parent: User): Promise<(Account|null)[]> => {
                return await Promise.all(parent.accntIds.map(async accntId => await fastify.database.account.findById(accntId)))
            }
        },
        Auth: {
            user: async (parent: Auth) => {
                return await fastify.database.user.findById(parent.userId);
            }
        },
        Finance: {
            user: async(parent: Finance) => {
                return await fastify.database.user.findById(parent.userId);
            }
        },
        Account: {
            user: async(parent: Account) => {
                return await fastify.database.user.findById(parent.userId);
            }
        },
    }
    //registration with fastify
    fastify.register(mercurius, {
        schema: graphSchema,
        resolvers: graphResolvers,
        errorFormatter: (result, ctx) => {
            const def = mercurius.defaultErrorFormatter(result, ctx);
            return {
              statusCode: def.statusCode || 500,
              response: def.response,
            };
          },
    })
})