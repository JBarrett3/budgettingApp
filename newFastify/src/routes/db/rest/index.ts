import { FastifyPluginAsync, FastifyRequest } from "fastify"

// interface userReqArgs extends 

interface userReq extends FastifyRequest {
  query: {
    userId: string
  }
}
interface authReq extends FastifyRequest {
  query: {
    authId: string
  }
}
interface finReq extends FastifyRequest {
  query: {
    finId: string
  }
}
interface accntReq extends FastifyRequest {
  query: {
    accntId: string
  }
}
interface createUserByReq extends FastifyRequest {
  query: {
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
}
interface addAccountByUserIdReq extends FastifyRequest {
  query: {
    userId: string,
    holding?: number,
    interest_rate?: number
  }
}
interface updateAuthByUserIdReq extends FastifyRequest {
  query: {
    userId: string,
    username?: string,
    password?: string
  }
}
interface updateFinanceByUserIdReq extends FastifyRequest {
  query: {
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
}
interface updateAccountByAccntIdReq extends FastifyRequest {
  query: {
    accntId: string,
    holding?: number,
    interest_rate?: number
  }
}
interface deleteUserByUserIdReq extends FastifyRequest {
  query: {
    userId: string
  }
}
interface deleteAccntByAccntIdReq extends FastifyRequest {
  query: {
    accntId: string
  }
}

const dbRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async (req, res) => {
    return res.graphql('{ users { id, name, auth { id }, finance { id }, accounts { id } } }')
  });
  fastify.get('/auths', async (req, res) => {
    return res.graphql('{ auths { id, user { id }, username, password } }')
  });
  fastify.get('/finances', async (req, res) => {
    return res.graphql('{ finances { id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary } }')
  });
  fastify.get('/accounts', async (req, res) => {
    return res.graphql('{ accounts { id, user { id }, holding, interest_rate } }')
  });
  fastify.get('/user', async (genReq, res) => {
    const specReq = genReq as userReq
    return res.graphql(`{ user(userId: "${specReq.query.userId}") { id, name, auth { id }, finance { id }, accounts { id } } }`)
  });
  fastify.get('/auth', async (genReq, res) => {
    const specReq = genReq as authReq
    return res.graphql(`{ auth(authId: "${specReq.query.authId}") { id, user { id }, username, password } }`)
  });
  fastify.get('/finance', async (genReq, res) => {
    const specReq = genReq as finReq
    return res.graphql(`{ finance(finId: "${specReq.query.finId}") { id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary } }`)
  });
  fastify.get('/account', async (genReq, res) => {
    const specReq = genReq as accntReq
    return res.graphql(`{ account(accntId: "${specReq.query.accntId}") { id, user { id }, holding, interest_rate } }`)
  });
  fastify.post('/createUserByName', async (genReq, res) => {
    const specReq = genReq as createUserByReq
    var input = `name: "${specReq.query.name}"`
    if (specReq.query.username !== undefined) {
      input += `, username: "${specReq.query.username}"`
    }
    if (specReq.query.password !== undefined) {
      input += `, password: "${specReq.query.password}"`
    }
    if (specReq.query.f01k !== undefined) {
      input += `, f01k: ${specReq.query.f01k}`
    }
    if (specReq.query.salary !== undefined) {
      input += `, salary: ${specReq.query.salary}`
    }
    if (specReq.query.pre_tax_income !== undefined) {
      input += `, pre_tax_income: ${specReq.query.pre_tax_income}`
    }
    if (specReq.query.social_security !== undefined) {
      input += `, social_security: ${specReq.query.social_security}`
    }
    if (specReq.query.medicare_tax !== undefined) {
      input += `, medicare_tax: ${specReq.query.medicare_tax}`
    }
    if (specReq.query.federal_tax !== undefined) {
      input += `, federal_tax: ${specReq.query.federal_tax}`
    }
    if (specReq.query.state_tax !== undefined) {
      input += `, state_tax: ${specReq.query.state_tax}`
    }
    if (specReq.query.discretionary !== undefined) {
      input += `, discretionary: ${specReq.query.discretionary}`
    }
    return res.graphql(`{ createUserByName(${input}) {id, auth { id, username, password }, finance { id, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary}, accounts { id, holding, interest_rate } } }`)
  })
  fastify.post('/addAccountByUserId', async (genReq, res) => {
    const specReq = genReq as addAccountByUserIdReq
    var input = `userId: "${specReq.query.userId}"`
    if (specReq.query.holding !== undefined) {
      input += `, holding: ${specReq.query.holding}`
    }
    if (specReq.query.interest_rate !== undefined) {
      input += `, interest_rate: ${specReq.query.interest_rate}`
    }
    return res.graphql(`{addAccountByUserId(${input}) {id, user { id }, holding, interest_rate } }`)
  })
  fastify.put('/updateAuthByUserId', async (genReq, res) => {
    const specReq = genReq as updateAuthByUserIdReq
    var input = `userId: "${specReq.query.userId}"`
    if (specReq.query.username !== undefined) {
      input += `, username: "${specReq.query.username}"`
    }
    if (specReq.query.password !== undefined) {
      input += `, password: "${specReq.query.password}"`
    }
    return res.graphql(`{ updateAuthByUserId(${input}) {id, user { id }, username, password} }`)
  })
  fastify.put('/updateFinanceByUserId', async (genReq, res) => {
    const specReq = genReq as updateFinanceByUserIdReq
    var input = `userId: "${specReq.query.userId}"`
    if (specReq.query.f01k !== undefined) {
      input += `, f01k: ${specReq.query.f01k}`
    }
    if (specReq.query.salary !== undefined) {
      input += `, salary: ${specReq.query.salary}`
    }
    if (specReq.query.pre_tax_income !== undefined) {
      input += `, pre_tax_income: ${specReq.query.pre_tax_income}`
    }
    if (specReq.query.social_security !== undefined) {
      input += `, social_security: ${specReq.query.social_security}`
    }
    if (specReq.query.medicare_tax !== undefined) {
      input += `, medicare_tax: ${specReq.query.medicare_tax}`
    }
    if (specReq.query.federal_tax !== undefined) {
      input += `, federal_tax: ${specReq.query.federal_tax}`
    }
    if (specReq.query.state_tax !== undefined) {
      input += `, state_tax: ${specReq.query.state_tax}`
    }
    if (specReq.query.discretionary !== undefined) {
      input += `, discretionary: ${specReq.query.discretionary}`
    }
    return res.graphql(`{ updateFinanceByUserId(${input}) {id, user { id }, f01k, salary, pre_tax_income, social_security, medicare_tax, federal_tax, state_tax, discretionary} }`)
  })
  fastify.put('/updateAccountByAccntId', async (genReq, res) => {
    const specReq = genReq as updateAccountByAccntIdReq
    var input = `accntId: "${specReq.query.accntId}"`
    if (specReq.query.holding !== undefined) {
      input += `, holding: ${specReq.query.holding}`
    }
    if (specReq.query.interest_rate !== undefined) {
      input += `, interest_rate: ${specReq.query.interest_rate}`
    }
    return res.graphql(`{ updateAccountByAccntId(${input}) {id, user { id }, holding, interest_rate} }`)
  })
  fastify.delete('/deleteUserByUserId', async (genReq, res) => {
    const specReq = genReq as deleteUserByUserIdReq
    return res.graphql(`{deleteUserByUserId(userId: "${specReq.query.userId}") }`)
  })
  fastify.delete('/delAccountByAccntId', async (genReq, res) => {
    const specReq = genReq as deleteAccntByAccntIdReq
    return res.graphql(`{ delAccountByAccntId(accntId: "${specReq.query.accntId}") }`)
  })
}

export default dbRoutes;