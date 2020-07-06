import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { FOLLOWER_SUB, NOTIFICATIONS_FROM_FOLLOWING, NOTIFICATIONS } from '../graphql/Subscriptions';
import { IconButton } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import NotifcationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme)=>({
    icon: {
        color: 'white'
    }
}))

const useFollowing = async (meId) => {
    const response = await useSubscription(NOTIFICATIONS_FROM_FOLLOWING,{
        variables:{userId:meId}
    });

    console.log(response);
}

const useNotification =  (meId) => {
    const { data, loading, error } = useSubscription(NOTIFICATIONS,{
        variables: {userId:meId}
    });

    if (!loading&&data){
        console.log(data);
        return data.notificationSub;
    }
}

const useNotificationSubs = (meId)=> {
    const notes = useNotification(meId);
    const fromFollowing = useFollowing(meId);

    if (notes&&fromFollowing){
        return notes.concat(fromFollowing);

    }

    return [];
    
}

export const Notifications = ({meId}) => {

    
   const newNotifications = useNotificationSubs(meId);

   console.log(newNotifications)

   const [notificationCount, setNotificationCount] = useState(newNotifications.length);
   const [notificaitons, setNotifications ] = useState(newNotifications);

    const classes = useStyles();

    
    return (
        <IconButton>
            <Badge className={classes.icon} badgeContent={notificationCount}>
                <SvgIcon className={classes.icon} >
                    <NotifcationsIcon/>
                </SvgIcon>
            </Badge>
        </IconButton>
    )
    

}