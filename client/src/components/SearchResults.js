import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Divider from "@material-ui/core/Divider";
import GetAppIcon from "@material-ui/icons/GetApp";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import {
  SEARCH_USERS,
  SEARCH_POSTS,
  SEARCH_FILES,
  GET_USER_INFO,
  GET_ME
} from "../graphql/Queries";
import FolderIcon from "@material-ui/icons/Folder";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Grid, Typography, ListItem, IconButton } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { filetypeDownloadHandler } from "../utils/filetypeDownloadHandler";

import aws from "aws-sdk";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: theme.palette.background.paper,
    margin: "10px",
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
          {value.profilePic_url ? (
            <Avatar src={value.profilePic_url} />
          ) : (
            <AccountCircleIcon />
          )}
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
  if (results && results.searchPosts) {
    return results.searchPosts.map((value) =>
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
              to={`${"/profile/" + value.userId}`}
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
};

function generateFileResults(results, handleDownloadClick, me){
  console.log("these are file results", results);
return results.map((value) =>
    React.cloneElement(
      <ListItem>
        <ListItemAvatar>
          <FolderIcon />
        </ListItemAvatar>
        <ListItemText
          primary={value.filename}
          secondary={
            value.name_pretty && value.description
              ? `${value.name_pretty}
              ${value.description}`
              : ""
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
          <IconButton disabled={me===null} onClick={handleDownloadClick}
          aria-label='downloadfile'
          title={`${value.key},${value.filetype},${value.id}`}
          >
            <GetAppIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>,
      {
        key: value.id
      }
    )
  );
}


/*function generateFileResults(results, element) {
  console.log("these are file results", results);

  if (results&&results.searchFiles) {
    return results.map((value) => {
      React.cloneElement(
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemAvatar>
            <IconButton
              edge="end"
              aria-label="arrowforward"
              component={RouterLink}
              to={`${"/profile/" + value.ownerId}`}
            >
              <AccountCircle />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={value.name_pretty}
            secondary={value.description}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() =>
                filetypeDownloadHandler(value.key, value.filetype, value.id)
              }
            >
              <GetAppIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>,
        {
          key: value.id,
        }
      );
    });
  }
}*/


export default function SearchResults({ searchTerm }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
 let me= null;
 const { data, loading, error } = useQuery(GET_ME);
 if (error) console.log(error);
 if (!loading&&data&&data.me){
   me = data.me;
 }

  const [secondary, setSecondary] = React.useState(false);

  const handleDownloadClick = (event) => {
    const [key, filetype, id ] = event.currentTarget.title.split(",");
    filetypeDownloadHandler(key,filetype,id);
  }
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    SEARCH_USERS,
    {
      variables: {
        searchTerm: searchTerm,
      },
    }
  );
  const { loading: postLoading, error: postError, data: postData } = useQuery(
    SEARCH_POSTS,
    {
      variables: {
        searchTerm: searchTerm,
      },
    }
  );

  const { loading: fileLoading, error: fileError, data: fileData } = useQuery(
    SEARCH_FILES,
    {
      variables: {
        searchTerm: searchTerm,
      },
    }
  );

  if (userLoading || postLoading || fileLoading) {
    return <div>...loading</div>;
  }

  const userResults = userData ? (
    <div>
      <Typography variant="h6" className={classes.title}>
        Teachers
      </Typography>
      <Divider />
      <div className={classes.demo}>
        <List dense={dense}>{generateTeacherResults(userData.users)}</List>
      </div>
    </div>
  ) : (
    <Typography variant="h6">No user results found</Typography>
  );

  const postResults = postData ? (
    <div>
      <Typography variant="h6" className={classes.title}>
        Posts
      </Typography>
      <Divider />
      <div className={classes.demo}>
        <List dense={dense}>{generatePostResults(postData.posts)}</List>
      </div>
    </div>
  ) : (
    <Typography variant="h6">No post results found</Typography>
  );
  console.log("what is filedata? ", JSON.stringify(fileData));

  const { searchFiles } = fileData ? fileData : { searchFiles: null };

  const fileResults = searchFiles ? (
    <div>
      <Typography variant="h6" className={classes.title}>
        Files
      </Typography>
      <Divider />
      <div className={classes.demo}>
        <List dense={dense}>{generateFileResults(searchFiles, handleDownloadClick, me)}</List>
      </div>
    </div>
  ) : (
    <Typography variant="h6">No file results found</Typography>
  );

  function buildSearchResults(userResults, fileResults) {
   
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {userResults}
          </Grid>
          <Divider />
          <Grid item xs={12}>
            {fileResults}
          </Grid>
          <Divider />
        </Grid>
      </div>
    );
  }

  return !userData && !postData && !fileData ? (
    <Typography variant="h6" className={classes.title}>
      No results found
    </Typography>
  ) : (
    buildSearchResults(userResults,fileResults)
  );
}
