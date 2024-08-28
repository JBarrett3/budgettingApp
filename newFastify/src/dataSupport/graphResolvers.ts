// import { DEFAULTS } from '../consts.js'

interface setObj {
    x: number,
    y: number
}

export const graphResolvers = {
    Query: {
        add: async (_: undefined, { x, y }: setObj): Promise<Number> => x + y
    }
    // Query: {
    //     users: async () => await mongoModels.userModel.find({}),
    //     async user(parent, args, context) {
    //         return await mongoModels.userModel.findById(args.userId);
    //     }
    // },
    // User: {
    //     async auth(parent, args, context) {
    //         return await mongoModels.authModel.findById(parent.authId);
    //     },
    //     async finance(parent, args, context) {
    //         return await mongoModels.financeModel.findById(parent.finId);
    //     },
    //     async accounts(parent, args, context) {
    //         return await parent.accntIds.map((accntId) => mongoModels.accountModel.findById(accntId));
    //     }
    // },
    // Auth: {
    //     async user(parent, args, context) {
    //         return await mongoModels.userModel.findById(parent.userId);
    //     }
    // },
    // Finance: {
    //     async user(parent, args, context) {
    //         return await mongoModels.financeModel.findById(parent.userId);
    //     }
    // },
    // Account: {
    //     async user(parent, args, context) {
    //         return await mongoModels.accountModel.findById(parent.userId);
    //     }
    // },
    // Mutation: {
    //     async createUserByName(parent, args, context) {
    //         const newUser = await mongoModels.userModel.create({
    //             name: args.name,
    //             accntIds: []
    //         });
    //         const newAuth = await mongoModels.authModel.create({
    //             userId: newUser.id,
    //             username: (typeof args.username === 'undefined') ? DEFAULTS.username : args.username,
    //             password: (typeof args.password === 'undefined') ? DEFAULTS.password : args.password
    //         });
    //         const newFin = await mongoModels.financeModel.create({
    //             userId: newUser.id,
    //             f01k: (typeof args.f01k === 'undefined') ? DEFAULTS.f01k : args.f01k,
    //             salary: (typeof args.salary === 'undefined') ? DEFAULTS.salary : args.salary,
    //             pre_tax_income: (typeof args.pre_tax_income === 'undefined') ? DEFAULTS.pre_tax_income : args.pre_tax_income,
    //             social_security: (typeof args.social_security === 'undefined') ? DEFAULTS.social_security : args.social_security,
    //             medicare_tax: (typeof args.medicare_tax === 'undefined') ? DEFAULTS.medicare_tax : args.medicare_tax,
    //             federal_tax: (typeof args.federal_tax === 'undefined') ? DEFAULTS.federal_tax : args.federal_tax,
    //             state_tax: (typeof args.state_tax === 'undefined') ? DEFAULTS.state_tax : args.state_tax,
    //             discretionary: (typeof args.discretionary === 'undefined') ? DEFAULTS.discretionary : args.discretionary
    //         });
    //         newUser.authId = newAuth.id;
    //         newUser.finId = newFin.id;
    //         await newUser.save();
    //         return newUser.id;
    //     },
    //     async deleteUserByUserID(parent, args, context) {
    //         const user = await mongoModels.userModel.findById(args.userId);
    //         if (typeof user === 'undefined') {
    //             return false;
    //         };
    //         mongoModels.financeModel.deleteOne({ _id: user.finId });
    //         mongoModels.authModel.deleteOne({ _id: user.authId });
    //         user.accntIds.map((accntId) => mongoModels.accountModel.deleteOne({ _id: accntId }));
    //         mongoModels.userModel.deleteOne({ _id: user.id });
    //         return true;
    //     },
    //     async updateAuthByUserID(parent, args, context) {
    //         const user = (await mongoModels.userModel.findById(args.userId));
    //         if (typeof user === 'undefined') {
    //             return Error("userId not found");
    //         };
    //         const auth = await mongoModels.authModel.findById(user.authId);
    //         auth.username = (typeof args.username === 'undefined') ? auth.username : args.username;
    //         auth.password = (typeof args.password === 'undefined') ? auth.password : args.password;
    //         await auth.save();
    //         return auth;
    //     },
    //     async updateFinanceByUserID(parent, args, context) {
    //         const user = (await mongoModels.userModel.findById(args.userId));
    //         if (typeof user === 'undefined') {
    //             return Error("userId not found");
    //         };
    //         const fin = await mongoModels.financeModel.findById(user.finId);
    //         fin.f01k = (typeof args.f01k === 'undefined') ? fin.f01k : args.f01k;
    //         fin.salary = (typeof args.salary === 'undefined') ? fin.salary : args.salary;
    //         fin.pre_tax_income = (typeof args.pre_tax_income === 'undefined') ? fin.pre_tax_income : args.pre_tax_income;
    //         fin.social_security = (typeof args.social_security === 'undefined') ? fin.social_security : args.social_security;
    //         fin.medicare_tax = (typeof args.medicare_tax === 'undefined') ? fin.medicare_tax : args.medicare_tax;
    //         fin.federal_tax = (typeof args.federal_tax === 'undefined') ? fin.federal_tax : args.federal_tax;
    //         fin.state_tax = (typeof args.state_tax === 'undefined') ? fin.state_tax : args.state_tax;
    //         fin.discretionary = (typeof args.discretionary === 'undefined') ? fin.discretionary : args.discretionary;
    //         await fin.save();
    //         return fin;
    //     },
    //     async addAccountByUserID(parent, args, context) {
    //         const user = await mongoModels.userModel.findById(args.userId);
    //         if (typeof user === "undefined") {
    //             return Error("userId not found");
    //         }
    //         const newAccnt = await mongoModels.accountModel.create({
    //             userId: args.userId,
    //             holding: (typeof args.holding === 'undefined') ? DEFAULTS.holding : args.holding,
    //             interestRate: (typeof args.interest_rate === 'undefined') ? DEFAULTS.interest_rate : args.interest_rate
    //         });
    //         user.accntIds.push(newAccnt.id);
    //         await user.save();
    //         return newAccnt
    //     },
    //     async delAccountByAccntID(parent, args, context) {
    //         const accnt = await mongoModels.accountModel.findById(args.accntID);
    //         if (typeof accnt === undefined) {
    //             return false;
    //         };
    //         const user = await mongoModels.userModel.findById(accnt.userId)
    //         const index = user.accntIds.indexOf(accnt.id)
    //         user.accntIds.splice(index, 1)
    //         await user.save();
    //         await mongoModels.accountModel.deleteOne({ _id: accnt.id });
    //         return true;
    //     }
    // }
}