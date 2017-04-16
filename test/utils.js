exports.bucketExists = bucketExists
exports.codeExists = codeExists
exports.lambdaExists = lambdaExists
exports.roleExists = roleExists
exports.not = not
exports.loose = loose
const config = require('../config')
exports.config = Object.assign({}, config, {
  lambdaName: config.lambdaName + '-test',
  bucketName: config.bucketName + '-test',
  roleName: config.roleName + '-test'
})

const retry = require('p-retry')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3, IAM, Lambda} = AWS
const s3 = new S3({})
const iam = new IAM({})
const lambda = new Lambda({})

function p (cb) {
  return retry(cb, {retries: 5})
}

function bucketExists (options) {
  const params = {
    Bucket: options.bucketName
  }
  return p(() => s3.headBucket(params).promise())
  .then(() => true)
  .catch(() => false)
}

function codeExists (options) {
  const params = {
    Bucket: options.bucketName,
    Key: options.zipFileName
  }
  return p(() => s3.headObject(params).promise())
  .then(() => true)
  .catch(() => false)
}

function lambdaExists (options) {
  const params = {
    FunctionName: options.lambdaName
  }
  return p(() => lambda.getFunction(params).promise())
  .then(() => true)
  .catch(() => false)
}

function roleExists (options) {
  const params = {
    RoleName: options.roleName
  }
  return p(() => iam.getRole(params).promise())
  .then(() => true)
  .catch(() => false)
}

function not (promise) {
  return () => promise.then(bool => !bool)
}

function loose (promise) {
  return promise.then((...args) => Promise.resolve(...args)).catch(() => {})
}
