
module.exports = {
  run
}

const {S3} = require('aws-sdk')
const s3 = new S3({})

function run (options = {}) {
  if (!options.bucketName) throw new Error('delete-code: Please provide a options.bucketName')
  if (!options.objectKey) throw new Error('delete-code: Please provide a options.objectKey')

  const {bucketName, objectKey} = options
  return s3.deleteObject({
    Bucket: bucketName,
    Key: objectKey
  }).promise()
  .then(() => {
    return s3.deleteObject({
      Bucket: bucketName,
      Key: objectKey + '.zip'
    }).promise()
  })
}
