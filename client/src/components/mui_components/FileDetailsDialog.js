import React, { useState, useEffect } from 'react';
import { FileCard } from '../FileCard';
import { Dialog, DialogContent, DialogActions, IconButton, DialogContentText, DialogTitle, Fab, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { FILE_ACTION_MUTATION } from '../../graphql/Mutations';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme)=>({
    button:{
        color: theme.palette.primary.light,
        backgroundColor: 'transparent'
    }
}))


export const FileDetailsDialog = ({file, meId}) => {
    let me;
    const [open, setOpen] = useState(false);
    const [fileAction] = useMutation(FILE_ACTION_MUTATION);
    const classes = useStyles();
    if (meId){
        me = meId;
        console.log(meId);
    }

   
    const isOwner = file.ownerId === meId;

    let specialties = "";
    if (file&&file.specialties){
        let len = file.specialties.length-1;
        file.specialties.forEach((el,i)=>{
            if (i===len){
                specialties+=`${el.title} `
            }else{
            specialties+=`${el.title} ,`
            }
        })
    }

    const handleFileAction = async (event) =>{
        console.log(event.currentTarget);
        const actionType = event.currentTarget.title;
        const response = await fileAction({
            variables:{
                userId: meId,
                fileId: file.id,
                actionType: actionType
            }
        });

        console.log(response);
        
    }

    return (
        <div>
            <IconButton
        className={classes.button}
        color="secondary.light"
        aria-label="details"
        size='small'
        
        onClick={() => setOpen(true)}
      >
        <MoreHorizIcon />
        
      </IconButton>

        <Dialog open={open}  aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>File Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    
                <Typography variant='body2' color='textPrimary'>Name:   {file&&file.filename}</Typography>
                <Typography variant='body2' color='textPrimary'>Uploaded On:   {file&&file.date}</Typography>
                <Typography variant='body2' color='textPrimary'>Categories:   {file.specialties&&specialties}</Typography>
                <Typography variant='body2' color='textPrimary'>Downloads:   {file&&file.download_count}</Typography>
                <Typography variant='body2' color='textPrimary'>Favorites:   {file&&file.favorite_count}</Typography>
                <Typography variant='body2' color='textPrimary'>Grade Level:   {file&&file.gradeLevel}</Typography>
                

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
          <Button onClick={()=>setOpen(false)} color="primary">
            <CloseIcon />
          </Button>
          <Button onClick={handleFileAction} title='favorite' color="primary">
            <FavoriteIcon />
          </Button>
          <Button color='primary' onClick={handleFileAction} title='save'>
              <SaveAltIcon />
          </Button>
          <Button color='primary'>
              <CloudDownloadIcon />
          </Button>
          {isOwner &&
          <Button color='primary'>
              <EditIcon />
          </Button>}
          </ButtonGroup>
          </DialogActions>
        </Dialog>
        </div>


    )
}