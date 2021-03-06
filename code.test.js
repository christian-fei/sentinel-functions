const {ok} = require('assert')
const Bucket = require('../lib/bucket')
const Code = require('../lib/code')
const {codeExists, config, loose} = require('./utils')

test('code', () => {
  test.timeout('creates and deletes code', (done) => {
    loose(Bucket.destroy(config))
    .then(() => Bucket.create(config))
    .then(() => Code.upload(config))
    .then(() => codeExists(config))
    .then(exists => ok(exists))
    .then(() => Code.destroy(config))
    .then(() => codeExists(config))
    .then(exists => ok(!exists))
    .then(() => done())
    .catch(done)
  }, 30000)
})
