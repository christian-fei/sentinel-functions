module.exports = {
  run
}

const {readFileSync} = require('fs')
const {join} = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {IAM} = AWS

function run (options = {}) {
  if (!options.roleName) throw new Error('create-role: Please provide a options.roleName')

  const {roleName} = options
  const documentContents = readFileSync(join(__dirname, '..', '..', '..', 'policies/lambda.json'), 'utf8')
  const params = {
    AssumeRolePolicyDocument: documentContents,
    RoleName: roleName
  }
  const iam = new IAM({})
  return iam.createRole(params).promise()
}
