module.exports = {
  create,
  addInvokePermission,
  getConfiguration,
  destroy,
  update
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {Lambda} = AWS

function create (options = {}, lambda = new Lambda({})) {
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

function addInvokePermission (options = {}, lambda = new Lambda({})) {
  if (!options.lambdaName) throw new Error('add-invoke-lambda-permission: Please provide a options.lambdaName')
  if (!options.ruleArn) throw new Error('add-invoke-lambda-permission: Please provide a options.ruleArn')

  return lambda.addPermission({
    Action: 'lambda:InvokeFunction',
    FunctionName: options.lambdaName,
    Principal: 'events.amazonaws.com',
    SourceArn: options.ruleArn,
    // Qualifier: options.version,
    StatementId: `${options.lambdaName}-access-${Date.now()}`
  }).promise()
}

function getConfiguration (options = {}, lambda = new Lambda({})) {
  if (!options.lambdaName) throw new Error('get-lambda-configuration: Please provide a options.lambdaName')
  return lambda.getFunctionConfiguration({
    FunctionName: options.lambdaName // , Qualifier: options.qualifier
  }).promise()
}

function destroy (options = {}, lambda = new Lambda({})) {
  if (!options.lambdaName) throw new Error('delete-lambda: Please provide a options.lambdaName')

  return lambda.deleteFunction({
    FunctionName: options.lambdaName
  }).promise()
}

function update (options = {}, lambda = new Lambda({})) {
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
