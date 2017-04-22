const {deepEqual} = require('assert')
const saveStack = require('../lib/utils/save-stack')
const {readFileSync} = require('fs')
const {join} = require('path')

test('save-stack', () => {
  const stackTest = {
    lambdaName: 'sentinel',
    lambdaArn: 'process.env.LAMBDA_ARN',
    bucketName: 'sentinel-bucket',
    roleName: 'sentinel-role',
    roleArn: 'process.env.ROLE_ARN',
    zipFileName: 'sentinel.zip',
    ruleName: 'sentinel-rule',
    ruleArn: 'process.env.RULE_ARN',
    scheduleExpression: 'rate(5 minutes)'
  }
  saveStack('stack-test', stackTest)
  const x = readFileSync(join(__dirname, '..', 'stack-test.json'))
  const contents = x.toString().trim()
  const savedStack = JSON.parse(contents)
  deepEqual(savedStack, stackTest)
})
