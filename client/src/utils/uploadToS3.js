import axios from 'axios';

export const uploadToS3 = async (file, signedRequest) => {
  let s3Response;
    const options = {
      headers: {
        'Content-Type': file.type,
        'x-amz-acl': 'public-read',
      },
    };
    const response = await axios.put(signedRequest, file, options);
    if (response){
      return response;
    }
    

    
  };