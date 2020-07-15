import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme=>({
    link: {
        display:'hidden'
    }
}))

export function NotificationListItem({notification, history}){
    console.log(notification)
    return(
        <>
        
        <ListItem button={true} onClick={()=>history.push(notification.url)}  alignItems='flex-start'>
        <Link to={notification.url}>
            <ListItemAvatar>
                <Avatar src={notification.avatarUrl} alt={notification.fromUserName} />
            </ListItemAvatar>
            </Link>
            <ListItemText 
                primary={notification.fromUserName}
                secondary = {notification.message} />
        </ListItem>
        <Divider variant='inset' component='li' />
        
        </>
    )
}
