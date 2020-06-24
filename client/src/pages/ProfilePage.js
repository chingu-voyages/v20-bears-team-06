import React, { useState, useContext, createContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
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
  root : {
    [theme.breakpoints.up('md')] : {
      height: '87vh',
      padding: '3.5vh'
    }
  },
  profileGrid : {
    [theme.breakpoints.up('md')] : {
      height: '100%',
      marginTop : theme.spacing(5)
    }
  }
}));

export const ProfileContext = createContext({
  isLoggedIn: null,
  isOwnProfile: null,
  profile: null,
});

export const ProfilePage = (props) => {
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
    
      <ProfileContext.Provider
        value={{
          isLoggedIn: isLoggedIn || null,
          isOwnProfile: isOwnProfile || null,
          profile: profile || null,
        }}
      >
       
          <Grid className={classes.profileGrid}  spacing={1} container direction='row' alignItems='stretch' justify='space-evenly' xs={12}>
            <Grid item container xs={12} md={3} direction='row' alignItems='stretch'>
            <ProfileInfo />
            </Grid>
            <Grid item container xs={12} md={9}>
            <ContentBoard />
            </Grid>
          </Grid>
        
       
      </ProfileContext.Provider>
    
  );
};


