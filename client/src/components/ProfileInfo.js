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
    maxHeight: '50vh',
    minHeight: '40vh'
  }
  

 
  
  
}));

const ProfileInfo = (props) => {
  let profile = props.profile;
  let theme = useTheme();
  const classes = useStyles(theme);

  


  return (
    <Grid container direction='row' justify='center' spacing={4} xs={12} alignItems='center'>
    <Grid
      direction="column"
      container
      item
      xs={12}
      md={3}
      
      className={`${classes.root} ${classes.gridSection}`}
      alignItems = 'center'
      spacing={1}
      justify='center'
      
    >
      <Card item className={classes.title} gutterBottom>
        <CardActionArea>
          <CardMedia className={classes.title}
            component={(profile&&profile.profilePic)?"img":"Avatar"}
            alt = {profile?profile.name:'user profile'}
            gutterBottom
            item
            >{(profile&&!profile.profilePic)?<Avatar></Avatar>:null}</CardMedia>
        </CardActionArea>
      </Card>
      
        
         
      <Typography item className={classes.text} align='center' variant='h5' gutterBottom >{profile&&profile.name}</Typography>
      <Typography item className={classes.text} align='center' variant='body2' gutterBottom>{profile&&profile.school}</Typography>
      <Typography item className={classes.text} align='center' variant ='body2' gutterBottom>{profile&&profile.employment}</Typography>
      <Typography item className={classes.text} align='center'  variant='subtitle2'>{`${profile&&profile.follower_count} followers`}</Typography>
      
     
  
      </Grid>
      <Grid xs={12} md={8} className={`${classes.aboutme} ${classes.text} ${classes.gridSection}`} item container alignItems='center' justify='center' >
        <Grid container item xs={12} sm={9} md={8} alignItems='center'  justify='center' className={classes.gridSection} direction='column'>
          <Paper className={classes.gridSection}>
        <Typography align='justify'  className={`${classes.aboutme} ${classes.text}`} variant='caption' >{profile&&profile.about_me}</Typography>
        </Paper>
        </Grid>
        </Grid>
      
      </Grid>
      
  );
};

export default ProfileInfo;
