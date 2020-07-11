import React, { useContext, useEffect } from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { Grid, Avatar, Container, Paper, Typography } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_USER_SPEC } from '../graphql/Mutations';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CoverPhoto from './CoverPhoto';
import { ProfileContext } from '../pages/ProfilePage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddSpecialtyPopover from './mui_components/AddSpecialtyPopover.js';

const useStyles = makeStyles((theme) => ({
  
  mainCard: {
    [theme.breakpoints.up('md')]: {
      height: '84vh',
    },
  },
  avatar: {
    [theme.breakpoints.up('xs')]: {
      height: theme.spacing(8),
      width: theme.spacing(8),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(4),
    },
  },
  specialtyCard: {
    boxShadow: 'none',
  },
  cardList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& li': {
      margin: theme.spacing(1, 'auto'),
      '& div': {
        minWidth: theme.spacing(10),
      },
    },
  },
  longCard: {
    height: '100%',
  },
  routerLink: {
    textDecoration: 'none',
    '& :hover' : {
      color : 'blue'
    }
  },
}));

const ProfileInfo = ({meId, profile}) =>{
let isFollowing, isOwnProfile;
  if (profile && meId){
    if (profile.id === meId){
      isOwnProfile = true;
    }

    if (profile.followers.map(el=>{
      return el.id;
    }).includes(meId)){
      isFollowing = true;
    }
  }

  let { url } = useRouteMatch();

  let { userId } = useParams();

  const classes = useStyles();

  let specialties =
    profile && profile.getSpecialties ? profile.getSpecialties : null;
  if (specialties) {
    specialties = specialties.map((el) => {
      return (
        <li
          key={`${profile.id}${el.title}${el.subtitle || Math.random() * 3000}`}
        >
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            label={el.title[0].toUpperCase() + el.title.slice(1).toLowerCase()}
          />
        </li>
      );
    });
  }

  return (
    <Grid item container xs={12} md={12} direction="column">
      <Card>
        <CardActionArea>
          <CardMedia>
            <Avatar
              className={classes.avatar}
              src={profile && profile.profilePic_url}
            ></Avatar>
          </CardMedia>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            item
            xs={12}
          >
            <Grid xs={12} item container justify="center" alignItems="center">
              {isOwnProfile!==undefined&&isOwnProfile?(
                <Grid xs={5} item>
                  <Link to={`${url}/edit`} className={classes.routerLink}>
                    <Typography variant='subtitle1' color='secondary' align='center'>
                      edit
                    </Typography>
                  </Link>
                  </Grid>
                
              ):null}
            </Grid>
          </Grid>

          <Typography align="center" variant="h6">
            {profile && profile.name}
          </Typography>
        </CardActionArea>
        <CardContent>
          <Typography align="center" variant="subtitle1">
            {profile && profile.location}
          </Typography>
          <Typography align="center" variant="subtitle1">
            {(profile && profile.employment)||''}
          </Typography>
          <Typography align="center" variant="subtitle1">
            {profile && profile.school}
          </Typography>

          <Grid container xs={12} alignItems="center" direction="column">
            <Grid item xs={10}>
              <Card className={classes.specialtyCard}>
                <CardContent className={classes.cardList} component="ul">
                  <Typography
                    color="primary"
                    variant="body1"
                    align="center"
                    gutterBottom
                  >
                    <strong>Specialties</strong>
                  </Typography>
                  {specialties}
                  {isOwnProfile && (
                    <li>
                      <AddSpecialtyPopover />
                    </li>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileInfo;
