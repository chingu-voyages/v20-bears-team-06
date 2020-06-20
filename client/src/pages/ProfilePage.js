import React, { useState } from 'react';
import {
  BrowserRouter as Route,
  Link,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { GET_PROFILE } from '../graphql/Queries';
import ProfileInfo from '../components/ProfileInfo';
import PostFeed from '../components/PostFeed';
import dummyData from './dummyData'; // just for testing
import './profilepage.scss';

const ProfilePage = () => {
  const userId = useLocation().pathname.split('/')[2];

  let profile, timeline;

  try {
    const response = useQuery(GET_PROFILE, {
      variables: { userId },
    });

    const user = response.data.user || null;
    profile = user;

    if (profile){
      timeline = profile.getTimeline || null;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="main-content" id="profile-page">
      <ProfileInfo profile={profile} />
      <PostFeed timeline={timeline} />
    </div>
  );
};

export default ProfilePage;
