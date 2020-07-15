import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { makeStyles, fade } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PROFILE, GET_ME, GET_FOLLOWING } from '../graphql/Queries';
import ProfileInfo from '../components/ProfileInfo';
import { ContentBoard } from '../components/ContentBoard';
import { useOwnProfile } from '../utils/useOwnProfile';
import { useCachedMe } from './EditPage';
export const useProfile = () => {
  const { userId } = useParams();
  let { error, loading, data, updateQuery, refetch } = useQuery(GET_PROFILE, {
    variables: {
      userId: userId,
    },
  });

  if (!loading && data) {
    if (data.user) {
      return { profile: data.user, ...updateQuery, ...refetch};
    }
  }
};

export const useFollowing = (meId) => {
  const { userId } = useParams();
  let { error, loading, data } = useQuery(GET_FOLLOWING, {
    variables: {
      meId,
      userId,
    },
  });
  if (error) console.log(error);
  if (!loading && data) {
    return data;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '87vh',
      padding: '3.5vh',
    },
  },
  profileGrid: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
      marginTop: theme.spacing(5),
    },
  },
}));


export const ProfilePage = () => {
  const userId = useParams();
  const meId = useCachedMe();
  let profile, refetch, updateQuery;
  let profileData = useProfile();
  if (profileData){
    profile = profileData.profile;
    refetch = profileData.refetch;
    updateQuery = profileData.updateQuery;
  }
  const followingData = useFollowing(meId);

  const classes = useStyles();

  

  return (
    <Grid
      className={classes.profileGrid}
      spacing={1}
      container
      item
      direction="row"
      alignItems="stretch"
      justify="space-evenly"
      xs={12}
    >
      <Grid item container xs={12} md={3} direction="row" alignItems="stretch">
        <ProfileInfo
          profile={profile}
          isOwnProfile={followingData && followingData.isOwnProfile}
          isFollowing={followingData && followingData.isFollowing}
          meId={meId}
        />
      </Grid>
      <Grid item container xs={12} md={9}>
        <ContentBoard
          profile={profile}
          refetch={refetch}
          isOwnProfile={followingData && followingData.isOwnProfile}
          isFollowing={followingData && followingData.isFollowing}
          meId={meId}
        />
      </Grid>
    </Grid>
  );
};
