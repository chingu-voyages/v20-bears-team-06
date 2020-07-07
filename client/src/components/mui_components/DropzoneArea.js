import React, { Component } from 'react';
import {
  DropzoneArea,
  DropzoneDialog,
  DropzoneAreaBase,
} from 'material-ui-dropzone';
import { Button, makeStyles } from '@material-ui/core';
import { useField } from 'formik';

export class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  render() {
    return <DropzoneArea onChange={this.handleChange.bind(this)} />;
  }
}

export class DropZoneDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen.bind(this)}>Add Image</Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

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


