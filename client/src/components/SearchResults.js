import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { useMutation, useQuery } from "@apollo/react-hooks";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { SEARCH_USERS, SEARCH_POSTS } from "../graphql/Queries";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Typography, ListItem, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function generate(results, element) {
  return results.map((value) =>
    React.cloneElement(element, {
      key: value.id,
    })
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
  console.log("search results component", JSON.stringify(searchTerm));
  console.log(
    "search terms are: ",
    data,
    " or error",
    error,
    " or loading ",
    loading
  );
  return data ? (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Avatar with text and icon
        </Typography>
        <div className={classes.demo}>
          <List dense={dense}>
            {generate(
              data.users,
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </div>
      </Grid>
    </div>
  ) : (
    <Typography variant="h6" className={classes.title}>
      No results found
    </Typography>
  );
}
