export const PORT = 3000;
export const URI = (db_user, db_password) => `mongodb+srv://${db_user}:${db_password}@cluster0.vmwh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
export const DB_USER = 'admin';
export const DB_PASSWORD = 'CS320Rocks!!'; //NOTE: do not commit this to repo when filled in
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
};
