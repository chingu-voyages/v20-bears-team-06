import React from 'react';
import {Paper, Card, Grid, makeStyles, Container, Typography} from '@material-ui/core';
import { useCachedMe } from './EditPage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FollowersList } from '../components/mui_components/FollowersList';
import { GET_PROFILE } from '../graphql/Queries';



const useStyles = makeStyles(theme=>({
    [theme.breakpoints.up('md')]:{
    
        paper: {
            width: '40vw',
            height: '90vh',
            padding: theme.spacing(3)
        },
        paperScroll: {
            width: '60vw',
            minHeight: '90vh',
            padding: theme.spacing(3),
            
        }
    },

}));

const useProfile = () => {
    const { userId } = useParams();
    const { data, loading, error } = useQuery(GET_PROFILE,{
        variables: {userId}
    });
    if (error) console.log(error);
    if (loading) return null;
    if (!loading&&data) return data.user;
}



export const FollowersPage = () => {
    const classes = useStyles();
    const meId = useCachedMe();
    const { userId } = useParams();
    const profile = useProfile();
    const isOwnProfile = userId&&meId? userId===meId: false;




    return(
        <Container className={classes.paper} >
            <Paper className={classes.paper}>
                <Typography align='center' component='h1' variant='h4' color='primary'>
                    Followers
                </Typography>
                <FollowersList meId={meId?meId:null} followers={profile&&profile.followers} isOwnProfile={isOwnProfile}  />
            </Paper>
        </Container>
    )




}