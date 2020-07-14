
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Badge,
  Icon,
  SvgIcon,
  makeStyles,
  CardHeader,
  Divider,
  AppBar,
} from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import GridOnIcon from '@material-ui/icons/GridOn';
import NoteIcon from '@material-ui/icons/Note';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import ImageIcon from '@material-ui/icons/Image';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconBadge } from './IconBadge';
import { filetypeDownloadHandler } from '../utils/filetypeDownloadHandler';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { FileDetailsDialog } from './mui_components/FileDetailsDialog';
import { DELETE_FILE } from '../graphql/Mutations';

const isApp = new RegExp('^application', 'gi');
const isImage = new RegExp('^image', 'gi');
const isAudio = new RegExp('^audio', 'gi');
const isVideo = new RegExp('^video', 'gi');
const isText = new RegExp('^text', 'gi');

const FileGridItem = () => <Grid item xs={4} md={3} />;

const FileCardIcon = ({ filetype }) => {
  if (isApp.test(filetype)) {
    return <SlideshowIcon color="primary" />;
  }

  if (isImage.test(filetype)) {
    return <ImageIcon color="primary" />;
  }

  if (isText.test(filetype)) {
    return <NoteIcon color="primary" />;
  }

  if (isAudio.test(filetype)) {
    return <MicIcon color="primary" />;
  }

  if (isVideo.test(filetype)) {
    return <VideoLabelIcon color="primary" />;
  }

  return <NoteIcon color="primary" />;
};

const useStyles = makeStyles((theme) => ({
  card: {
    '& i': {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('xs')]: {
      maxHeight: '35vh',
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: theme.spacing(20),
    },
  },
  cardContent: {
    height: '80%',
    padding: '0px',
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  bottomBar: {
    paddingTop: theme.spacing(2),
  },

  popper: {
    backgroundColor: theme.palette.primary.light,
    opacity: '.8',
    minWidth: theme.spacing(15)
  },
  tooltipArrow: {
    backgroundColor: theme.palette.primary.light,
    opacity: '.8',
  },
  tooltipText: {
    backgroundColor: theme.palette.primary.light
  },
}));

export const FileCard = ({ file, isOwnProfile, meId, increment }) => {
  
  const [key, setKey] = useState(file.key);
  const classes = useStyles();
  let titleString = (file && file.filename) || '';
  titleString =
    titleString.length > 20 ? titleString.slice(0, 17) + '...' : titleString;
  const title = (
    <Typography variant="caption2" color="primary">
      {titleString}
    </Typography>
  );

  
  const fileId = file.id;
  const { filetype } = file;

  const handleDownloadClick = () => {
    
    if (key) {
      filetypeDownloadHandler(key, filetype, fileId);
    }
  };

  

  const name =
    file.filename.length > 18
      ? file.filename.slice(0, 15) + '...'
      : file.filename;

  const infoText = (
    <Typography
      className={classes.tooltipText}
      color="rgb(40,38,44)"
      variant="h6"
      align= 'center'
    >
      {name}
      <br />
      {file.download_count} <CloudDownloadIcon fontSize='inherit'  />
      <br />
      {file.likes} <FavoriteIcon fontSize='inherit' />
      <br />
      {null} <SaveAltIcon fontSize='inherit' />
    </Typography>
  );

  const toolTipProps = {
    className: classes.toolTip,
  };

  return (
   
      <Card variant="outlined" className={classes.card}>
        <CardActionArea
          className={classes.cardContent}
        >
          <CardHeader
            className={classes.cardHeader}
            size="small"
            align="center"
            title={title}
          />
          <CardContent align="center">
            <FileCardIcon align="center" filetype={file && file.filetype} />
          </CardContent>
          <Divider />
        </CardActionArea>
        <Grid
          className={classes.bottomBar}
          container
          xs={12}
          direction="row"
          justify="center"
          alignItems="space-between"
        >
          <Grid xs={4} align="center" item>
            <Typography color='primary' align='center' variant='caption2'>
              <FavoriteIcon fontSize='inherit' />  {file&&file.favorite_count}
            </Typography>
          </Grid>
          <Grid xs={4} align="center" item>
          <Typography color='primary' align='center' variant='caption2'>
              <CloudDownloadIcon fontSize='inherit' />  {file&&file.download_count}
            </Typography>
         
            
          </Grid>
          <Grid xs={4} align="center" item>
            <FileDetailsDialog file={file} meId={meId} handleDownloadClick={handleDownloadClick} />
          </Grid>
        </Grid>
      </Card>
    
  );
};
