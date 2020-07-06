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
import { Notifications } from '../Notifications';

const useStyles = makeStyles(theme=>({
    popoverDiv: {
        display: 'inline-block'
    }
}))

export function NotificationsPopover({meId}){
const classes = useStyles();
return (
  <PopupState variant="popover" popupId="demo-popup-popover">
    {(popupState) => (
      <div className={classes.popoverDiv}>
        <Notifications meId={meId} trigger={bindTrigger(popupState)}/>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            
          }}
        > 
          
            <AddSpecialtyForm />
          
        </Popover>
      </div>
    )}
  </PopupState>
);
}