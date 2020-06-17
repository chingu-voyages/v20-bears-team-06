import React from 'react';
import CoverPhoto from './CoverPhoto';

function ProfileInfo(props){

    const profile = props.profile || null;

    return (
        <div className='profile info'>
        <img className = 'profile image'/>
        <div className = 'profile info-text'>
            <h4>{profile?profile.name:null}</h4>
            <h6>{profile?(profile.school || 'add school on edit profile page'):null}</h6>
            <button className='profile button' id='follow'>follow</button>

        </div>
        <CoverPhoto imageUrl={null} />
        </div>
    )
}

export default ProfileInfo;