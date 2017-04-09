module.exports = {
  create,
  destroy
}

const Bucket = require('./bucket')
const Code = require('./code')
const Role = require('./role')
const Lambda = require('./lambda')
const {log, logP} = require('./utils/logger')
const pRetry = require('p-retry')

function create (options = {}) {
  return Bucket.create(options)
  .then(logP('-> created bucket'))
  .then(() => Code.createZip(options))
  .then(logP('-> created code zip'))
  .then(() => Code.create(options))
  .then(logP('-> created code'))
  .then(() => Role.create(options))
  .then(logP('-> created role'))
  .then(data => {
    const arn = data.Role.Arn
    log('-> using arn', arn)
    // return r(() => Lambda.create(Object.assign(options, {roleArn: arn})))

    return pRetry(() => Lambda.create(Object.assign(options, {roleArn: arn})),
              {retries: 5})
  })
}

function r (cb) {
  return pRetry(cb, {retries: 5})
}

function destroy (options = {}) {
  return Code.destroy(options)
  .then(logP('-> deleted code'))
  .then(() => Bucket.destroy(options))
  .then(logP('-> deleted bucket'))
  .then(() => Role.destroy(options))
  .then(logP('-> deleted role'))
  .then(() => Lambda.destroy(options))
  .then(logP('-> deleted lambda'))
}
