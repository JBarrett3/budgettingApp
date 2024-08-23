import { db } from './db.js';
export const resolvers = {
    User: {
        auth(parent, args, context) {
            return db.auths.find((auth) => auth.userId === parent.id);
        },
        finance(parent, args, context) {
            return db.finances.find((fin) => fin.userId === parent.id);
        },
        accounts(parent, args, context) {
            return db.accounts.filter((accnt) => accnt.userId === parent.id);
        }
    },
    Auth: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId);
        }
    },
    Finance: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId);
        }
    },
    Account: {
        user(parent, args, context) {
            return db.users.find((user) => user.id === parent.userId);
        }
    },
    Query: {
        users: () => db.users,
        user(parent, args, context) {
            return db.users.find((user) => user.id === args.userId);
        }
    },
    Mutation: {
        createUserByName(parent, args, context) {
            const maxUserId = db.users.reduce((accumulator, currentValue) => Math.max(accumulator, parseInt(currentValue.id)), 1);
            const newUserId = String(maxUserId + 1);
            const maxAuthId = db.auths.reduce((accumulator, currentValue) => Math.max(accumulator, parseInt(currentValue.id)), 1);
            const newAuthId = String(maxAuthId + 1);
            const maxFinId = db.finances.reduce((accumulator, currentValue) => Math.max(accumulator, parseInt(currentValue.id)), 1);
            const newFinId = String(maxFinId + 1);
            const newUser = {
                id: newUserId,
                name: args.name,
                auth: {
                    id: newAuthId,
                    user: newUserId,
                    username: '',
                    password: ''
                },
                finance: {
                    id: newFinId,
                    user: newUserId,
                    desiredSavingsPercentage: 0,
                    salary: 0
                },
                accntIds: []
            };
            db.users.push(newUser);
            return newUserId;
        },
        deleteUserByUserID(parent, args, context) {
            const user = db.users.find((user) => user.id === args.userId);
            if (user === undefined) {
                return false;
            }
            const { finId, authId, accntIds } = user;
            db.finances = db.finances.filter((fin) => fin.id !== finId);
            db.auths = db.auths.filter((auth) => auth.id !== authId);
            db.accounts = db.accounts.filter((accnt) => accntIds.indexOf(accnt.id) === -1);
            db.users = db.users.filter((user) => user.id !== args.userId);
            return true;
        },
        updateAuthByUserID(parent, args, context) {
            db.auths = db.auths.map((auth) => {
                if (auth.userId === args.userId) {
                    return { ...auth,
                        username: args.username,
                        password: args.password
                    };
                }
                return auth;
            });
            return db.auths.find((auth) => auth.userId === args.userId);
        },
        updateFinanceByUserID(parent, args, context) {
            db.finances = db.finances.map((fin) => {
                if (fin.userId === args.userId) {
                    return { ...fin,
                        desiredSavingsPercentage: args.desiredSavingsPercentage,
                        salary: args.salary
                    };
                }
                return fin;
            });
            return db.finances.find((fin) => fin.userId === args.userId);
        },
        addAccountByUserID(parent, args, context) {
            const maxAccntId = db.accounts.reduce((accumulator, currentValue) => Math.max(accumulator, parseInt(currentValue.id)), 1);
            const newAccntId = String(maxAccntId + 1);
            const newAccnt = {
                id: newAccntId,
                userId: args.userId,
                holding: args.holding,
                interestRate: args.interestRate
            };
            db.users = db.users.map((user) => {
                if (user.id === args.userId) {
                    return { ...user, accntIds: { ...user.accntIds, newAccntId } };
                }
                return user;
            });
            db.accounts.push(newAccnt);
            return newAccnt;
        },
        delAccountByAccntID(parent, args, context) {
            const accnt = db.accounts.find((accnt) => accnt.id === args.accntID);
            if (accnt === undefined) {
                return false;
            }
            db.accounts = db.accounts.filter((accnt) => accnt.id !== args.accntID);
            return true;
        }
    },
};
