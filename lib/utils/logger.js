exports.log = log
exports.logP = logP

function log (...args) {
  console.log(...args)
}

function logP (...logArgs) {
  return function (...promiseArgs) {
    if (logArgs[0] instanceof Function) {
      log(logArgs[0].apply(null, promiseArgs))
      return Promise.resolve(...promiseArgs)
    }
    log(...logArgs)
    return Promise.resolve(...promiseArgs)
  }
}
