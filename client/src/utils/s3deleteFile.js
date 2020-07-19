import axios from 'axios';
import  AWS  from 'aws-sdk';


export const s3deleteFile = (key) =>{
    const config = {
    region: "us-west-1",
    signatureVersion: "v4",
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey
    };

    const s3 = new AWS.S3(config);

    s3.deleteObject( 
        {Bucket:process.env.REACT_APP_Bucket,
        Key: key},(err,data)=>{
            if (err) console.log(err);
        });
}
