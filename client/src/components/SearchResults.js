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
import { SEARCH_USERS, SEARCH_POSTS, SEARCH_FILES } from "../graphql/Queries";
import FolderIcon from "@material-ui/icons/Folder";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Grid, Typography, ListItem, IconButton } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircle from "@material-ui/icons/AccountCircle";

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

function downloadFileHandler(key) {
  const s3 = new aws.S3({
    region: "us-west-1",
    signatureVersion: "v4",
  });
  s3.getObject({
    Bucket: process.env.S3_BUCKET,
    Key: key || "uploads/20200629-02amb-chingucli-1.png",
  });
}

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
}
function generateFileResults(results, element) {
  console.log("these are file results", results);
  if (results) {
    return results.map((value) =>
      React.cloneElement(
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
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
            <IconButton onClick={downloadFileHandler(value.key)}>
              <GetAppIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>,
        {
          key: value.id,
        }
      )
    );
  }
}
export default function SearchResults({ searchTerm }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
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
  const { searchFiles } = fileData;

  const fileResults = fileData ? (
    <div>
      <Typography variant="h6" className={classes.title}>
        Files
      </Typography>
      <Divider />
      <div className={classes.demo}>
        <List dense={dense}>{generateFileResults(searchFiles)}</List>
      </div>
    </div>
  ) : (
    <Typography variant="h6">No file results found</Typography>
  );

  function buildSearchResults() {
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
    buildSearchResults()
  );
}
