const {join} = require('path')
const {execSync} = require('child_process')
const {existsSync, unlinkSync} = require('fs')

module.exports = {
  run
}

function run (options = {}) {
  const filePath = join(__dirname, '..', '..', '..', 'sentinel')
  const zipFilePath = filePath + '.zip'

  existsSync(zipFilePath) && unlinkSync(zipFilePath)

  return new Promise((resolve, reject) => {
    try {
      resolve(execSync(`zip sentinel.zip -j -r sentinel/* sentinel/node_modules`, {
        cwd: join(__dirname, '..', '..', '..')
      }))
    } catch (e) {
      reject(e)
    }
  })
}
