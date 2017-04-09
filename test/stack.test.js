const {ok, throws} = require('assert')
const Stack = require('../lib/stack')
const {bucketExists, codeExists, lambdaExists, not, config, loose} = require('./utils')
const delay = require('delay')

test('stack', () => {
  test.timeout('creates and deletes stack', (done) => {
    Promise.resolve()
    .then(() => loose(Stack.destroy(config)))
    .then(() => not(bucketExists(config)))
    .then(exists => ok(exists))
    .then(() => not(codeExists(config)))
    .then(exists => ok(exists))
    .then(() => not(lambdaExists(config)))
    .then(exists => ok(exists))
    .then(delay(3000))

    .then(() => Stack.create(config))
    .then(() => bucketExists(config))
    .then(exists => ok(exists))
    .then(() => done())
    .catch(done)
  }, 30000)

  test('Stack.create throws when bucketName is missing', () => {
    throws(() => Stack.create({}))
  })
  test('Stack.destroy throws when bucketName is missing', () => {
    throws(() => Stack.destroy({}))
  })
})
