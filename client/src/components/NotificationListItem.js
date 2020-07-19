import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';


  

export function NotificationListItem({notification, history}){
    console.log(notification)
    return(
        <>
        
        <ListItem button={true} onClick={()=>{
            const link = document.createElement('a');
            link.style.display = 'hidden';
            link.href= notification.url;
            const divs = document.getElementsByTagName('div');
            divs[0].appendChild(link);
            link.click();
        }}  alignItems='flex-start'>
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
