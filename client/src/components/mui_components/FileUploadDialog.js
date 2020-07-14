import React, { useState } from 'react';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { S3_SIGN_MUTATION, NEW_UPLOAD_MUTATION } from '../../graphql/Mutations';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { uploadToS3 } from '../../utils/uploadToS3';
import { formatFileName } from '../../utils/formatFileName';
import { GET_FILES } from '../../graphql/Queries';
import { Tooltip } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'white',
    opacity: '.85',
    height: theme.spacing(3),
  },
}));

export const FileUploadDialog = ({ setUpdate, meId, iconColor, ...props }) => {
  const [open, setOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);
  
  const [newUpload] = useMutation(NEW_UPLOAD_MUTATION,{
    refetchQueries: {
      query: GET_FILES,
      variables: {userId: meId}
    }
  });
 
  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'video/vnd.uvvu.mp4',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'audio/mp4',
    'audio/mpeg',
    'image/*',
    'text/*',
  ];
  const classes = useStyles();

  

    
  
  
  async function handleFileSubmit(meId,event){
    fileObjects.forEach(async fileObject=>{
      let filename, filetype;
      let signedRequest, key;
      const file = fileObject.file;
      if (file){
        filename = formatFileName(file.name);
        filetype = file.type;
      }

      if (filename&&filetype){
        console.log(filename, filetype, meId);
        const response = await newUpload({
          variables:{
            filename,
            filetype,
            meId
          }
        });


        if (response && response.data){
          if (response.data.newFileUpload){
            let fileData = response.data.newFileUpload;
            signedRequest = fileData.signedRequest;
            const s3response = await uploadToS3(file,signedRequest);
            if (s3response && s3response.status){
              let { status } = s3response;
              if (status===200){
                console.log(event)
              }
            }
          }
        }

        
    
      }
    })
    };

    
  
  

      

  return (
    <div>
      <Tooltip  TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='Add'>
      <Fab
        className={classes.button}
        color="secondary.light"
        aria-label="add"
        {...props}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        
      </Fab>
      </Tooltip>
        <DropzoneDialogBase
        acceptedFiles={[fileTypes]}
        fileObjects={fileObjects}
        filesLimit={3}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onAdd={newFileObjs => {
          console.log('onAdd', newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={deleteFileObj => {
          console.log('onDelete', deleteFileObj);
        }}
        onSave={(event) => {
          console.log('onSave', fileObjects);
          handleFileSubmit(meId,event);
          setOpen(false);
         
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
};
