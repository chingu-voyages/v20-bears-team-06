import axios from 'axios';
const bucket = 'chingu-bears-06';


export const downloadFromS3 = async (signedRequest) => {

    

    const response = await axios.get(signedRequest);
    if (response){
        console.log(response);
        return response;
    }
}