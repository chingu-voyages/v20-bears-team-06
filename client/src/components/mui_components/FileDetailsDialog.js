import React, { useState, useEffect } from 'react';
import { FileCard } from '../FileCard';
import { Dialog, DialogContent, DialogActions, IconButton, DialogContentText, DialogTitle, Fab, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { GET_ME_CACHE} from '../../graphql/Queries';
import DeleteIcon from '@material-ui/icons/Delete';
import { FILE_ACTION_MUTATION, DELETE_FILE, REMOVE_FAV_FILE, REMOVE_SAVED_FILE } from '../../graphql/Mutations';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useParams } from 'react-router-dom';
import { s3deleteFile } from '../../utils/s3deleteFile';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { EditFileDialog } from './EditFileDialog';


const useStyles = makeStyles((theme)=>({
    button:{
        color: theme.palette.primary.light,
        backgroundColor: 'transparent'
    },
    editSpan: {
        float: 'right'
    }
}))


export const FileDetailsDialog = ({file, handleDownloadClick, toDisplay }) => {
    let meId;
    const { data, loading, error } = useQuery(GET_ME_CACHE);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen ] = useState(false);
    const { userId } = useParams();
    const [fileAction] = useMutation(FILE_ACTION_MUTATION);
    const [delFile] = useMutation(DELETE_FILE);
    const [rmSaved] = useMutation(REMOVE_SAVED_FILE);
    const [rmFaved] = useMutation(REMOVE_FAV_FILE);
    const classes = useStyles();
    
    if (error) console.log(error);
    if (!loading && data){
        meId = data.me.id;
    }

    

   
    const isOwner = file.ownerId === meId;
    const isLoggedIn = meId?true:false;
    const isOwnContent = userId === meId;
    const isSaved = meId&&file.savedByIds.includes(meId);
    const isFaved = meId&&file.favoritedByIds.includes(meId);

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

    const handleDeleteClick = async (fileId, key) => {
        const response = await delFile({
          variables:{fileId}
        });
        if (response&&response.data){
            s3deleteFile(key);
        }
    };

    const handleUnsaveClick = async (meId, fileId) => {
        const response = await rmSaved({
            variables:{meId, fileId}
        });
        console.log(response);
    }

    const handleUnfavClick = async (meId, fileId) =>{
        const response = await rmFaved({
            variables: {meId, fileId}
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
            <DialogTitle id='form-dialog-title'>File Details {isOwner && 
          <EditFileDialog fileId={file.id} /> }
          </DialogTitle>
            
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
                
          {isFaved&&<Button onClick={()=>handleUnfavClick(meId,file.id)} title='favorite' color="secondary" disabled={!isLoggedIn}>
            <FavoriteIcon />
          </Button>}
          {!isFaved&&<Button disabled={!isLoggedIn} onClick={handleFileAction} title='favorite' color='primary'>
              <FavoriteBorderIcon />
              </Button>}
          {!isOwner &&
          <Button color='primary' onClick={handleFileAction} title='save' disabled={!isLoggedIn}>
              <SaveIcon />
          </Button>}
          <Button color='primary' title='download' onClick={handleFileAction} disabled={!isLoggedIn}>
              <CloudDownloadIcon />
          </Button>
          
          {isOwner&&toDisplay==='user'&&<Button onClick={()=>handleDeleteClick(file.id, file.key)} color='primary'>
              <DeleteIcon />
          </Button>
          }
          {meId===userId&&toDisplay==='saved'&&<Button onClick={() =>handleUnsaveClick(meId, file.id)} color='primary'>
              <HighlightOffIcon /></Button>}
          <Button onClick={()=>setOpen(false)} color="primary">
            <CloseIcon />
          </Button>
          </ButtonGroup>
          
          </DialogActions>
        </Dialog>
        </div>


    )
}