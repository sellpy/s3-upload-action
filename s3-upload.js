const fs = require('fs')
const githubActions = require('@actions/core')
const { Upload } = require('@aws-sdk/lib-storage')
const { S3 } = require('@aws-sdk/client-s3')
const { lookup } = require('mime-types')

const AWS_SECRET_ACCESS_KEY_ID = githubActions.getInput('aws_secret_access_key_id', {
  required: true,
})
const AWS_SECRET_ACCESS_KEY = githubActions.getInput('aws_secret_access_key', {
  required: true,
})
const BUCKET = githubActions.getInput('aws_bucket', {
  required: true,
})
const AWS_REGION = githubActions.getInput('aws_region', {
  required: false,
})
const ACL = githubActions.getInput('acl', {
  required: false,
})
const SOURCE_FILE_PATH = githubActions.getInput('source_file_path', {
  required: true,
})
const DESTINATION_FILE_PATH = githubActions.getInput('destination_file_path', {
  required: true,
})

const s3 = new S3({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_SECRET_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

const uploadFile = async () => {
  const fileStream = fs.createReadStream(SOURCE_FILE_PATH);
  try {
    const uploadInfo = await new Upload({
      client: s3,
      params: {
        Bucket: BUCKET,
        ACL,
        Key: DESTINATION_FILE_PATH,
        Body: fileStream,
        ContentType: lookup(SOURCE_FILE_PATH),
      },
    }).done()
    githubActions.info(`File uploaded successfully. ${uploadInfo.Key} ${uploadInfo.Location}}`)
  } catch (error) {
    githubActions.error(error)
    githubActions.setFailed(error.message)
  }
}

uploadFile()

