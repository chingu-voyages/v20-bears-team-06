import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridCard: {
    minHeight: theme.spacing(24),
    boxSizing: 'border-box',
  },
  gridCardBottom: {
    minHeight: theme.spacing(30),
    boxSizing: 'border-box'
  },
  avatarGroup:{
    justifyContent : 'center',
    marginTop: theme.spacing(1)
  },
  avatarGroupAvatar: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  followButton : {
    height: theme.spacing(4)
    
  },
  buttonHolder : {
    height: theme.spacing(6)
 },
 uploadCardHolder: {
   '& div' : {
     height: theme.spacing(10),
     width: theme.spacing(10),
     margin: theme.spacing(1),
   }
 },
 gridTop : {
   height : '35%'
 }
}));

export const ContentBoard = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <Grid
        item
        container
        direction="column"
        justify="flex-start"
        xs={12}
        md={4}
        className={classes.mainGrid}
      >
        <Grid item xs={12}>
          <Card className={classes.gridCard}>
            <CardContent>
              <Typography variant="h4" align="center">
                {props.profile && props.profile.follower_count}
              </Typography>
              <Typography variant="h6" align="center">
                followers
              </Typography>
              <AvatarGroup max={4} className={classes.avatarGroup}>
               <Avatar className={classes.avatarGroupAvatar}></Avatar>
               <Avatar className={classes.avatarGroupAvatar}></Avatar>
               <Avatar className={classes.avatarGroupAvatar}></Avatar>
               <Avatar className={classes.avatarGroupAvatar}></Avatar>
              </AvatarGroup>
              <Grid className={classes.buttonHolder} direction='column' justify='center' alignItems='center' container xs={12}>
                <Grid className={classes.followButton} item>
                <Button size='small'  variant='outlined'><Typography variant='subtitle2'>Follow</Typography></Button>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="flex-start"
        xs={12}
        md={7}
      >
        <Grid item xs={12}>
          <Card className={classes.gridCard}>
            <CardHeader
              title={<Typography variant="caption">About Me</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.profile && props.profile.about_me}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems='center' xs={12}>
        <Grid item xs={11}>
          <Card className={classes.gridCardBottom}>
            <CardHeader title={`${props.profile && props.profile.name}'s content`}/>
            <CardContent>
              <Grid item className={classes.uploadCardHolder} xs={12}  container direction='row' alignItems='baseline' justify='space-evenly'>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                <Grid xs={4} md={2} item><Card>an upload</Card></Grid>
                
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      
    </>
  );
};
