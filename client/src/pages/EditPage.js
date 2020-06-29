import React, {useState} from 'react';
import ProfileInfo from '../components/ProfileInfo';
import {Container} from '@material-ui/core';
import EditForm  from '../components/EditForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME , GET_PROFILE } from '../graphql/Queries';

import './profilepage.scss';
import './editpage.scss';

const EditPage = () =>{
    const { userId } = useParams();

    let { data } = useQuery(GET_ME);

    let profile = useQuery(GET_PROFILE, {
        variables: {userId}
    })
    

    let isOwnProfile = false;
    
    if (data&&data.me){
        const { id } = data.me;
        isOwnProfile = id === userId
    }

 

    if (profile&&profile.data){
        profile = profile.data.user;
    }

    const [success, setSuccess] = useState(false);



  

    



    return (
        <Container>
            <EditForm setSuccess={setSuccess} success={success} profile={profile} isOwnProfile={isOwnProfile} />

        </Container>
    )
}


export default EditPage;