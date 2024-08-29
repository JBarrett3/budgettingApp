# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Database

### connection

To avoid errors, make sure to do the following:
 - supply the password to DB_PASSWORD in consts.ts
 - Whitelist your IP address at the mongo server website

### Notes on structure

We can consider this to be broken down into three different layers: Rest, then graphQL, then mongo. Each layer has its own defined schema/interface:
 - The interface for the rest endpoints is in [src/routes/db/rest/index.ts](src/routes/db/rest/index.ts)
 - The schema for the graph is in [src/dataSupport/graphSchema.ts](src/dataSupport/graphSchema.ts). Its setup and resolvers are in [src/plugins/graphSetup.ts](src/plugins/graphSetup.ts)
 - The schema for the mongo db is in [src/dataSupport/mongoSchema.ts](src/dataSupport/mongoSchema.ts). Its setup is in [src/plugins/mongoSetup.ts](src/plugins/mongoSetup.ts)

Whenever a modification is made to any of these layers, it usually necessitates modifications in the other layers as well, which is something to keep an eye out for.

### Rest routes

To reach the database using rest routes, use '/db/rest/' as a prefix, then specify desired action further. 
Note that the parameters for each request can be read from the interfaces in [src/routes/db/rest/index.ts](src/routes/db/rest/index.ts). The routes can also be fairly easily read from the file directly, but I'll list them here as well:
 - GET
    - users (you'd run /db/rest/users, and this applies to the following methods as well)
        - desc: gets all user objects
        - required params: None
        - optional params: None
        - returns: { id, name, auth { id }, finance { id }, accounts { id } }[]
    - auths
        - desc: gets all auth objects
        - required params: None
        - optional params: None
        - returns: { id, user { id }, username, password }[]
    - finances
        - desc: gets all finance objects
        - required params: None
        - optional params: None
        - returns: { id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary }[]
    - accounts
        - desc: gets all account objects
        - required params: None
        - optional params: None
        - returns: { id, user { id }, holding, interest_rate }[]
    - user
        - desc: gets specific user obj by id
        - required params: userId
        - optional params: None
        - returns: id, name, auth { id }, finance { id }, accounts { id }
    - auth
        - desc: gets specific auth obj by id
        - required params: authId
        - optional params: None
        - returns: { id, user { id }, username, password }[]
    - finance
        - desc: gets specific finance obj by id
        - required params: finId
        - optional params: None
        - returns: { id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary }[]
    - account
        - desc: gets specific account obj by id
        - required params: accntId
        - optional params: None
        - returns: { id, user { id }, holding, interest_rate }[]
- POST
    - createUserByName
        - desc: creates new user
        - required params: name
        - optional params: username, password, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary
        - returns: id, auth { id, username, password }, finance { id, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary}, accounts { id, holding, interest_rate }
    - addAccountByUserId
        - desc: create new accnt user specific user by userId
        - required params: userId
        - optional params: holding, interest_rate
        - returns: id, user { id }, holding , interest_rate
- PUT
    - updateAuthByUserId
        - desc: updates auth for specific user by userId
        - required params: userId
        - optional params: username, password
        - returns: id, user { id }, username, password
    - updateFinanceByUserId
        - desc: updates finance for specific user by userId
        - required params: userId
        - optional params: f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary
        - returns: id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary
    - updateAccountByAccntId (TODO)
        - desc: updates specific account by accntId
        - required params: accntId
        - optional params: holding, interest_rate
        - returns: id, user { id }, holding, interest_rate | null (if not found)
- DELETE
    - deleteUserByUserId
        - desc: deletes specific user by userId
        - required params: userId
        - optional params: None
        - returns: boolean (true if found and delete, false if not found)
    - delAccountByAccntId
        - desc: deletes specific account by accntId
        - required params: accntId
        - optional params: None
        - returns: boolean (true if found and delete, false if not found)