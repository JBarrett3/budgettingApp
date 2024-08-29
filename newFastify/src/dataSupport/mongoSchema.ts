import { Schema, SchemaTypes } from "mongoose"

//interfaces (to satisfy typescript + support validation)
export interface User {
    name: string,
    authId: string,
    finId: string,
    accntIds: string[]
}
export interface Auth {
    userId: string,
    username: string,
    password: string
}
export interface Finance {
    userId: string,
    f01k: number,
    salary: number,
    pre_tax_income: number,
    social_security: number,
    medicare_tax: number,
    federal_tax: number,
    state_tax: number,
    discretionary: number
}
export interface Account {
    userId: string,
    holding: number,
    interestRate: number
}

//models
export const userSchema: Schema<User> = new Schema({
    name: String,
    authId: SchemaTypes.ObjectId,
    finId: SchemaTypes.ObjectId,
    accntIds: [SchemaTypes.ObjectId]
})
export const authSchema: Schema<Auth> = new Schema({
    userId: SchemaTypes.ObjectId,
    username: String,
    password: String
})
export const financeSchema: Schema<Finance> = new Schema({
    userId: SchemaTypes.ObjectId,
    f01k: Number,
    salary: Number,
    pre_tax_income: Number,
    social_security: Number,
    medicare_tax: Number,
    federal_tax: Number,
    state_tax: Number,
    discretionary: Number
})
export const accountSchema: Schema<Account> = new Schema({
    userId: SchemaTypes.ObjectId,
    holding: Number,
    interestRate: Number
})
