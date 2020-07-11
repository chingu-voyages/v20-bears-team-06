import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { GET_PROFILE_PICS } from '../graphql/Queries';



export const FollowerAvatarGroup = ({followers,...props}) => {
    let followerData = followers?followers:null;
    let avatars = null;
    if (followerData){
        avatars = [];
        followers.forEach((el,i)=>{
            if (el.profilePic_url!==null){
                avatars.push((<Avatar key={el.profilePic_url} src={el.profilePic_url}/>))
            }
        })

        followers.forEach((el,i)=>{
            if (!el.profilePic_url){
                avatars.push(<Avatar key={el.id} />)
            }
        })
    }

    return (
        <AvatarGroup {...props}>
            {avatars}
        </AvatarGroup>
    )
}
    

    
    

    

