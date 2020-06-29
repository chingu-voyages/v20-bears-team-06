import React, { useState, useContext, createContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { makeStyles, fade } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

import { useParams } from 'react-router-dom';
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

const useProfile = () => {
  const { userId } = useParams();
  let { error, loading, data } = useQuery(GET_PROFILE,{
    variables:{
      userId: userId
    }});

    if (!loading&&data){
      if (data.user){
        return data.user;
      }
    }
}

const useChecks = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_ME);
  if (!loading&&data&&data.me&&data.me.id){
    return { isLoggedIn: true, isOwnProfile: data.me.id===userId, meId:data.me.id}
  }
  return { isLoggedIn:false, isOwnProfile: false, meId:null};
}

export const ProfileContext = createContext({
  isLoggedIn: null,
  isOwnProfile: null,
  profile: null,
});

export const ProfilePage = (props) => {



const classes= useStyles();
const profile = useProfile();
const { isLoggedIn, isOwnProfile, meId } = useChecks();




  

  return (
    
      <ProfileContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          isOwnProfile: isOwnProfile,
          profile: profile,
          meId: meId
        }}
      >
       
          <Grid className={classes.profileGrid}  spacing={1} container item direction='row' alignItems='stretch' justify='space-evenly' xs={12}>
            <Grid item container xs={12} md={3}  direction='row' alignItems='stretch'>
            <ProfileInfo />
            </Grid>
            <Grid item container xs={12} md={9}>
            <ContentBoard />
            </Grid>
          </Grid>
        
       
      </ProfileContext.Provider>
    
  );
};


