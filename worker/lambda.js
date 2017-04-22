module.exports = function lambda (event, context, callback) {
  console.log('worker', event)
  callback(null)
}
