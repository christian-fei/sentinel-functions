module.exports = {
  run
}

const Code = require('../code')
const Bucket = require('../bucket')
const deleteRole = require('../role/delete')
const deleteLambda = require('../lambda/delete')
const {logP} = require('../../utils/logger')

function run (options = {}) {
  return Code.destroy(options)
  .then(logP('-> deleted code'))
  .then(() => Bucket.destroy(options))
  .then(logP('-> deleted bucket'))
  .then(() => deleteRole.run(options))
  .then(logP('-> deleted role'))
  .then(() => deleteLambda.run(options))
  .then(logP('-> deleted lambda'))
}
