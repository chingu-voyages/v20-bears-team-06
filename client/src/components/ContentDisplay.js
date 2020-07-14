import React, { useState } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import { Query, Subscription, Mutation } from '@apollo/react-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Grid, Box, Container, makeStyles, List, ListItem, ListItemAvatar } from '@material-ui/core';
import { GET_FILES, GET_SAVED_FILES, GET_ALL_FILES, GET_PROFILE} from '../graphql/Queries';
import { INCREMENT_DOWNLOAD_MUTATION, DELETE_FILE } from '../graphql/Mutations';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FileCard } from './FileCard';
const useStyles = makeStyles(theme=>({
    displayArea:{
        [theme.breakpoints.up('md')]:{
            height: '60vh'
        }
    },
    cardGrid:{
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        height: '60vh',
        scrollBehavior: 'smooth',
        overflow: 'scroll'
    },
    gridCard:{
        padding: theme.spacing(3)
    },
    fab: {
        position: 'fixed'
    }
   
}))


export const ContentDisplay=({userId, update, meId, toDisplay})=>{
    const [toRender, setToRender] = useState(update);
    const [increment] = useMutation(INCREMENT_DOWNLOAD_MUTATION); 
    const classes = useStyles();
    const history = useHistory();
    
    return(

<Grid className={classes.cardGrid} container xs={12} justify='flex-start'  direction='row' >
 <Query query={GET_PROFILE} pollInterval={500} variables={{userId:userId}}>
     {({data , loading, error}) => {
         

         if(loading&&!data) {
             return 'loading...'
         }
        
         if (!loading&&data&&data.user){
             const {user} = data;
             let files;
             if (toDisplay==='user'){
                 files = user.uploads;
             }

             if (toDisplay==='saved'){
                 files = user.savedContent;
             }

             if (toDisplay==='favorite'){
                 files = user.favoriteContent;
             }
             return(<>
                 {files.map((file,i)=>{
                     return (<Grid item xs={6} md={3} className={classes.gridCard}  key={file.id}>
                        <FileCard meId={meId} increment={increment} history={history} file={file} key={`file_${file.id}`} />
                        </Grid>)
                 })}</>)
                
             
         }if (error){
             console.log(error);
             return null;
         }
        

        

        
         
     }}
 </Query>
 
              
 
 </Grid>
 
     



)};




    



