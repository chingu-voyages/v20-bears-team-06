import React, { useState, useEffect } from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import { NOTIFICATIONS } from '../graphql/Subscriptions';
import { NOTIFICATION_QUERY } from '../graphql/Queries';
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

const useNotes = (meId) => {
    const {data, loading} = useSubscription(NOTIFICATIONS,{
        variables:{userId:meId},
        shouldResubscribe: true
    });

    if (!loading&&data.notificationSub){
        console.log(data.notificationSub)
        return data.notificationSub;
    }

}

const useNoteQuery = (meId) => {
    const { data, loading } = useQuery(NOTIFICATION_QUERY, {
        variables: {userId: meId}
    });

    if (!loading&&data.newNotifications){
        return data.newNotifications;

    }
}






export const Notifications = (props) => {
    const [notifications, setNotifications] = useState([]);
    let notes = useNotes(props.meId);
    let qNotes = useNoteQuery(props.meId);
    notes = notes?notes:qNotes;
    const classes = useStyles();

    
    console.log(props);



    
    return (
        <IconButton>
            <Badge className={classes.icon} badgeContent={(notes&&notes.length)||null}>
                <SvgIcon className={classes.icon} >
                    <NotifcationsIcon {...props.trigger}/>
                </SvgIcon>
            </Badge>
        </IconButton>
    )
    

}