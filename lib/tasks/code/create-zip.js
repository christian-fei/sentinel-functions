const archiver = require('archiver')
const {join} = require('path')
const {createWriteStream, existsSync, unlinkSync} = require('fs')

module.exports = {
  run
}

function run (options = {}) {
  if (!options.objectKey) throw new Error('create-zip: Please provide a options.objectKey')
  const filePath = join(__dirname, '..', '..', '..', options.objectKey)
  const zipFilePath = filePath + '.zip'

  existsSync(zipFilePath) && unlinkSync(zipFilePath)

  const archive = archiver.create('zip', {})
  const zipStream = createWriteStream(zipFilePath)

  return new Promise((resolve, reject) => {
    zipStream.on('close', () => {
      resolve(zipFilePath)
    })
    archive.pipe(zipStream)
    archive.file('sentinel-code.js', {file: 'sentinel-code.js'})
    archive.on('error', e => reject(e))
    archive.finalize()
  })
}
