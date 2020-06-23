import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PROFILE, GET_ME } from '../graphql/Queries';
import ProfileInfo from '../components/ProfileInfo';
import { ContentBoard } from '../components/ContentBoard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    height: theme.spacing(54)
  },
  main: {
    minHeight: theme.spacing(27),
    [theme.breakpoints.down('md')] : {
      margin: 0,
      height: '100%'
    }
  },
  mainPaper : {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    [theme.breakpoints.up('xs')] : {
      marginLeft: '0'
    },
    [theme.breakpoints.up('md')]:{
    marginLeft: theme.spacing(5),
   
  },


}}));

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

  let me = data && data.me;

  let profileCheck;

  if (me) {
    profileCheck = me.id === userId;
  }

  const isLoggedIn = me ? true : false;
  const isOwnProfile = profileCheck || false;

  return (
    <Container className={classes.root}>
      <Grid
        className={classes.root}
        container
        xs={12}
        direction="row"
        alignItems="flext-start"
      >
        <Grid xs={12} md={3} item container className={classes.main}>
          <ProfileInfo profile={profile} auth={{ isLoggedIn, isOwnProfile }} />
        </Grid>
        <Grid xs={12} md={9} spacing={1} item container className={classes.main} direction='row' alignItems='flex-start' justify="space-evenly">
         
          <ContentBoard profile={profile} auth={{isLoggedIn, isOwnProfile}} />
          
        </Grid>
      
      </Grid>
      
    </Container>
  );
};

export default ProfilePage;
