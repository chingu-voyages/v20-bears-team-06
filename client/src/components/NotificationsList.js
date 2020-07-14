import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { NotificationListItem } from './NotificationListItem';
import { Link, useHistory } from 'react-router-dom';

export function NotificationsList({data, error, loading, subscribeToNew, history}){
    useEffect(() => {
        subscribeToNew();
    });
    let displayNotes = data && data.newNotifications.map(el=>{
        return <NotificationListItem history={history} notification={el} />
    })
    return (
        <List   >
            {displayNotes.reverse()}

        </List>
    )
}