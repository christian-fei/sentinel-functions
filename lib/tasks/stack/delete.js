module.exports = {
  run
}

const deleteCode = require('../code/delete')
const deleteBucket = require('../bucket/delete')
const deleteRole = require('../role/delete')
const deleteLambda = require('../lambda/delete')
const {logP} = require('../../utils/logger')

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