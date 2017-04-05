module.exports = {
  run
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS

function run (options = {}) {
  if (!options.lambdaName) throw new Error('update-lambda: Please provide a options.lambdaName')
  if (!options.bucketName) throw new Error('update-lambda: Please provide a options.bucketName')
  if (!options.zipFileName) throw new Error('update-lambda: Please provide a options.zipFileName')

  const lambda = new Lambda({})

  var params = {
    FunctionName: options.lambdaName,
    Publish: true,
    S3Bucket: options.bucketName,
    S3Key: options.zipFileName
  }
  return lambda.updateFunctionCode(params).promise()
}
