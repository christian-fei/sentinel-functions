'use strict'
module.exports = {
  run
}

const {readFileSync} = require('fs')
const {join} = require('path')
const {IAM} = require('aws-sdk')

function run (options = {}) {
  if (!options.roleName) throw new Error('create-role: Please provide a options.roleName')

  const {roleName} = options
  const documentContents = readFileSync(join(__dirname, '../policies/lambda-role.json'), 'utf8')
  const params = {
    AssumeRolePolicyDocument: documentContents,
    RoleName: roleName
  }
  const iam = new IAM({})
  return iam.createRole(params).promise()
}
