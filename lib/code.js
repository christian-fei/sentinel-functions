module.exports = {
  upload,
  destroy,
  createZip
}

const {execSync} = require('child_process')
const {readFileSync, existsSync, unlinkSync} = require('fs')
const {join} = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
const {S3} = AWS
const s3 = new S3({})

function upload (options = {}) {
  if (!options.bucketName) throw new Error('create-code: Please provide a options.bucketName')
  if (!options.zipFileName) throw new Error('create-code: Please provide a options.zipFileName')

  const {bucketName, zipFileName} = options
  const filePath = join(__dirname, '..', zipFileName)
  return s3.upload({
    Bucket: bucketName,
    Key: zipFileName,
    Body: readFileSync(filePath)
  }).promise()
}

function destroy (options = {}) {
  if (!options.bucketName) throw new Error('delete-code: Please provide a options.bucketName')
  if (!options.zipFileName) throw new Error('delete-code: Please provide a options.zipFileName')

  const {bucketName, zipFileName} = options
  return s3.deleteObject({
    Bucket: bucketName,
    Key: zipFileName
  }).promise()
}

function createZip (options = {}) {
  const filePath = join(__dirname, '..', 'sentinel')
  const zipFilePath = filePath + '.zip'

  existsSync(zipFilePath) && unlinkSync(zipFilePath)

  return new Promise((resolve, reject) => {
    try {
      resolve(execSync(`zip -r -X ../sentinel.zip *`, {
        cwd: join(__dirname, '..', 'sentinel')
      }))
    } catch (e) {
      reject(e)
    }
  })
}
