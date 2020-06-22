import React from 'react';
import { Grid, Paper, Avatar, Container, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './ProfileInfo';



const PostFeed = (props) => {

  const theme = useTheme();
  const classes = useStyles(theme);


  


  return(
    <Grid item container xs={12} spacing={4} direction='row' className={classes.gridSection}>
      <Grid xs={0} md={3} item>
      <Paper className={classes.gridSection} ></Paper>
      </Grid>
      <Grid xs={0} md={8} item>
      <Paper className={classes.gridSection} ></Paper>
      </Grid>
      
       
    </Grid>
  )
  
};

export default PostFeed;
