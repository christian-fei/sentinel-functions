const {ok} = require('assert')
const config = testConfigFrom(require('../../config'))
const createBucket = require('../../lib/tasks/bucket/create')
const deleteBucket = require('../../lib/tasks/bucket/delete')
const {bucketExists, not} = require('../utils')

test('bucket', () => {
  test.timeout('creates and deletes bucket', (done) => {
    deleteBucket.run(config).then(() => {}).catch(() => {})
    .then(() => createBucket.run(config))
    .then(() => bucketExists(config))
    .then(exists => ok(exists))
    .then(() => deleteBucket.run(config))
    .then(() => not(bucketExists(config)))
    .then(exists => ok(exists))
    .then(() => done())
    .catch(done)
  }, 30000)
})

function testConfigFrom (config) {
  return Object.assign({}, config, {
    lambdaName: config.lambdaName + '-test',
    bucketName: config.bucketName + '-test',
    roleName: config.roleName + '-test'
  })
}
