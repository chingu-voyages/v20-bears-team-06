import React , {useContext} from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { ProfileContext } from '../pages/ProfilePage';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon  from '@material-ui/icons/AccountCircle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER_MUTATION } from '../graphql/Mutations';
import { GET_ME } from '../graphql/Queries';

const useStyles = makeStyles((theme) => ({
 root: {

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
   borderColor: theme.palette.primary.light,
   borderWidth: '1px',
   borderStyle : 'solid'
   
 }
}));

export const ContentBoard = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  let context = useContext(ProfileContext);

  let {profile, isLoggedIn, isOwnProfile } = context;

  const { userid } = useParams();

  const [follow] = useMutation(FOLLOW_USER_MUTATION);

  

  let { data } = useQuery(GET_ME);
  let meId;
  if (data){
    meId = data.me.id
  }

  

  


  const followUser = async() => {
    const response = await follow({
      variables:{
        userId: meId,
        toFollow: userid
      }
    });

    console.log(response)
    
  }

  

  return (
    <>
      <Grid className={classes.contentCard} item container xs={12} md={4} direction='row' >
        <Grid item container xs={12} justify='center' alignItems='center'>
          <Grid item xs={12} md={10}>
            <Card>
              <CardContent>
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
            <Card >
              <Typography className={classes.followerCard} variant='h4' align='center' color='primary' gutterBottom>{profile&&profile.follower_count}</Typography>
              <Typography variant='h5' align='center' color='primary' >followers</Typography>
              <AvatarGroup className={classes.avatarGroup} align='center' max={4} size='small'>
                <Avatar/>
                <Avatar/>
                <Avatar/>
                <Avatar/>
                <Avatar/>
              </AvatarGroup>
              <Grid container justify='center' xs={12}>
                <Grid item className={classes.followButton}>
                  {!isOwnProfile &&
              <Button size='small' variant='outlined' color='primary' onClick={followUser}>
                follow
              </Button>}
              </Grid>
              </Grid>
              </Card>
              </Grid>

        </Grid>
        

        </Grid>

      </Grid>
      <Grid item container direction='row' xs={12} md={8}> 
        <Grid item xs={12}>
          <Card className={classes.contentCard}>
            <Toolbar className={classes.contentToolbar} variant='dense' color='primary'>
            <IconButton>
                <AccountCircleIcon color='primary' />
              </IconButton>
              <Typography variant='h6' color='primary'>{profile&&profile.name}'s Content</Typography>
              
            </Toolbar>

          </Card>

        </Grid>

      </Grid>
      </>
    
  );
};
