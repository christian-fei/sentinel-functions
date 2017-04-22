module.exports = {
  create,
  destroy,
  updateTarget
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {CloudWatchEvents} = AWS

function create (options = {}, cloudWatchEvents = new CloudWatchEvents()) {
  if (!options.ruleName) throw new Error('create-rule: Please provide a options.ruleName')
  if (!options.scheduleExpression) throw new Error('create-rule: Please provide a options.scheduleExpression')

  const {ruleName, scheduleExpression} = options
  var params = {
    Name: ruleName,
    ScheduleExpression: scheduleExpression
  }
  return cloudWatchEvents.putRule(params).promise()
}

function updateTarget (options = {}, cloudWatchEvents = new CloudWatchEvents()) {
  if (!options.lambdaArn) throw new Error('update-target-rule: Please provide a options.lambdaArn')
  if (!options.ruleName) throw new Error('update-target-rule: Please provide a options.ruleName')
  if (!options.scheduleExpression) throw new Error('update-target-rule: Please provide a options.scheduleExpression')
  if (!options.eventData) throw new Error('update-target-rule: Please provide a options.eventData')

  const {lambdaName, lambdaArn, ruleName, eventData} = options
  return cloudWatchEvents.putTargets({
    Rule: ruleName,
    Targets: [
      {
        Arn: lambdaArn,
        Id: lambdaName,
        Input: JSON.stringify(eventData)
      }
    ]
  }).promise()
}

function destroy (options = {}, cloudWatchEvents = new CloudWatchEvents()) {
  if (!options.lambdaName) throw new Error('destroy-rule: Please provide a options.lambdaName')
  if (!options.ruleName) throw new Error('destroy-rule: Please provide a options.ruleName')

  const {lambdaName, ruleName} = options

  var params = {
    Ids: [lambdaName],
    Rule: ruleName
  }
  cloudWatchEvents.removeTargets(params).promise()
}
