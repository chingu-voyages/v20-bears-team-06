import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';



export function NotificationListItem({notification}){

    return(
        <>
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar src={notification.avatarUrl} alt={notification.fromUserName} />
            </ListItemAvatar>
            <ListItemText 
                primary={notification.fromUserName}
                secondary = {notification.message} />
        </ListItem>
        <Divider variant='inset' component='li' />
        
        </>
    )
}
