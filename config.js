module.exports = {
  sentinelName: process.env.SENTINEL_NAME || 'sentinel',
  lambdaName: process.env.LAMBDA_NAME || 'sentinel-dashboard',
  bucketName: process.env.BUCKET_NAME || 'sentinel-dashboard-bucket-2',
  roleName: process.env.ROLE_NAME || 'sentinel-dashboard-role',
  zipFileName: process.env.ZIP_FILE_NAME || 'sentinel.zip',
  ruleName: process.env.RULE_NAME || 'sentinel-dashboard-rule',
  scheduleExpression: process.env.SCHEDULE_EXPRESSION || 'rate(5 minutes)',
  eventData: {
    url: process.env.URL || 'https://christianfei.com'
  }
}
