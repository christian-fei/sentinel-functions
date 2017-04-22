module.exports = {
  lambdaName: process.env.LAMBDA_NAME || 'sentinel',
  lambdaArn: process.env.LAMBDA_ARN,
  bucketName: process.env.BUCKET_NAME || 'sentinel-bucket',
  roleName: process.env.ROLE_NAME || 'sentinel-role',
  roleArn: process.env.ROLE_ARN,
  zipFileName: process.env.ZIP_FILE_NAME || 'sentinel.zip',
  ruleName: process.env.RULE_NAME || 'sentinel-rule',
  ruleArn: process.env.RULE_ARN,
  scheduleExpression: process.env.SCHEDULE_EXPRESSION || 'rate(5 minutes)',
  eventData: {
    url: process.env.URL || 'https://google.com'
  }
}
