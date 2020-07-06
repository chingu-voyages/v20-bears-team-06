import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Divider from "@material-ui/core/Divider";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { SEARCH_USERS, SEARCH_POSTS } from "../graphql/Queries";
import FolderIcon from "@material-ui/icons/Folder";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Grid, Typography, ListItem, IconButton } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function generateTeacherResults(results, element) {
  return results.map((value) =>
    React.cloneElement(
      <ListItem>
        <ListItemAvatar>
          <AccountCircleIcon />
        </ListItemAvatar>
        <ListItemText
          primary={value.name}
          secondary={
            value.position && value.school
              ? `${value.position} at ${value.school}`
              : "new user at teachers app"
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="arrowforward"
            component={RouterLink}
            to={`${"/profile/" + value.id}`}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>,
      {
        key: value.id,
      }
    )
  );
}

function generatePostResults(results, element) {
  return results.map((value) =>
    React.cloneElement(
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={value.author} secondary={value.text} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="arrowforward"
            component={RouterLink}
            to={`${"/posts/" + value.id}`}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>,
      {
        key: value.id,
      }
    )
  );
}

export default function SearchResults({ searchTerm }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: {
      searchTerm: searchTerm,
    },
  });
  const { postResults, postRefetch } = useQuery(SEARCH_POSTS);

  if (loading) {
    return <div>...loading</div>;
  }
  return data ? (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Teachers
          </Typography>
          <Divider />
          <div className={classes.demo}>
            <List dense={dense}>{generateTeacherResults(data.users)}</List>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Typography variant="h6" className={classes.title}>
      No results found
    </Typography>
  );
}
