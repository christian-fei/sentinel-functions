module.exports = {
  run
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-bucket: Please provide a options.bucketName')
  if (!options.lambdaName) throw new Error('create-bucket: Please provide a options.lambdaName')
  if (!options.roleArn) throw new Error('create-bucket: Please provide a options.roleName')

  const lambda = new Lambda({})
  return lambda.createFunction({
    Code: {
      S3Bucket: options.bucketName,
      S3Key: 'sentinel.zip'
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
