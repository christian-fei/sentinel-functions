module.exports = {
  run
}

const {S3} = require('aws-sdk')

function run (options = {}) {
  if (!options.bucketName) throw new Error('delete-bucket: Please provide a options.bucketName')

  const {bucketName} = options
  const s3 = new S3({})

  var params = {
    Bucket: bucketName
  }
  return s3.deleteBucket(params).promise()
}
