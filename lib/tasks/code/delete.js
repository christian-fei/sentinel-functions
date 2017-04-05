module.exports = {
  run
}

const {S3} = require('aws-sdk')
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('delete-code: Please provide a options.bucketName')
  if (!options.zipFileName) throw new Error('delete-code: Please provide a options.zipFileName')

  const {bucketName} = options
  return s3.deleteObject({
    Bucket: bucketName,
    Key: options.zipFileName
  }).promise()
}
