const {ok, throws} = require('assert')
const Bucket = require('../lib/bucket')
const {bucketExists, not, config, loose} = require('./utils')

test('bucket', () => {
  test.timeout('creates and deletes bucket', (done) => {
    loose(Bucket.destroy(config))
    .then(() => Bucket.create(config))
    .then(() => bucketExists(config))
    .then(exists => ok(exists))
    .then(() => Bucket.destroy(config))
    .then(() => not(bucketExists(config)))
    .then(exists => ok(exists))
    .then(() => done())
    .catch(done)
  }, 30000)

  test('Bucket.create throws when bucketName is missing', () => {
    throws(() => Bucket.create({}))
  })
  test('Bucket.destroy throws when bucketName is missing', () => {
    throws(() => Bucket.destroy({}))
  })
})
