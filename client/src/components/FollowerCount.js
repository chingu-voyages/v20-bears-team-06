import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FOLLOWER_SUB} from '../graphql/Subscriptions';
import { Typography } from '@material-ui/core';


export const FollowerCount = (props) => {

    let { currentCount } = props;
    
    const { userId } = useParams();
    
    const { data } = useSubscription(FOLLOWER_SUB,{
        variables: {
            userId: userId
        }
    });

    let followerCount = currentCount || null;

    if (data&&data.newFollowEvents){
        followerCount = data.newFollowEvents.follower_count;
    }
    
    return (
        <Typography variant='h4' color='primary' align='center'>
            {followerCount}
        </Typography>
    )
    }

    

