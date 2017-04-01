'use strict'
module.exports = {
  run
}

const {createReadStream} = require('fs')
const {join} = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('create-code: Please provide a options.objectKey')

  const filePath = join(__dirname, '..', 'bucket', options.objectKey)

  return s3.upload({
    Bucket: options.bucketName,
    Key: options.objectKey,
    Body: createReadStream(filePath, 'utf8'),
    ACL: 'private'
  }).promise()
  .then(() => {
    console.log(`created ${options.objectKey}`)
    return s3.putObject({
      Bucket: options.bucketName,
      Key: options.objectKey + '.zip',
      Body: createReadStream(filePath + '.zip', 'utf8'),
      ACL: 'private'
    }).promise()
    .then(() => {
      console.log(`created ${options.objectKey}.zip`)
    })
  })
}
