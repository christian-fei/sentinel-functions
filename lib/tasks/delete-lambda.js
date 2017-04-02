
module.exports = {
  run
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS

function run (options = {}) {
  if (!options.bucketName) throw new Error('delete-lambda: Please provide a options.bucketName')
  if (!options.lambdaName) throw new Error('delete-lambda: Please provide a options.lambdaName')

  const lambda = new Lambda({})

  return lambda.deleteFunction({
    FunctionName: options.lambdaName
  }).promise()
}
