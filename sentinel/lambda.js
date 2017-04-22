const fetch = require('node-fetch')
const {Lambda} = require('aws-sdk')
const awsLambda = new Lambda({})

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

    console.log('preparing metrics', metrics)

    var params = {
      FunctionName: 'sentinel-worker',
      Payload: JSON.stringify(metrics)
    }
    awsLambda.invoke(params).promise()
    .then(() => {
      callback(null, metrics)
    })
    .catch((err) => {
      callback(err)
    })
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
