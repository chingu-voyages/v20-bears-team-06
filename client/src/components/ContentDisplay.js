import React, { useState } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import { Query, Subscription, Mutation } from '@apollo/react-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import {
  Grid,
  Box,
  Container,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
} from '@material-ui/core';
import {
  GET_FILES,
  GET_SAVED_FILES,
  GET_ALL_FILES,
  GET_PROFILE,
} from '../graphql/Queries';
import { INCREMENT_DOWNLOAD_MUTATION, DELETE_FILE } from '../graphql/Mutations';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FileCard } from './FileCard';
const useStyles = makeStyles((theme) => ({
  
  cardGrid: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: '65vh',
    overflowY: 'scroll',
    margin: 'auto',
    [theme.breakpoints.down('s')]:{
        justifyContent: 'space-between'
    },
    [theme.breakpoints.between('md','lg')]: {
      height: '60vh'
    }
  },

  gridCard: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('s')]: {
      marginTop: theme.spacing(2),  
      padding: theme.spacing(2),
      height: theme.spacing(3),
    },
    [theme.breakpoints.between('md','lg')]:{
      height: '100%'
    }
    
  },
  fab: {
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
    
  },
}));

export const ContentDisplay = ({ userId, update, meId, toDisplay }) => {
  const [toRender, setToRender] = useState(update);
  const [increment] = useMutation(INCREMENT_DOWNLOAD_MUTATION);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      className={classes.cardGrid}
      container
      xs={12}
      justify="flex-start"
      direction="row"
      spacing={1}
    >
      <Query query={GET_PROFILE} variables={{ userId: userId }}>
        {({ data, loading, error }) => {
          if (loading && !data) {
            return 'loading...';
          }

          if (!loading && data && data.user) {
            const { user } = data;
            let files;
            if (toDisplay === 'user') {
              files = user.uploads;
            }

            if (toDisplay === 'saved') {
              files = user.savedContent;
            }

            if (toDisplay === 'favorite') {
              files = user.favoriteContent;
            }
            return (
              <>
                {files.map((file, i) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={3}
                      md={4}
                      lg={3}
                      className={classes.gridCard}
                      key={file.id}
                    >
                      <FileCard
                        toDisplay={toDisplay}
                        meId={meId}
                        increment={increment}
                        history={history}
                        file={file}
                        key={`file_${file.id}`}
                      />
                    </Grid>
                  );
                })}
              </>
            );
          }
          if (error) {
            console.log(error);
            return null;
          }
        }}
      </Query>
    </Grid>
  );
};
