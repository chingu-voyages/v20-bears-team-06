import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_FOLLOWER_MUTATION } from '../graphql/Mutations';
import { Link, useRouteMatch } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  titleText: {
    color: theme.palette.primary.light,
    fontSize: theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightBold,
    maxWidth: theme.spacing(10)
  },
  inline: {
    display: 'inline',
  },
  listItem:{
      height: theme.spacing(12)
  },
  [theme.breakpoints.down('md')] : {
    titleText: {
      fontSize: '.5rem',
      textAlign: 'left'
    },
    button: {
      display: 'inline',
      marginTop: theme.spacing(3)
    } 
  }
}));

export const FollowersListItem = ({follower, meId}) => {
  const [remove] = useMutation(REMOVE_FOLLOWER_MUTATION);
  const removeFollower = async (event) =>{
      const response = await remove({
        variables:{meId,userId: follower.id}
      });
  }
  let match = useRouteMatch();
  let path = match.path.replace(':userId/followers',follower.id);
  let isOwnProfile = match.params.userId === meId;
  const classes = useStyles();
  if (follower){   
  return (
    <ListItem divider id={follower.id} className={classes.listItem} key={follower.id} alignItems="flex-start">
      <ListItemAvatar component>
      <Link to={path}>
          <Avatar   alt={follower.name} src={follower.profilePic_url}/>
          </Link>  
      </ListItemAvatar>
      
        <ListItemText
          primaryTypographyProps={{ className: classes.titleText }}
          primary={follower.name}
          secondary={
            <>
              <Typography
                component="span"
                className={classes.inline}
                variant="caption1"
                color="primary"
              >
                {follower.employment} {follower.location} 
              </Typography>
            </>
          }
        />
       {isOwnProfile&& <ListItemSecondaryAction>
        <Button  onClick={removeFollower}><DeleteIcon className={classes.button} size='small' color='primary' /></Button>
        </ListItemSecondaryAction>}
      <Divider fullwidth />
    </ListItem>
  ); };
  return null;
};
