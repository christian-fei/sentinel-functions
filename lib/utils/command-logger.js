exports.success = success
exports.failure = failure

const {log} = require('./logger')

function success (message) {
  return log('\x1b[32m' + message + '\x1b[0m')
}
function failure (message) {
  return log('\x1b[31m' + message + '\x1b[0m')
}
