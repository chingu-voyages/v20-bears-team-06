import React, { useState } from 'react';
import {
  BrowserRouter as Route,
  Link,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProfileInfo from '../components/ProfileInfo';
import PostFeed from '../components/PostFeed';
import dummyData from './dummyData'; // just for testing
import './profilepage.scss';

const ProfilePage = () => {
  const userId = useLocation().pathname.split('/')[2];
  console.log(userId);

  const GET_USER = gql`
    query getUser($userId: String!) {
      user(userId: $userId) {
        name
        school
        department
        position
      }
    }
  `;


  let profile;

  

  try{

  const response = useQuery(GET_USER, {
      variables: {userId}
  });

  const user = response.data.user || null;
  console.log(user);
  profile = user;
} catch (err){
    console.log(err);
}

  return (
    <div className="main-content" id="profile-page">
      <ProfileInfo profile={profile} />
      <PostFeed posts={dummyData} />
    </div>
  );
};

export default ProfilePage;
