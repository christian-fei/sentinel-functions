module.exports = {
  create,
  destroy
}

const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS

function create (options = {}, s3 = new S3({})) {
  if (!options.bucketName) throw new Error('create-bucket: Please provide a options.bucketName')
  const Bucket = options.bucketName
  var params = {
    Bucket,
    ACL: 'private',
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-west-1'
    }
  }
  return s3.createBucket(params).promise()
  .catch(err => {
    if (err.name === 'BucketAlreadyOwnedByYou') {
      return Promise.resolve()
    }
    return Promise.reject(err)
  })
}

function destroy (options = {}, s3 = new S3({})) {
  if (!options.bucketName) throw new Error('delete-bucket: Please provide a options.bucketName')
  const Bucket = options.bucketName
  return s3.deleteBucket({Bucket}).promise().catch(err => err)
}
