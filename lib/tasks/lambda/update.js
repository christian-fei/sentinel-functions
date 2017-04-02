module.exports = {
  run
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS

function run (options = {}) {
  if (!options.lambdaName) throw new Error('create-code: Please provide a options.lambdaName')
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')

  const lambda = new Lambda({})

  var params = {
    FunctionName: options.lambdaName,
    Publish: true,
    S3Bucket: options.bucketName,
    S3Key: 'sentinel.zip'
  }
  return lambda.updateFunctionCode(params).promise()
}
