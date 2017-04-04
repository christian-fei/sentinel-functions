const {ok} = require('assert')
const config = testConfigFrom(require('../../config'))
const delay = require('delay')
const createBucket = require('../../lib/tasks/bucket/create')
const deleteBucket = require('../../lib/tasks/bucket/delete')
const createCode = require('../../lib/tasks/code/create')
const deleteCode = require('../../lib/tasks/code/delete')
const {codeExists} = require('../utils')

test('code', () => {
  test.timeout('creates and deletes code', (done) => {
    deleteBucket.run(config).then(() => {}).catch(() => {})
    .then(() => createBucket.run(config))
    .then(delay(1000))
    .then(() => createCode.run(config))
    .then(delay(5000))
    .then(() => codeExists(config))
    .then(exists => ok(exists))
    .then(() => done())
    .catch(done)
  }, 30000)

  test.timeout('deletes code', (done) => {
    deleteCode.run(config)
    .then(() => codeExists(config))
    .then(delay(1000))
    .then(exists => {
      done(!exists ? null : new Error('code still exists!'))
    })
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
