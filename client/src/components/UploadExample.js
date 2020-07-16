import React from 'react';
import { S3_SIGN_MUTATION } from '../graphql/Mutations';
import { GET_ME } from '../graphql/Queries';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Formik, Form } from 'formik';
import { UploadComponent } from './fields/UploadField';

const useMe = () => {
  let { loading, error, data } = useQuery(GET_ME);
  if (error) console.log(error);
  if (!loading && data && data.me && data.me.id) {
    return data.me.id;
  }
};

export const formatFileName = (file) => {
  const date = moment().format('YYYYMMDD');
  const randomString = Math.random().toString(36).substring(2, 7);
  const lastDot = file.lastIndexOf('.');
  const ext = file.substring(lastDot + 1);
  const fileName = file.substring(0, lastDot);
  const cleanFileName = fileName.toLowerCase().replace(/[^0-9a-z]/gi, '-');
  const newFilename = `uploads/${date}-${randomString}-${cleanFileName}.${ext}`;
  return newFilename.substring(0, 60);
};

export const uploadToS3 = async (file, signedRequest) => {
  const options = {
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
      
    },
    observe: 'events',
    responseType: 'json',
  };
  axios.put(signedRequest, file, options)
  .then(response=>{
    console.log(response);
  })
  
};

export const UploadExample = () => {
  const [signS3] = useMutation(S3_SIGN_MUTATION);

  const meId = useMe();
  console.log(meId);

  

  

  return (
    <Formik
      initialValues={{
        files: [],
      }}
      onSubmit={async (values) => {
        const fileToUpload = values.files[0];
        const { name, type } = fileToUpload;
        const response = await signS3({
          variables: {
            filename: formatFileName(name),
            filetype: type,
            meId
          },
        });
        const { signedRequest} = response.data.signS3;

        const s3Response = await uploadToS3(fileToUpload, signedRequest);
        console.log(s3Response);
        //do the rest of mutations for post, profile, etc. using the url variable above
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <UploadComponent setFieldValue={setFieldValue} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
