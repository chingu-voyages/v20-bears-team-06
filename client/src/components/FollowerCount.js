import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';


export const FollowerCount = (props) => {

    let { currentCount } = props;
    
    const { userId } = useParams();
    
    

    let followerCount = currentCount || null;

    
    
    return (
        <Typography variant='h4' color='primary' align='center'>
            {followerCount}
        </Typography>
    )
    }

    

