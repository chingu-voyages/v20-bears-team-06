import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { FOLLOWER_SUB } from '../graphql/Subscriptions';
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

export const Notifications = ({meId}) => {


    const classes = useStyles();

    
    return (
        <IconButton>
            <Badge className={classes.icon} badgeContent={10}>
                <SvgIcon className={classes.icon} >
                    <NotifcationsIcon/>
                </SvgIcon>
            </Badge>
        </IconButton>
    )
    

}