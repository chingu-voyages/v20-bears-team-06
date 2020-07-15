import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core';
import { EDIT_FILE_DETAILS } from '../../graphql/Mutations';
import { useMutation } from '@apollo/react-hooks';


const gradeLevels = [
  {
    value: '1st',
    label: 'First Grade',
  },
  { value: '2nd', label: 'Second Grade' },
  { value: '3rd', label: 'Third Grade' },
  { value:'4th', label: 'Fourth Grade'},
  {value: '5th', label: 'Fifth Grade'},
  {value: '6th', label: 'Sixth Grade'},
  {value: '7th', label: 'Seventh Grade'},
  {value: '8th', label: 'Eighth Grade'},
  {value: '9th', label: 'Ninth Grade'},
  {value: '10th', label:'Tenth Grade'},
  {value: '11th', label:'Eleventh Grade'},
  {value: '12th', label: 'Twelfth Grade'},
  {value: 'undergrad', label: 'Undergraduate'},
  {value: 'grad', label: 'Post Graduate'}
];

const useStyles = makeStyles(theme=>({
    editButton: {
        
    }
}))

export const EditFileDialog = ({fileId}) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    filename: '',
    category: '',
    gradeLevel: '',
    description: '',
    fileId
  });

  const [editFile] = useMutation(EDIT_FILE_DETAILS);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setValues(Object.assign({},values,{[event.target.id]:event.target.value}));
    console.log(values);
  };

  const handleSelectChange = (event) => {
      setValues(Object.assign({},values,{[event.target.name]:event.target.value}));
      console.log(values);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
      const response = await editFile({
          variables: {...values}
      });
      
      if (response){
          handleClose();
      }
  }

  const classes = useStyles();

  return (
    <span>
      <IconButton edge='start' className={classes.editButton} size='small'   color="primary" onClick={handleClickOpen}>
        <EditIcon fontSize='small' />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle color='primary' id="form-dialog-title">Edit File Details</DialogTitle>
        <DialogContent>
          <DialogContentText color='primary'>
            Edit File Details here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="File Title"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="File Category"
            type="text"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            id="gradeLevel"
            name='gradeLevel'
            select
            label="Grade Level"
            value={values.gradeLevel}
            onChange={handleSelectChange}
            helperText="Select Grade Level"
          >
            {gradeLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="File Description"
            type="textarea"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
