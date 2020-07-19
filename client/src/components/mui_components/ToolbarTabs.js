import React, { useState, useEffect } from 'react';
import {Tab, Tabs, Typography, makeStyles } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import SaveIcon from '@material-ui/icons/Save';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme=>({
    tabButton: {
        color: 'white'
    }
}))


export const ToolbarTabs = ({setToDisplay, toDisplay}) => {
    const [ value, setValue ] = useState(toDisplay);
    
    useEffect(() => {
        setToDisplay(value);
    },[value]);


    const classes = useStyles();



    const handleContentSwitch = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
        <Tabs
            value={toDisplay}
            indicatorColor='primary'
            aria-label='toolbar-tabs'
            fullwidth
            onChange={handleContentSwitch}
            centered
            >
             <Tab className={classes.tabButton} icon={<FaceIcon />} value='user' aria-label='user'/>
             <Tab className={classes.tabButton} icon={<SaveIcon />} value='saved' aria-label='saved'/>
             <Tab className={classes.tabButton} icon={<FavoriteIcon />} value='favorite' aria-label='favorite'/>            
            </Tabs>
        
        </>
    )
}