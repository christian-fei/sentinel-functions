module.exports = {
  create
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {CloudWatchEvents} = AWS
const cloudWatchEvents = new CloudWatchEvents()

function create (options = {}) {
  if (!options.ruleName) throw new Error('create-rule: Please provide a options.ruleName')
  if (!options.scheduleExpression) throw new Error('create-rule: Please provide a options.scheduleExpression')

  const {ruleName, scheduleExpression} = options
  var params = {
    Name: ruleName,
    ScheduleExpression: scheduleExpression
  }
  return cloudWatchEvents.putRule(params).promise()
}
