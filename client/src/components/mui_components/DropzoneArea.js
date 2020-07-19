import React from 'react';
import {
  
  DropzoneAreaBase,
} from 'material-ui-dropzone';
import {  makeStyles, useTheme } from '@material-ui/core';
import { useField } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';






export const DropZoneField = ({ label, type, name, ...props }) => {
  const theme= useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  let alertSnackbarProps = null;
  if (matches){
    alertSnackbarProps = {
      anchorOrigin: { vertical: 'top', horizontal: 'center' },

    }
  }
  const [field, meta, helpers] = useField('file');
  const {setValue} = helpers;

  
 
 

  return (
    <DropzoneAreaBase
      inputProps={{name:'file'}}
      acceptedFiles={['image/*']}
      dropzoneText={'Drag and drop a profile image here or click'}
      filesLimit={1}
      onAdd={(newFiles) =>{setValue(newFiles)}}
      alertSnackbarProps={alertSnackbarProps}
    />
  );
};







