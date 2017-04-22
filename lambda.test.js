const {ok, throws} = require('assert')
const Lambda = require('../lib/lambda')
const Bucket = require('../lib/bucket')
const Code = require('../lib/code')
const Role = require('../lib/role')
const {lambdaExists, not, config, loose} = require('./utils')
const {logP} = require('../lib/utils/logger')

test('lambda', () => {
  test.timeout('creates and deletes lambda', (done) => {
    loose(Lambda.destroy(config))
    .then(() => loose(Role.destroy(config)))
    .then(() => loose(Code.destroy(config)))
    .then(() => loose(Bucket.destroy(config)))
    .then(() => loose(Bucket.create(config)))
    .then(() => loose(Code.upload(config)))
    .then(() => loose(Role.create(config)))
    .then((data) => {
      const arn = data.Role.Arn
      return Lambda.create(Object.assign(config, {roleArn: arn}))
    })
    .then(logP('-> lambda created'))
    .then(() => lambdaExists(config))
    .then(exists => ok(exists))
    .then(() => Lambda.destroy(config))
    .then(() => not(lambdaExists(config)))
    .then(exists => ok(exists))
    .then(() => done())
    .catch(done)
  }, 30000)

  test('Lambda.create throws when config is missing', () => {
    throws(() => Lambda.create({}))
  })
  test('Lambda.destroy throws when config is missing', () => {
    throws(() => Lambda.destroy({}))
  })
})
