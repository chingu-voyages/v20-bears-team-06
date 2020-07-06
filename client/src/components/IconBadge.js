import React from 'react';
import { Badge, SvgIcon, makeStyles, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles({
    svgIcon: {
        display: 'flex',
        direction:'row',
        justifyContent:'center'
    }
});

export const IconBadge = ({children},{count}) =>{ 
    const classes = useStyles();
    return (
    <>
<CssBaseline />
<Badge color='secondary' badgeContent={count?count:0}>
    
                <SvgIcon className={classes.svgIcon} children={children}  >
                </SvgIcon>
</Badge>
</>
)};