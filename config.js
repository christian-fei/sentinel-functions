module.exports = {
  lambdaName: process.env.LAMBDA_NAME || 'sentinel',
  bucketName: process.env.BUCKET_NAME || 'sentinel-bucket',
  roleName: process.env.ROLE_NAME || 'sentinel-role'
}
