import React, { useState } from 'react';
import {BrowserRouter as Route, Link, Switch, useQuery} from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import PostFeed from '../components/PostFeed';
import dummyData from './dummyData'; // just for testing
import './profilepage.scss';

const ProfilePage = () =>{

    return (
        <div className='main-content' id='profile-page'>
            <ProfileInfo />
            <PostFeed posts={dummyData} />
            
        </div>
    )
}

export default ProfilePage;
