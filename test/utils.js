exports.bucketExists = bucketExists

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function bucketExists (bucketName) {
  var params = {
    Bucket: bucketName
  }
  return s3.headBucket(params).promise()
  .then(() => true)
  .catch(() => false)
}
