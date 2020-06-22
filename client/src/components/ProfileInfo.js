import React from 'react';
import { Grid, Avatar, Container, Paper, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CoverPhoto from './CoverPhoto';


export const useStyles = makeStyles((theme) => ({
  
  title: {
    padding: theme.spacing(2,0),
    outline : 'none',
    boxShadow : 'none',
    '& h6' : {
      fontSize: '.7rem'
    }
    
    
  },
  gridSection:{
    minHeight: '40vh'
  },

  infoCard : {
    [theme.breakpoints.up('xs')] : {
      minHeight : '20vh'
    },
    [theme.breakpoints.up('md')] : {
      minHeight: '35vh'
    }
  },

  nestedCard : {
    [theme.breakpoints.up('xs')] : {
      minHeight: '15vh'
    },
    [theme.breakpoints.up('md')] : {
      minHeight: '30vh'
    }
  },

  profilePic:{
    height: theme.spacing(15),
    width : theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
  

 
  
  
}));

const ProfileInfo = (props) => {
  let profile = props.profile;
  let theme = useTheme();
  const classes = useStyles(theme);

  let profileImage = profile&&profile.hasOwnProperty('image')
  ? profile.image:
  null;

  const { isLoggedIn, isOwnProfile } = props.auth;

  
  


  return (
    <>
    <Grid item container xs={12} md={3} direction='column'>
      <Grid item xs={12}>
        <Card >
          <CardActionArea className={classes.infoCard}>
            <Grid  item container xs={12} direction='column' alignItems='center' justify='center'>
            <Avatar gutterBottom spacing={4} className={classes.profilePic} align='center' src={`${profileImage}`}></Avatar>
            <Typography variant='h6' align='center'>{profile&&profile.name}</Typography>
            <Typography variant='body1' align='center'>{profile&&profile.employment}
            <br/>
            {profile&&profile.school}
            <br/>
            {profile&&profile.location}
            </Typography>
            </Grid>

          </CardActionArea>
          <CardContent className={classes.infoCard}>
            <Card className={classes.nestedCard}>
              <CardContent>

              </CardContent>
            </Card>

          </CardContent>
        
        </Card>
      </Grid>


    </Grid>
    <Grid item container xs={12} md={7}>

    </Grid>
    
    
    </>
  )
};

export default ProfileInfo;
