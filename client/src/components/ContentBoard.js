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
import { ToolbarTabs } from './mui_components/ToolbarTabs';




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
   
   [theme.breakpoints.between('md','lg')]:{
     height: '20vh',
     marginBottom: '5vh'
   },
   [theme.breakpoints.up('lg')] : {
     height: '35vh'
   }
},
 avatarGroup :{
   justifyContent : 'center',
   padding: theme.spacing(2),
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
   },
   aboutGridItem : {
     [theme.breakpoints.up('md')] : {
       height: '50%'
     }
   }
 },
 contentCard : {
   [theme.breakpoints.up('xs')]:{
   boxSizing: 'border-box',
   height: '100%',
   width: '100%'
   },
   [theme.breakpoints.between('md','lg')]:{
   
   height: 'fit-content'
  }
   
 },
 topContentCard: {
  [theme.breakpoints.between('md','lg')]:{
    height: '20vh',
    marginBottom: '1vh'
  }
   
  
 },
 bottomContentCard: {
  boxSizing: 'border-box',
  height: '50%',
  width: '100%',
  justifySelf: 'flex-end'
 
},
 contentToolbar : {
   backgroundColor: theme.palette.primary.light,
   borderWidth: '1px',
   borderStyle : 'solid',
   borderColor: theme.palette.primary.light
   
 },
 bottomToolbar: {
   backgroundColor: theme.palette.primary.light,
   minHeight: theme.spacing(5),
   color: 'white',
   display: 'flex',
   justifyContent: 'center'
 },
 toolbarText: {
   color: 'white',
   fontWeight: theme.typography.fontWeightMedium,
   [theme.breakpoints.down('s')] : {
     fontSize: '1.1rem'
   }
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
 },
 
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
      refetchQueries: [{query:GET_PROFILE, variables:{userId}}]
    });

    
  };

  const unfollowUser = async () => {
    const response = await unfollow({
      variables: {
        userId: meId || null,
        toUnfollow: userId || null,
      },
      refetchQueries: [{query:GET_PROFILE, variables:{userId}}]
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
    
      <Grid  item container xs={12} md={4} direction='row' >
        <Grid className={classes.contentCard} item container xs={12} justify='center' alignItems='center'>
          <Grid item xs={12} md={10}>
            <Card raised className={classes.mobileCards} >
              <CardContent >
              <Typography variant='h6' color='primary'>
                About Me
              </Typography>
              <Typography variant='body2' align='justify'>
                {profile&&profile.about_me.slice(0,140)}
              </Typography>
              </CardContent>
            </Card>
            </Grid>
        <Grid item container xs={12}  alignItems='center' direction='column' className={classes.bottomContentCard}>
          <Grid item xs={12} md={10} className={classes.bottomContentCard}>
           
            <Card raised className={classes.mobileCards} >
            
              <FollowerCount currentCount={profile&&profile.follower_count} />
              <Typography variant='h5' align='center' color='primary' >followers</Typography>
              <Link className={classes.link} to={url} >
              <FollowerAvatarGroup followers={profile&&profile.followers} className={classes.avatarGroup} align='center' max={4}  />
              </Link>
              
              <Grid container justify='center' className={classes.displayArea}  xs={12}>
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
          <Card raised className={classes.contentCard}>
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
              
  
             
              
              <Grid className={classes.fab} item>
                
                { isOwnProfile &&
              <FileUploadDialog meId={meId?meId:null} iconColor={classes.fab.color} size='small' /> }
              </Grid>
                </Grid> 
            </Toolbar>
            <ContentDisplay meId={meId?meId:null} toDisplay={toDisplay}  className={classes.mobileCards} userId={userId}/>
            
            <Toolbar  className={classes.bottomToolbar}><ToolbarTabs toDisplay={toDisplay} setToDisplay={setToDisplay} /></Toolbar>
          </Card>
          

        </Grid>
      </Grid>
    </>
  );
};
