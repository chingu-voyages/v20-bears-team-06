import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Icon, SvgIcon, makeStyles, CardHeader, Divider, AppBar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import GridOnIcon from '@material-ui/icons/GridOn';
import NoteIcon from '@material-ui/icons/Note';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconBadge} from './IconBadge';
const textFiles = ['txt','doc','docx','gdoc'];
const videoFiles = ['mp4','mov','avi'];
const spreadsheetFiles = ['csv','xls','xlsx','gsheet'];
const documentFiles = ['pdf','ppt','gslides'];
const audioFiles = ['mp3','wav','flac'];


const FileGridItem = () => (
    <Grid  item xs={4} md={3}/>
)

const FileCardIcon = ({filetype}) =>{
    if(filetype){
    if (videoFiles.includes(filetype)){
        return <VideoLabelIcon color='primary' fontSize='small' />
    }else if (spreadsheetFiles.includes(filetype)){
        return <GridOnIcon color='primary' fontSize='small' />
    }else if (documentFiles.includes(filetype)){
        return <SlideshowIcon color='primary' fontSize='small' />
    }else if (audioFiles.includes(filetype)){
        return <MicIcon color='primary' fontSize='small'/>
    }else {
        
            return <NoteIcon color='primary' fontSize='small' />
    }
}
}

const useStyles = makeStyles((theme)=>({
    card: {
        '& i':{
            fontSize: theme.spacing(5)
        },
        padding: theme.spacing(2)
    },
    bottomBar: {
        paddingTop: theme.spacing(2)
    }
}))


export const FileCard= ({file}) => {
    const classes = useStyles();
    console.log(file)
    return (
        <Card variant='outlined' className={classes.card}>
            <CardActionArea>
            <CardHeader avatar={<FileCardIcon align='center' filetype={file&&file.filetype} />} title={file&&file.filename} />
            <CardContent>
                <Typography variant='body1' color="primary">{file&&file.filename}</Typography>
            </CardContent>
            <Divider />
           
            </CardActionArea>
            <Grid className={classes.bottomBar} container  xs={12} direction='row' justify='center' alignItems='space-between'>
                <Grid xs={4} align='center' item><IconBadge children={<CloudDownloadIcon  fontSize='small' color='primary'/>} count={file&&file.download_count}/></Grid>
                <Grid xs={4} align='center' item><IconBadge children={<FavoriteIcon   fontSize='small' color='primary' />} count={file&&file.likes}/></Grid>
                <Grid xs={4} align='center' item><DeleteIcon  fontSize='small' color='primary' /></Grid>
            </Grid>
        </Card>
        
    )
};