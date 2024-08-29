//TODO implement database testing
import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper'

test('rest tests', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/db/rest'
  })

  assert.equal(res.payload, 'simple test for now')
})

test('getUsers', async (t) => {

})

/*
'{ users { name } }' //note that parenthesis are omitted if there are no args at all
  '{ users { name, auth { username }, accounts { holding } } }'
  '{ user(userId: "66cfb10d5967e545f2caaf8b") { name } }'
  '{ auths { username } }'
  '{ auth(authId: "66cfb10d5967e545f2caaf8d") { username } }'
  '{ finances { f01k } }'
  '{ finance(finId: "66cfb10e5967e545f2caaf8f") { f01k } }'
  '{ accounts { holding } }'
  '{ account(accntId: "66d0722ded950fe90d148efe") { holding } }'
  '{ createUserByName(name: "john") }'
  '{ createUserByName(name: "john", username: "johnnyBoy", password: "superSafePass") }'
  '{ deleteUserByUserID(userId: "66cfb10d5967e545f2caaf8b" }' //you'll need to update this to an existing userId to really test
  '{ updateAuthByUserID(userId: "66cfb10d5967e545f2caaf8b", username: "newUsernameTest", password: "newPassTest") { username, password } }'
  '{ updateFinanceByUserID(userId: "66cfb10d5967e545f2caaf8b", f01k: 500) { f01k, salary } }'
  '{ addAccountByUserID(userId: "66cfb10d5967e545f2caaf8b", holding: 500, interest_rate: 0.01) { holding } }'
  '{ delAccountByAccntID(accntID: "66d06b54826546376d5fedb4") }'
*/
