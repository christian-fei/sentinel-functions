const config = testConfigFrom(require('../../config'))
const delay = require('delay')
const createBucket = require('../../lib/tasks/bucket/create')
const deleteBucket = require('../../lib/tasks/bucket/delete')
const {bucketExists} = require('../utils')

test('bucket', () => {
  test.timeout('creates bucket', (done) => {
    deleteBucket.run(config).then(() => {}).catch(() => {})
    .then(() => createBucket.run(config))
    .then(delay(1000))
    .then(() => bucketExists(config.bucketName))
    .then(exists => done(exists ? null : new Error('bucket still exists!')))
    .catch(done)
  }, 10000)

  test.timeout('deletes bucket', (done) => {
    deleteBucket.run(config)
    .then(() => bucketExists(config.bucketName))
    .then(delay(1000))
    .then(exists => {
      done(!exists ? null : new Error('bucket still exists!'))
    })
    .catch(done)
  }, 10000)
})

function testConfigFrom (config) {
  return Object.assign({}, config, {
    lambdaName: config.lambdaName + '-test',
    bucketName: config.bucketName + '-test',
    roleName: config.roleName + '-test'
  })
}
