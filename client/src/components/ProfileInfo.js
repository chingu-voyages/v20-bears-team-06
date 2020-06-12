import React from 'react';

function ProfileInfo(){

    return (
        <div className='profile info'>
        <img className = 'profile image'/>
        <div className = 'profile info-text'>
            <h4>John Doe</h4>
            <h6>History Teacher at Fake High School</h6>
            <button className='profile button' id='follow'>follow</button>

        </div>
        </div>
    )
}

export default ProfileInfo;