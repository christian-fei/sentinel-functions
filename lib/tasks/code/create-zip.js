const archiver = require('archiver')
const {join} = require('path')
const {createWriteStream, existsSync, unlinkSync} = require('fs')

module.exports = {
  run
}

function run (options = {}) {
  const filePath = join(__dirname, '..', '..', '..', 'sentinel')
  const zipFilePath = filePath + '.zip'

  existsSync(zipFilePath) && unlinkSync(zipFilePath)

  const archive = archiver.create('zip', {})
  const zipStream = createWriteStream(zipFilePath)

  return new Promise((resolve, reject) => {
    zipStream.on('close', () => {
      resolve(zipFilePath)
    })
    archive.pipe(zipStream)
    archive.directory('sentinel', {file: 'sentinel.zip'})
    archive.on('error', e => reject(e))
    archive.finalize()
  })
}
