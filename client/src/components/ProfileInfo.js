import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Avatar, Container, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_SPECIALTIES } from '../graphql/Queries';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CoverPhoto from './CoverPhoto';

const useSpecialties = (userId) => {
  let res = useQuery(GET_SPECIALTIES, {
    variables: { userId },
  });
  if (res) {
    return res.data.user.getSpecialties;
  } else return null;
};

export const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2, 0),
    outline: 'none',
    boxShadow: 'none',
    '& h6': {
      fontSize: '.7rem',
    },
  },
  gridSection: {
    minHeight: '40vh',
  },

  aboutMe: {
    [theme.breakpoints.up('xs')]: {
      minHeight: '40vh',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '35vh',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },

  infoCard: {
    [theme.breakpoints.up('xs')]: {
      minHeight: '20vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },

  nestedCard: {
    [theme.breakpoints.up('xs')]: {
      minHeight: '15vh',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '30vh',
    },
  },

  doubleNest: {
    [theme.breakpoints.up('xs')]: {
      minHeight: '1vh',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '3vh',
    },
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    justifyContent: 'center',
    fontSize: '.8rem',
    margin: theme.spacing(1),
  },

  profilePic: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },

  cardTitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
  },

  profileInfoCard: {
    marginBottom: theme.spacing(5),
  },

  editButton : {
    marginBottom: theme.spacing(2)
  }
}));

const ProfileInfo = (props) => {
  let profile = props.profile;
  let theme = useTheme();
  const classes = useStyles(theme);

  

  let profileImage =
    profile && profile.hasOwnProperty('image') ? profile.image : null;

  let isOwnProfile = props && props.auth
  ?props.auth.isOwnProfile
  :null;

  let isLoggedIn = props && props.auth
  ?props.auth.isLoggedIn
  :null;
  
  let specialties =
    profile && profile.getSpecialties ? profile.getSpecialties : null;

  if (specialties) {
    specialties = specialties.map((el) => {
      return (
        <Grid xs={8} item container direction="column" justify="space-around">
          <Card
            className={classes.doubleNest}
            key={`${el.title}:${el.subtitle}`}
          >
            <Typography align="center" variant="subtitle2">
              {el.title}
            </Typography>
            {el.subtitle ? (
              <Typography align="center" variant="subtitle2">
                <em>{el.subtitle}</em>
              </Typography>
            ) : null}
          </Card>
        </Grid>
      );
    });
  }

  return (
    <>
      <Grid
        item
        container
        direction="column"
        className={classes.profileInfoCard}
      >
        <Grid item justify="center">
          <Card>
            <CardActionArea className={classes.infoCard}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Avatar
                  gutterBottom
                  spacing={4}
                  className={classes.profilePic}
                  align="center"
                  src={`${profileImage}`}
                ></Avatar>
                <Typography variant="h6" align="center">
                  {profile && profile.name}
                </Typography>
                <Typography variant="body1" align="center">
                  {profile && profile.employment}
                  <br />
                  {profile && profile.school}
                  <br />
                  {profile && profile.location}
                </Typography>
              </Grid>
            </CardActionArea>
            <CardContent className={classes.infoCard}>
              <Card className={classes.nestedCard}>
                <CardContent>
                  <Typography
                    className={classes.cardTitle}
                    color="textSecondary"
                    gutterBottom
                  >
                    Specialties
                  </Typography>
                  <Grid
                    container
                    xs={12}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {specialties}
                  </Grid>
                </CardContent>
              </Card>
            </CardContent>
            {isOwnProfile ? (
              <Grid container xs={12}  alignItems="center" justify="center">
                <Grid item gutterBottom>
                  <Button className={classes.editButton} onClick={props.editClick} variant="outlined" color="textSecondary">
                    <Typography variant="body2" color="secondaryLight">
                      edit
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileInfo;
