import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useAuth } from "../graphql/Hooks";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { NotificationsPopover } from "./mui_components/NotificationsPopover";
import { GET_ME_CACHE } from "../graphql/Queries";
import { useLocation } from 'react-router-dom';
import { weirdRouter } from '../utils/weirdRouter';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  accountIcons: {
    margin: theme.spacing(1),
    flexWrap: "nowrap",
    flexDirection: "row-reverse",
    display: "flex",
    textAlign: "center",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LOGOUT = gql`
  mutation {
    logout
  }
`;

export default function Header() {
  const classes = useStyles();
  const location = useLocation();
  const [logout] = useMutation(LOGOUT);
  let history = useHistory();
  const client = useApolloClient();
  console.log(client)

  const { data: meData } = useQuery(GET_ME_CACHE);
  // const { data: testMe } = client.readQuery({
  //   query: gql`
  //     {
  //       me {
  //         id
  //         name
  //         firstName
  //       }
  //     }
  //   `,
  // });
  // console.log("test me data", testMe);
  const me = meData ? meData.me : null;
  console.log("header data me", meData);
  function search(searchTerm) {
    console.log("search values is", searchTerm);
    history.push("/search", { searchTerm });
  }

  const renderUser = (
    <div className="accountIcons">
      {me && <NotificationsPopover meId={me.id} />}

      <IconButton
        aria-label="account of current user"
        component={RouterLink}
        onClick={() => {
         const link = document.createElement('a');
         link.style.display= 'hidden';
         link.href = me?`/profile/${me.id}`:'/';
         let divs = document.getElementsByTagName('div');
         divs[0].appendChild(link);
         link.click();
         
        }}
        to={`${me ? "/profile/" + me.id : "/"}`}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        onClick={async () => {
          await logout(LOGOUT);
          setTimeout(async () => {
            await client.clearStore();
            weirdRouter('/');
          }, 400);
        }}
      >
        Log Out
      </Button>
    </div>
  );

  const renderGuest = (
    <div className={classes.accountIcons}>
      <Button
        component={RouterLink}
        to={"/login"}
        variant="outlined"
        size="small"
        color="inherit"
      >
        Log In
      </Button>

      <Button
        component={RouterLink}
        to={"/register"}
        variant="outlined"
        size="small"
        color="inherit"
      >
        Sign Up
      </Button>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            component={RouterLink}
            to={"/"}
            variant="h5"
            color="inherit"
            align="left"
            noWrap
          >
            Teachers App
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyUp={(event) => {
                if (event.key == "Enter") search(event.target.value);
              }}
            />
          </div>
          <div className={classes.grow} />
          {me ? renderUser : renderGuest}
        </Toolbar>
      </AppBar>
    </div>
  );
}
