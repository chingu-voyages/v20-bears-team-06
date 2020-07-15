import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon  from '@material-ui/icons/AccountCircle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER_MUTATION, UNFOLLOW_USER_MUTATION } from '../graphql/Mutations';
import { GET_ME, FOLLOWER_IDS, GET_PROFILE } from '../graphql/Queries';
import { FollowerCount } from './FollowerCount';
import { ContentDisplay } from './ContentDisplay';
import { FollowerAvatarGroup } from './FollowerAvatarGroup';
import { FileUploadDialog } from './mui_components/FileUploadDialog';
import { BottomNavSwitch } from './mui_components/BottomNavSwitch';
import { ButtonGroup } from '@material-ui/core';




const useIsFollowing = (profile, meId) => {
  if (profile && meId) {
    let ids = profile.followers.map((el) => el.id);
    return ids.includes(meId);
  }
};

const useStyles = makeStyles((theme) => ({
 root: {

 },
 mobileCards : {
   minHeight: theme.spacing(30),
   justifyContent: 'center',
   alignItems: 'center',
  [theme.breakpoints.down('md')] : {
    minHeight: '50vh'
  }
},
 avatarGroup :{
   justifyContent : 'center',
   padding: theme.spacing(2),
   '& div' : {
     width: theme.spacing(4),
     height: theme.spacing(4)
   }
 },
 leftCard : {
   minHeight: theme.spacing(10)
 },
 followButton : {
   padding: theme.spacing(2)
 },
 fileDisplay : {
   height: theme.spacing(20),
   '& div' : {
     [theme.breakpoints.up('xs')] : {
       height: theme.spacing(4)
     },
     [theme.breakpoints.up('md')] : {
       
     }
   }
 },
 contentCard: {
   boxSizing: 'border-box',
   height: '85%',
   width: '100%',
  
 },
 contentToolbar : {
   backgroundColor: theme.palette.primary.light,
   borderWidth: '1px',
   borderStyle : 'solid',
   borderColor: 'white'
   
 },
 toolbarText: {
   color: 'white'
 },
 fab : {
   position: 'absolute',
   right: '0',
   marginRight: '2%',
   color: theme.palette.info.light
 },
 buttonGroup: {
   color: 'white'
 },
 link: {
   textDecoration: 'none'
 }
}));

export const ContentBoard = ({profile, meId }) => {
  const [toDisplay, setToDisplay ] = useState('user');
  let { url } = useRouteMatch();
  url+='/followers';
  let isOwnProfile, isLoggedIn, isFollowing, refetchQuery;
  if (meId){
    isLoggedIn = true;
  }

  if (profile&&meId){
    isFollowing = profile.followers.map(el=>el.id).includes(meId);
    isOwnProfile = profile.id === meId;
  }


  const handleContentSwitch = (event) => {
    console.log(event.currentTarget.value)
    setToDisplay(event.currentTarget.value);
  }
  

  const theme = useTheme();
  const classes = useStyles(theme);
  const { userId } = useParams();

  const [follow] = useMutation(FOLLOW_USER_MUTATION);
  const [unfollow] = useMutation(UNFOLLOW_USER_MUTATION);


  const followUser = async () => {
    const response = await follow({
      variables: {
        userId: meId || null,
        toFollow: userId || null,
      },
    });

    
  };

  const unfollowUser = async () => {
    const response = await unfollow({
      variables: {
        userId: meId || null,
        toUnfollow: userId || null,
      },
    });

    

    
  };

  let contentSlug = null;
  if (toDisplay==='saved'){
    contentSlug= 'Saved';
  }

  if(toDisplay==='favorite'){
    contentSlug= 'Favorite';
  }

  return (
    <>
    
      <Grid className={classes.contentCard} item container xs={12} md={4} direction='row' >
        <Grid item container xs={12} justify='center' alignItems='center'>
          <Grid item xs={12} md={10} >
            <Card className={classes.mobileCards} >
              <CardContent >
              <Typography variant='h6' color='primary'>
                About Me
              </Typography>
              <Typography variant='body2' align='justify'>
                {profile&&profile.about_me}
              </Typography>
              </CardContent>
            </Card>
            </Grid>
        <Grid item container xs={12} justify='center'>
          <Grid item xs={12} md={10}>
           
            <Card className={classes.mobileCards} >
            
              <FollowerCount currentCount={profile&&profile.follower_count} />
              <Typography variant='h5' align='center' color='primary' >followers</Typography>
              <Link className={classes.link} to={url} >
              <FollowerAvatarGroup followers={profile&&profile.followers} className={classes.avatarGroup} align='center' max={4} size='small' />
              </Link>
              
              <Grid container justify='center'  xs={12}>
                <Grid item className={classes.followButton}>
                  {(!isOwnProfile && isLoggedIn &&!isFollowing) &&
              <Button onClick={followUser} size='small' variant='outlined' color='primary' >
                follow
              </Button>}
                  {(!isOwnProfile&&meId&&isFollowing)&&
                  <Button onClick={unfollowUser} size='small' variant='outlined' color='primary'>
                    <Typography color='secondary' variant='subtitle2' align='center'>
                      unfollow
                    </Typography>
                    </Button>}
              </Grid>
              </Grid>
              
              </Card>
             
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row" xs={12} md={8}>
        <Grid item xs={12}>
          <Card className={classes.contentCard}>
            <Toolbar className={classes.contentToolbar}  >
              
              <Grid container direction='row' alignItems='center' xs={12}>
                <Grid item>
            <IconButton>
                <AccountCircleIcon className={classes.toolbarText} />
              </IconButton>
              </Grid>
              <Grid item>
              <Typography variant='h6' className={classes.toolbarText}>{profile&&profile.name}'s {contentSlug} Content</Typography>
              </Grid>
              <Grid item container direction='row' justify='center' alignItems='center'>
             
              <ButtonGroup align='center' fullwidth variant='text' color='primaryText' size='small'>
                <Button onClick={handleContentSwitch}  value='user' className={classes.buttonGroup}>
                  User
                </Button>
                <Button onClick={handleContentSwitch}  value='saved' className={classes.buttonGroup}>
                  Saved
                </Button>
                <Button onClick={handleContentSwitch} value='favorite' className={classes.buttonGroup}>
                  Favorite
                </Button>
              </ButtonGroup>
  
              </Grid>
              
              <Grid className={classes.fab} item>
                
                { isOwnProfile &&
              <FileUploadDialog meId={meId} iconColor={classes.fab.color} size='small' /> }
              </Grid>
              </Grid>
            </Toolbar>
            <ContentDisplay meId={meId} toDisplay={toDisplay}  className={classes.mobileCards} userId={userId}/>
            
            
          </Card>
          

        </Grid>
      </Grid>
    </>
  );
};
