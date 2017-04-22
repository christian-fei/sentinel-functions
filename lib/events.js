module.exports = {
  createRule,
  addRuleTarget
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {CloudWatchEvents} = AWS
const cloudWatchEvents = new CloudWatchEvents()

function createRule (options = {}) {
  if (!options.ruleName) throw new Error('create-event-rule: Please provide a options.ruleName')
  if (!options.scheduleExpression) throw new Error('create-event-rule: Please provide a options.scheduleExpression')

  return cloudWatchEvents.putRule({
    Name: options.ruleName,
    ScheduleExpression: options.scheduleExpression
  }).promise()
}

function addRuleTarget (options = {}) {
  if (!options.ruleName) throw new Error(`add-event-rule-target: Please provide a options.ruleName (${options.ruleName})`)
  if (!options.lambdaName) throw new Error(`add-event-rule-target: Please provide a options.lambdaName (${options.lambdaName})`)
  if (!options.lambdaArn) throw new Error(`add-event-rule-target: Please provide a options.lambdaArn (${options.lambdaArn})`)
  if (!options.eventData) throw new Error(`add-event-rule-target: Please provide a options.eventData (${options.eventData})`)

  return cloudWatchEvents.putTargets({
    Rule: options.ruleName,
    Targets: [{
      Arn: options.lambdaArn,
      Id: `${options.lambdaName}-${Date.now()}`,
      Input: options.eventData
    }]
  }).promise()
}
