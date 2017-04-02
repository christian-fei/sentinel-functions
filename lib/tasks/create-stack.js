module.exports = {
  run
}

const createBucket = require('./create-bucket')
const createCodeZip = require('./create-code-zip')
const createCode = require('./create-code')
const createRole = require('./create-role')
const createLambda = require('./create-lambda')
const {log, logP} = require('../utils/logger')
const pRetry = require('p-retry')

function run (options = {}) {
  return createBucket.run(options)
  .then(logP('-> created bucket'))
  .then(() => createCodeZip.run(options))
  .then(logP('-> created code zip'))
  .then(() => createCode.run(options))
  .then(logP('-> created code', options.objectKey))
  .then(() => createRole.run(options))
  .then(logP('-> created role'))
  .then(data => {
    const arn = data.Role.Arn
    log('-> using arn', arn)

    return pRetry(() => createLambda.run(Object.assign(options, {roleArn: arn})),
              {retries: 5})
  })
}
