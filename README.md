# BudgettingApp

## Local setup

#### New developer onboarding
New developers should follow these steps on their local machines. 

 - Install dependencies `npm i`
 - (optionally) install the `GraphQL for VS Code` extension

#### Accessing GraphQL graph
 - Run application `npm start`
 - Navigate to `http://localhost:3000`

## Graph structure

#### Schema model
Schema handles maintaining our data in an organized structure

#### Resolver model
Resolvers handle accessing the graph at entrypoints in order to query or mutate data

## Initial setup
Note that this section does not need to be repeated, just done at the very start and listed here for documentation purposes.

#### File structure setup
 - Generate the package.json `npm init --yes && npm pkg set type="module"`
 - Install the @apollo/server and graphql dependencies `npm install @apollo/server graphql`
 - Install typescript `npm install --save-dev typescript @types/node`
 - Create a src folder and index.ts entrypoint `mkdir src; touch src/index.ts`
 - Create a tsconfig `touch tsconfig.json` and copy in the following configuration: `{
        "compilerOptions": {
            "rootDirs": ["src"],
            "outDir": "dist",
            "lib": ["es2020"],
            "target": "es2020",
            "module": "esnext",
            "moduleResolution": "node",
            "esModuleInterop": true,
            "types": ["node"]
        }
    }`
 - Add the following scripts to the package.json to enable compilation and startup: `"compile": "tsc", "start": "npm run compile && node ./dist/index.js"`