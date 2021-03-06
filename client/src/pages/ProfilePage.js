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
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { userId },
  });
  if (error) console.log(error);
  if (!loading && data && data.user) {
    return data.user;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.between('md','lg')]: {
      height: '65vh',
      padding: '3.5vh',
    },
  },
  profileGrid: {
    [theme.breakpoints.between('md','lg')]: {
      height: 'fit-content',
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.up('xs')] : {
      marginTop: theme.spacing(3),
      marginLeft: '0',
      marginRight: '0'
    }
  },

  profileHolder: {
    [theme.breakpoints.between('md','lg')] : {
      height: 'inherit'
    }
  }
}));

export const ProfilePage = () => {
  const userId = useParams();
  const meId = useCachedMe();
  const profile = useProfile();

  let isOwnProfile = false,
    isFollowing = false;

  if (profile && profile.id && meId) {
    isOwnProfile = profile.id && meId;
    if (profile.followerIds) {
      isFollowing = profile.followerIds.map((el) => {
        if (el === meId) {
          isFollowing = true;
        }
        return el;
      });
    }
  }

  const classes = useStyles();

  return (
    <Grid
      className={classes.profileGrid}
      spacing={2}
      container
      item
      direction="row"
      alignItems="stretch"
      justify="space-around"
      xs={12}
    >
      <Grid className={classes.profileHolder} item container xs={12} md={3} direction="row" alignItems="stretch">
        <ProfileInfo
          profile={profile}
          isOwnProfile={isOwnProfile ? isOwnProfile : false}
          isFollowing={isFollowing ? isFollowing : false}
          meId={meId}
        />
       
      </Grid>
      <Grid item container className={classes.profileHolder} xs={12} md={9}>
        <ContentBoard
          profile={profile}
          isOwnProfile={isOwnProfile ? isOwnProfile : false}
          isFollowing={isFollowing ? isFollowing : false}
          meId={meId}
        />
      </Grid>
    </Grid>
  );
};
