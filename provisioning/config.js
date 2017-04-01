module.exports = {
  lambdaName: process.env.LAMBDA_NAME || 'sentinel-lambda',
  bucketName: process.env.BUCKET_NAME || 'sentinel-bucket',
  roleName: process.env.ROLE_NAME || 'sentinel-role',
  objectKey: process.env.OBJECT_KEY || 'sentinel-code.js'
}
