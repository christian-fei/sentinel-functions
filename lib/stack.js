module.exports = {
  create,
  destroy
}

const Bucket = require('./bucket')
const Code = require('./code')
const Role = require('./role')
const Lambda = require('./lambda')
const Rule = require('./rule')
const saveStack = require('./utils/save-stack')
const {log, logP} = require('./utils/logger')
const delay = require('delay')
const pRetry = require('p-retry')

function create (options = {}) {
  return Bucket.create(options)
  .then(logP('-> created bucket'))
  .then(pRetry(() => Code.createZip(options)))
  .then(logP('-> created code zip'))
  .then(() => Code.upload(options))
  .then(logP('-> uploaded code'))
  .then(pRetry(() => {
    return Role.create(options)
    .then(data => { options.roleArn = data.Role.Arn })
  }))
  .then(logP('-> created role'))
  .then(() => log('-> using roleArn', options.roleArn))
  .then(pRetry(() => {
    return Rule.create(options)
    .then(data => { options.ruleArn = data.RuleArn })
  }))
  .then(logP('-> created rule'))
  .then(pRetry(() => {
    return Lambda.create(options)
    .then(data => { options.lambdaArn = data.FunctionArn })
  }))
  .then(logP('-> created lambda'))
  .then(() => log('-> using lambdaArn', options.lambdaArn))
  .then(() => delay(5000))
  .then(pRetry(() => Rule.updateTarget(options)))
  .then(logP('-> updated target'))
  .then(pRetry(() => Lambda.addInvokePermission(options)))
  .then(logP('-> added invoke permissions'))
  .then(() => saveStack('stack', options))
}

function destroy (options = {}) {
  return loose(Code.destroy(options))
  .then(logP('-> deleted code'))
  .then(() => loose(Bucket.destroy(options)))
  .then(logP('-> deleted bucket'))
  .then(() => loose(Role.destroy(options)))
  .then(logP('-> deleted role'))
  .then(() => loose(Lambda.destroy(options)))
  .then(logP('-> deleted lambda'))
  .then(() => loose(Rule.destroy(options)))
  .then(logP('-> deleted rule'))
}

function loose (promise) {
  return promise.then((...args) => Promise.resolve(...args)).catch(() => {})
}
