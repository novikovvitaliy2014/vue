const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp()
// const gcs = require('@google-cloud/storage')()
const {Storage} = require("@google-cloud/storage");
// const gcconfig = {
//   projectId: "beniblaproto",
//   keyFilename: "beniblaproto.json"
// };
const gcs = new Storage()
const os = require('os')
const path = require('path')
const spawn = require('child-process-promise').spawn
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize((object) => {
  // console.log(event)
  // const object = event.data
  const bucket = object.bucket
  const contentType = object.contentType
  const filePath = object.name
  console.log("changed, started")

  if(object.resourceState === 'not exist') {
    console.log('file deleted')
    return
  }
  if(path.basename(filePath).includes('resized-')) {
    console.log('already resized')
    return
  }
  const destBucket = gcs.bucket(bucket)
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath))
  const metadata = {contentType: contentType};
  return destBucket.file(filePath).download({
    destination: tmpFilePath
  }).then(()=> {
    return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath])
  }).then(()=>{
    if(filePath.includes("dataFinal")) {
        return destBucket.upload(tmpFilePath,{
          destination: 'projects/'+ path.basename(filePath) + '/' + "dataFinal/" + 'resized-' + path.basename(filePath),
          metadata: metadata
        })
    }
    if(filePath.includes("dataPhotos")) {
        return destBucket.upload(tmpFilePath,{
          destination: 'projects/'+ path.basename(filePath) + '/' + "dataPhotos/" + 'resized-' + path.basename(filePath),
          metadata: metadata
        })
    }
    return destBucket.upload(tmpFilePath,{
      destination: 'projects/'+ path.basename(filePath) + '/' + 'resized-' + path.basename(filePath),
      metadata: metadata
    })
  })
})
