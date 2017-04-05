module.exports = {
  run
}

const Bucket = require('../bucket')
const Code = require('../code')
const createRole = require('../role/create')
const createLambda = require('../lambda/create')
const {log, logP} = require('../../utils/logger')
const pRetry = require('p-retry')

function run (options = {}) {
  return Bucket.create(options)
  .then(logP('-> created bucket'))
  .then(() => Code.createZip(options))
  .then(logP('-> created code zip'))
  .then(() => Code.create(options))
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
