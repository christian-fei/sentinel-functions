'use strict'
module.exports = {
  run
}

const {S3} = require('aws-sdk')

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-bucket: Please provide a options.bucketName')

  const {bucketName} = options
  const s3 = new S3({})

  var params = {
    Bucket: bucketName,
    ACL: 'private',
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-west-1'
    }
  }
  return s3.createBucket(params).promise()
}
