import React from 'react';
import { List, makeStyles, Container, Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_PROFILE } from '../../graphql/Queries';
import { useProfile } from '../../graphql/Hooks';
import { useCachedMe } from '../../pages/EditPage';
import { FollowersListItem } from '../FollowersListItem';

const useStyles = makeStyles(theme=>({

    [theme.breakpoints.up('md')] : {
    listContainer: {
        width: '70%',
        maxHeight: '70%'
    },
    list: {
        marginTop: theme.spacing(10),
        overflowY: 'scroll',
        maxHeight: theme.spacing(70)
    }
},
    [theme.breakpoints.up('xs')] : {
       list: {
           marginTop: theme.spacing(10)

       }
    },
})
    )

export const FollowersList = ({followers, meId, isOwnProfile}) => {
    const classes = useStyles();
    let followersList = [];


    if (followers){
        followersList = followers.map((el,i) => {
            return (
                <>
                <FollowersListItem meId={meId} follower={el} />
                <Divider/>
                </>
            ) 
        })
    }





    return (
        <Container className={classes.listContainer} >
        <List className={classes.list} >
            {followersList.reverse()}
        </List>
        </Container>
    )
}