import React from 'react';
import {
  
  DropzoneAreaBase,
} from 'material-ui-dropzone';
import {  makeStyles } from '@material-ui/core';
import { useField } from 'formik';



export const DropZoneField = ({ label, type, name, ...props }) => {
  const [field, meta, helpers] = useField('file');
  console.log(field,meta);
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







