'use strict'
module.exports = {
  run
}

const {S3} = require('aws-sdk')
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('create-code: Please provide a options.objectKey')

  const {bucketName, objectKey} = options
  return s3.delete({
    Bucket: bucketName,
    Key: objectKey
  }).promise()
}
