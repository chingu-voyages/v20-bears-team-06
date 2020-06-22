import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PROFILE, GET_ME } from '../graphql/Queries';
import ProfileInfo from '../components/ProfileInfo';
import PostFeed from '../components/PostFeed';

const useStyles = makeStyles((theme)=>({
  root:{
    marginTop: theme.spacing(4) 
  },
  main : {
    minHeight: '40vh'
  }
}));

const ProfilePage = () => {
  const userId = useLocation().pathname.split('/')[2];

  const classes = useStyles();

  

  let profile, timeline;

  try {
    const response = useQuery(GET_PROFILE, {
      variables: { userId },
    });

    const user = response.data.user || null;
    profile = user;

    if (profile) {
      timeline = profile.getTimeline || null;
    }
  } catch (err) {
    console.log(err);
  }

  let { data } = useQuery(GET_ME);

  let me = data&&data.me;

  let profileCheck;

  if (me){
    profileCheck = me.id === userId;
  }

  const isLoggedIn = me?true:false;
  const isOwnProfile = profileCheck || false;

  console.log(isLoggedIn, isOwnProfile);

  return (

    <Container className={classes.root}  >
      <Grid className={classes.root} container xs={12} direction='column' alignItems='center' justify='center'>
        <Grid item container className={classes.main}>
      <ProfileInfo profile={profile} auth={{ isLoggedIn, isOwnProfile }} />
      </Grid>
      <Grid item container className={classes.main}>
      <PostFeed timeline={timeline} />
      </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
