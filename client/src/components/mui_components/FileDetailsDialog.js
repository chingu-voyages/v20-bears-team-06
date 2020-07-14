import React, { useState, useEffect } from 'react';
import { FileCard } from '../FileCard';
import { Dialog, DialogContent, DialogActions, IconButton, DialogContentText, DialogTitle, Fab, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { FILE_ACTION_MUTATION } from '../../graphql/Mutations';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    button:{
        color: theme.palette.primary.light,
        backgroundColor: 'transparent'
    }
}))


export const FileDetailsDialog = ({file, meId, handleDownloadClick, delete }) => {
    let me;
    const [open, setOpen] = useState(false);
    const { userId } = useParams();
    const [fileAction] = useMutation(FILE_ACTION_MUTATION);
    const classes = useStyles();
    if (meId){
        me = meId;
        console.log(meId);
    }

    

   
    const isOwner = file.ownerId === meId;
    const isLoggedIn = meId?true:false;
    const isOwnContent = userId === meId;

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
        const actionType = event.currentTarget.title;
        if (actionType==='download'){
            handleDownloadClick();
        }
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
                <ButtonGroup fullwidth variant='text'>
         
          <Button onClick={handleFileAction} title='favorite' color="secondary" disabled={!isLoggedIn}>
            <FavoriteIcon />
          </Button>
          {!isOwner &&
          <Button color='primary' onClick={handleFileAction} title='save' disabled={!isLoggedIn}>
              <SaveIcon />
          </Button>}
          <Button color='primary' title='download' onClick={handleFileAction} disabled={!isLoggedIn}>
              <CloudDownloadIcon />
          </Button>
          {isOwner && 
          <Button color='primary'>
              <EditIcon />
          </Button>}
          {isOwner &&<Button onClick={delete} color='primary'>
              <DeleteIcon />
          </Button>
          }
          <Button onClick={()=>setOpen(false)} color="primary">
            <CloseIcon />
          </Button>
          </ButtonGroup>
          
          </DialogActions>
        </Dialog>
        </div>


    )
}