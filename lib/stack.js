module.exports = {
  create,
  destroy
}

const Bucket = require('./bucket')
const Code = require('./code')
const Role = require('./role')
const Lambda = require('./lambda')
const Rule = require('./rule')
const {log, logP} = require('./utils/logger')

function create (options = {}) {
  return Bucket.create(options)
  .then(logP('-> created bucket'))
  .then(() => Code.createZip(options))
  .then(logP('-> created code zip'))
  .then(() => Code.upload(options))
  .then(logP('-> uploaded code'))
  .then(() => Role.create(options))
  .then(logP('-> created role'))
  .then(data => { options.roleArn = data.Role.Arn })
  .then(log('-> using roleArn', options.roleArn))
  .then(() => Lambda.create(options))
  .then(logP('-> created lambda'))
  .then(data => { options.lambdaArn = data.FunctionArn })
  .then(log('-> using lambdaArn', options.lambdaArn))
  .then(() => Rule.create(options))
  .then(logP('-> created rule'))
  .then(data => { options.ruleArn = data.RuleArn })
  .then(log('-> using lambdaArn', options.lambdaArn))
  .then(() => Rule.updateTarget(options))
  .then(logP('-> updated target'))
  .then(() => Lambda.addInvokePermission(options))
  .then(logP('-> added invoke permissions'))
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
  .then(() => Rule.destroy(options))
  .then(logP('-> deleted rule'))
}
