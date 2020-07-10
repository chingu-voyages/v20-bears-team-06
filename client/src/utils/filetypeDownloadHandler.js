import axios from 'axios';
import  AWS  from 'aws-sdk';
import jsDownload from 'js-file-download';






const bucket = 'chingu-bears-06';


export const filetypeDownloadHandler = (key,filetype,fileId) => {
  let success = false;
  const config = {
    region: "us-west-1",
    signatureVersion: "v4",
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey
  };
  
 const s3 = new AWS.S3(config)
  s3.getObject({
    Bucket: process.env.REACT_APP_Bucket||bucket,
    Key: key ,
    ResponseContentDisposition: `attachment; filename="${key.split("/")[1]}"`,
    ResponseContentType: 'blob'
  },(err, data) => {
    if (err) console.log(err);
    console.log(data);
    jsDownload(data.Body,`${key.split("/")[1]}`,filetype);
    success = true;

  });
  return success;
};


    

    