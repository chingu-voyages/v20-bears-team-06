import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FOLLOWER_SUB} from '../graphql/Subscriptions';
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

    

