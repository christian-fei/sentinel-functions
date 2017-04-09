module.exports = {
  create,
  destroy,
  update
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS
const lambda = new Lambda({})

function create (options = {}) {
  if (!options.bucketName) throw new Error('create-lambda: Please provide a options.bucketName')
  if (!options.lambdaName) throw new Error('create-lambda: Please provide a options.lambdaName')
  if (!options.roleArn) throw new Error('create-lambda: Please provide a options.roleArn')
  if (!options.zipFileName) throw new Error('create-lambda: Please provide a options.zipFileName')

  return lambda.createFunction({
    Code: {
      S3Bucket: options.bucketName,
      S3Key: options.zipFileName
    },
    FunctionName: options.lambdaName,
    Description: 'sentinel',
    MemorySize: 128,
    Timeout: 300,
    Environment: {},
    Runtime: 'nodejs6.10',
    Publish: true,
    Role: options.roleArn,
    Handler: 'index.handler'
  }).promise()
}

function destroy (options = {}) {
  if (!options.lambdaName) throw new Error('delete-lambda: Please provide a options.lambdaName')

  return lambda.deleteFunction({
    FunctionName: options.lambdaName
  }).promise()
}

function update (options = {}) {
  if (!options.lambdaName) throw new Error('update-lambda: Please provide a options.lambdaName')
  if (!options.bucketName) throw new Error('update-lambda: Please provide a options.bucketName')
  if (!options.zipFileName) throw new Error('update-lambda: Please provide a options.zipFileName')

  var params = {
    FunctionName: options.lambdaName,
    Publish: true,
    S3Bucket: options.bucketName,
    S3Key: options.zipFileName
  }
  return lambda.updateFunctionCode(params).promise()
}
