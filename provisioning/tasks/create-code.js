'use strict'
module.exports = {
  run
}

const {createReadStream} = require('fs')
const {join} = require('path')
const {S3} = require('aws-sdk')
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('create-code: Please provide a options.objectKey')

  const filePath = join(__dirname, '..', 'bucket', options.objectKey)

  return s3.upload({
    Bucket: options.bucketName,
    Key: options.objectKey,
    Body: createReadStream(filePath),
    ACL: 'private'
  }).promise()
}
