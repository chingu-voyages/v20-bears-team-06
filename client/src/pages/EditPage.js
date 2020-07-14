import React, { useState, useEffect } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import { Container } from '@material-ui/core';
import EditForm from '../components/EditForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME, GET_PROFILE } from '../graphql/Queries';
import './profilepage.scss';
import './editpage.scss';

const useCachedMe = () => {
  const { data, loading, error } = useQuery(CACHE)
}

const EditPage = () => {
  const { userId } = useParams();
  let profile, isOwnProfile;
  const { data, loading, error } = useQuery(GET_PROFILE,{
    variables:{userId}
  });

  if (error){
    console.log(error);
  }

  if (!loading && data && data.user){
    profile = data.user;
  }

  
  
  

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
        meId={meId}
      />
    </Container>
  );
};

export default EditPage;
