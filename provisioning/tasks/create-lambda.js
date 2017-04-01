'use strict'

module.exports = {
  run
}

const AWS = require('aws-sdk')
AWS.config.region = 'eu-central-1'
const {Lambda} = AWS

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-bucket: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('create-bucket: Please provide a options.objectKey')
  if (!options.lambdaName) throw new Error('create-bucket: Please provide a options.lambdaName')
  if (!options.roleName) throw new Error('create-bucket: Please provide a options.roleName')
  if (!options.regionName) throw new Error('create-bucket: Please provide a options.regionName')

  const lambda = new Lambda({})

  return lambda.createFunction({
    Code: {
      S3Bucket: options.bucketName,
      S3Key: options.objectKey,
      S3ObjectVersion: '1'
    },
    FunctionName: options.lambdaName,
    Description: 'sentinel code',
    MemorySize: 128,
    Timeout: 300,
    Environment: {},
    Runtime: 'nodejs6.10',
    Publish: true,
    Role: options.roleName,
    Handler: 'sentinel-code.index'
  }).promise()
}
