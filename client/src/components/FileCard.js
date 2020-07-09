import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Icon, SvgIcon, makeStyles, CardHeader, Divider, AppBar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import GridOnIcon from '@material-ui/icons/GridOn';
import NoteIcon from '@material-ui/icons/Note';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import ImageIcon from '@material-ui/icons/Image';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconBadge} from './IconBadge';
import { downloadFromS3 } from '../utils/downloadFromS3';
import { useMutation } from '@apollo/react-hooks';
import { GET_SIGNED_DOWNLOAD } from '../graphql/Mutations';

const isApp = new RegExp('^application','gi');
const isImage = new RegExp('^image','gi');
const isAudio = new RegExp('^audio','gi');
const isVideo = new RegExp('^video','gi');
const isText = new RegExp('^text','gi');


const FileGridItem = () => (
    <Grid  item xs={4} md={3}/>
)

const FileCardIcon = ({filetype}) =>{
    if (isApp.test(filetype)){
        return <SlideshowIcon color="primary" />
    }

    if (isImage.test(filetype)){
        return <ImageIcon color="primary" />
    }

    if (isText.test(filetype)){
        return <NoteIcon color="primary" />
    }

    if (isAudio.test(filetype)){
        return <MicIcon color="primary" />
    }

    if (isVideo.test(filetype)){
        return <VideoLabelIcon color="primary" />
    }

    return <NoteIcon color="primary" />
}

const useStyles = makeStyles((theme)=>({
    card: {
        '& i':{
            fontSize: theme.spacing(4)
        },
        [theme.breakpoints.up('xs')]:{
            maxHeight: '35vh'
        },
        [theme.breakpoints.up('md')]:{
            maxHeight: theme.spacing(20)
        }
    },
    cardContent: {
        height: '80%',
        padding: '0px'
    },
    cardHeader : {
        padding: theme.spacing(1)
    },
    bottomBar: {
        paddingTop: theme.spacing(2)
    }
}))


export const FileCard= ({file}) => {

    const [signDownload] = useMutation(GET_SIGNED_DOWNLOAD);
    const classes = useStyles();
    let titleString = (file&&file.filename)||"";
    titleString = titleString.length>20?titleString.slice(0,17)+"...":titleString;
    const title = <Typography variant='caption2' color='primary'>
        {titleString}
    </Typography>;

    

    const fileId = file.id;

    async function handleDownloadClick(){
        let signedRequest;
        let serverResponse = await signDownload({
            variables: {fileId}
        });
        console.log(serverResponse);
        if (serverResponse&&serverResponse.data){
            let { data } = serverResponse;
            if (data.s3download){
                signedRequest = data.s3download.signedRequest;
            }
            if (signedRequest){
                let s3response = await downloadFromS3(signedRequest);
                console.log(s3response);
            }
        }

        
    }
    return (
        <Card variant='outlined' className={classes.card}>
            <CardActionArea className={classes.cardContent} onClick={handleDownloadClick}>
            <CardHeader className={classes.cardHeader} size='small' align='center'  title={title} />
            <CardContent align='center'>
            <FileCardIcon align='center' filetype={file&&file.filetype} />
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