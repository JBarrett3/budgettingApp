import mongoose from "mongoose";
import { URI, DB_USER, DB_PASSWORD } from "./consts.js";
const setupDB = async () => {
    return mongoose.connect(URI(DB_USER, DB_PASSWORD)).then(res => {
        mongoose.connection.db.admin().command({ ping: 1 });
        console.log("DB connection success!");
    }).catch(err => {
        console.log("DB connection failure!");
        console.log("error: ", err);
    });
};
const mongoSchema = {
    userSchema: new mongoose.Schema({
        name: String,
        authId: mongoose.SchemaTypes.ObjectId,
        finId: mongoose.SchemaTypes.ObjectId,
        accntIds: [mongoose.SchemaTypes.ObjectId]
    }),
    authSchema: new mongoose.Schema({
        userId: mongoose.SchemaTypes.ObjectId,
        username: String,
        password: String
    }),
    financeSchema: new mongoose.Schema({
        userId: mongoose.SchemaTypes.ObjectId,
        f01k: Number,
        salary: Number,
        pre_tax_income: Number,
        social_security: Number,
        medicare_tax: Number,
        federal_tax: Number,
        state_tax: Number,
        discretionary: Number
    }),
    accountSchema: new mongoose.Schema({
        userId: mongoose.SchemaTypes.ObjectId,
        holding: Number,
        interestRate: Number
    })
};
const mongoModels = {
    userModel: mongoose.model("User", mongoSchema.userSchema),
    authModel: mongoose.model("Auth", mongoSchema.authSchema),
    financeModel: mongoose.model("Finance", mongoSchema.financeSchema),
    accountModel: mongoose.model("Account", mongoSchema.accountSchema)
};
export { setupDB, mongoModels };
