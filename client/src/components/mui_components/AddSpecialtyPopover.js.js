import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddSpecialtyForm } from './AddSpecialtyForm';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';



import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const useStyles = makeStyles((theme)=>({
  popover : {
    display: 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
  }
 
}))

export default function AddSpecialtyPopover() {
  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Chip variant="outlined" label='add new' icon={<AddCircleIcon color='action' />} color="primary" {...bindTrigger(popupState)}/>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            PaperProps={{
              className : classes.popover
            }}
          > 
            <Grid container xs={12}>
              <AddSpecialtyForm />
            </Grid>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}