const fetch = require('node-fetch')
module.exports = function lambda (event, context, callback) {
  console.log('-- event', event)
  console.log('-- context', context)

  const duration = start()
  return fetch(event.url)
  .then((response) => {
    const responseTime = duration()
    const statusCode = response.status
    const metrics = {
      statusCode,
      responseTime
    }
    console.log(metrics)
    callback(null, metrics)
  })
  .catch(callback)
}

function start () {
  const start = Date.now()
  return function stop () {
    const end = Date.now()
    return end - start
  }
}
