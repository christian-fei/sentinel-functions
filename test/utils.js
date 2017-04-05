exports.bucketExists = bucketExists
exports.codeExists = codeExists
exports.not = not
exports.config = Object.assign({}, require('../config'), {
  lambdaName: this.lambdaName + '-test',
  bucketName: this.bucketName + '-test',
  roleName: this.roleName + '-test'
})

const retry = require('p-retry')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function bucketExists (options) {
  var params = {
    Bucket: options.bucketName
  }
  return retry(() => s3.headBucket(params).promise(), {retries: 3})
  .then(() => true)
  .catch(() => false)
}

function codeExists (options) {
  var params = {
    Bucket: options.bucketName,
    Key: options.zipFileName
  }
  return retry(() => s3.headObject(params).promise(), {retries: 3})
  .then(() => true)
  .catch(() => false)
}

function not (promise) {
  return () => promise.then(bool => !bool)
}
