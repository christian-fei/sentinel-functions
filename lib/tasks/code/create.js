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
  if (!options.zipFileName) throw new Error('create-code: Please provide a options.zipFileName')

  const filePath = join(__dirname, '..', '..', '..', options.zipFileName)

  return s3.upload({
    Bucket: options.bucketName,
    Key: options.zipFileName,
    Body: readFileSync(filePath)
  }).promise()
}
