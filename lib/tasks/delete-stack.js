
module.exports = {
  run
}

const deleteCode = require('./delete-code')
const deleteBucket = require('./delete-bucket')
const deleteRole = require('./delete-role')
const deleteLambda = require('./delete-lambda')
const {logP} = require('../utils/logger')

function run (options = {}) {
  return deleteCode.run(options)
  .then(logP('-> deleted code'))
  .then(() => deleteBucket.run(options))
  .then(logP('-> deleted bucket'))
  .then(() => deleteRole.run(options))
  .then(logP('-> deleted role'))
  .then(() => deleteLambda.run(options))
  .then(logP('-> deleted lambda'))
}
