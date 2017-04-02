module.exports = {
  run
}

const {IAM} = require('aws-sdk')

function run (options = {}) {
  if (!options.roleName) throw new Error('delete-role: Please provide a options.roleName')

  const {roleName} = options
  const params = {
    RoleName: roleName
  }
  const iam = new IAM({})
  return iam.deleteRole(params).promise()
}
