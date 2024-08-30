export const PORT = 3000;
export const URI = (DB_USER: string, DB_PASSWORD: string): string => `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vmwh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
export const DB_USER = 'admin';
export const DB_PASSWORD = ''; //NOTE: do not commit this to repo when filled in
export const DB_ENV = 'dev';
export const DEFAULTS = {
    username: "username",
    password: "password",
    f01k: 0,
    salary: 0,
    pre_tax_income: 0,
    social_security: 0,
    medicare_tax: 0,
    federal_tax: 0,
    state_tax: 0,
    discretionary: 0,
    holding: 0,
    interest_rate: 0
}