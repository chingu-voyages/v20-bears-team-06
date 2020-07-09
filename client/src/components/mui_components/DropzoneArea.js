import React, {useState} from 'react';
import {
  DropzoneDialog,
  DropzoneAreaBase,
} from 'material-ui-dropzone';
import { Button, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import {S3_SIGN_MUTATION } from '../../graphql/Mutations';
import { useField } from 'formik';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { uploadToS3 } from '../../utils/uploadToS3';
import { formatFileName } from '../../utils/formatFileName';



export const DropZoneField = ({ label, type, name, ...props }) => {
  const [field, meta, helpers] = useField('file');
  const {setValue} = helpers;
  
 
 

  return (
    <DropzoneAreaBase
      inputProps={{name:'file'}}
      acceptedFiles={['image/*']}
      dropzoneText={'Drag and drop a profile image here or click'}
      filesLimit={1}
      onAdd={(newFiles) =>{console.log(newFiles); setValue(newFiles)}}
      onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
    />
  );
};


const useStyles = makeStyles(theme=>({
  button:{
    backgroundColor: 'white',
    opacity: '.85',
    height: theme.spacing(3),
  }
}));




