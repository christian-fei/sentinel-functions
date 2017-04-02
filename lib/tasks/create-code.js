module.exports = {
  run
}

const {readFileSync} = require('fs')
const {join} = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('create-code: Please provide a options.objectKey')

  const filePath = join(__dirname, '..', '..', options.objectKey)

  return s3.upload({
    Bucket: options.bucketName,
    Key: options.objectKey + '.zip',
    Body: readFileSync(filePath + '.zip')
  }).promise()
}
