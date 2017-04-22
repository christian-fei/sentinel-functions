const {writeFileSync} = require('fs')
const {join} = require('path')

module.exports = (stackName, options) => {
  return writeFileSync(join(__dirname, '..', '..', `${stackName}.json`), JSON.stringify(options), 'utf8')
}
