exports.bucketExists = bucketExists
exports.codeExists = codeExists

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function bucketExists (options) {
  var params = {
    Bucket: options.bucketName
  }
  return s3.headBucket(params).promise()
  .then(() => true)
  .catch(() => false)
}

function codeExists (options) {
  var params = {
    Bucket: options.bucketName,
    Key: 'sentinel.zip'
  }
  return s3.headObject(params).promise()
  .then(() => true)
  .catch(() => false)
}
