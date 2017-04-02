const lambda = require('./lambda')

exports.handler = (event, context, callback) => {
  lambda(event, callback)
}
