import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';






export const FollowButton = ({isOwnProfile, isFollowing, handleFollowClick}) => {
    if (isOwnProfile) return null;
    if (isFollowing) return (

    )

    if (!isFollowing&&!isOwnProfile){

    }


    return

}