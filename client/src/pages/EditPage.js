import React, { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import { Container } from '@material-ui/core';
import EditForm from '../components/EditForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME, GET_PROFILE } from '../graphql/Queries';
import { useOwnProfile } from '../utils/useOwnProfile';
import { useProfile, useFollowing } from './ProfilePage';

import './profilepage.scss';
import './editpage.scss';

const EditPage = ({ meId }) => {
  
  const profile = useProfile();
  let isOwnProfile;

  if (profile){
    isOwnProfile = meId === profile.id;
  }



  
  const [success, setSuccess] = useState(false);
  return (
    <Container>
      <EditForm
        setSuccess={setSuccess}
        success={success}
        profile={profile}
        isOwnProfile={isOwnProfile}
      />
    </Container>
  );
};

export default EditPage;
