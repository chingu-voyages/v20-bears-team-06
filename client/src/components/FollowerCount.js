import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';


export const FollowerCount = ({currentCount}) => {

    const count = currentCount || 0;
    
    const { userId } = useParams();
    
    

    
    
    
    return (
        <Typography variant='h4' color='primary' align='center'>
            {count}
        </Typography>
    )
    }

    

