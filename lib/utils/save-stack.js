const {writeFileSync} = require('fs')
const {join} = require('path')

module.exports = (stackName, options) => {
  const x = writeFileSync(join(__dirname, '..', '..', `${stackName}.json`), JSON.stringify(options), 'utf8')
  console.log(x)
}
