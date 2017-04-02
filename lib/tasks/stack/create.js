module.exports = {
  run
}

const createBucket = require('../bucket/create')
const createCodeZip = require('../code/create-zip')
const createCode = require('../code/create')
const createRole = require('../role/create')
const createLambda = require('../lambda/create')
const {log, logP} = require('../../utils/logger')
const pRetry = require('p-retry')

function run (options = {}) {
  return createBucket.run(options)
  .then(logP('-> created bucket'))
  .then(() => createCodeZip.run(options))
  .then(logP('-> created code zip'))
  .then(() => createCode.run(options))
  .then(logP('-> created code'))
  .then(() => createRole.run(options))
  .then(logP('-> created role'))
  .then(data => {
    const arn = data.Role.Arn
    log('-> using arn', arn)

    return pRetry(() => createLambda.run(Object.assign(options, {roleArn: arn})),
              {retries: 5})
  })
}
