import React, { useEffect , useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

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
import { Link as RouterLink } from "react-router-dom";
import { Notifications } from './Notifications';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  accountIcons: {
    position: "relative",
    marginRight: 0,
    marginLeft: theme.spacing(1),
  },
  search: {
    flex: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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

const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;

const LOGOUT = gql`
  mutation {
    logout
  }
`;

export default function Header({ setLoggedIn, isLoggedIn, client, meId, setMeId }) {
  const classes = useStyles();
  const [logout] = useMutation(LOGOUT);
  const { data, refetch } = useQuery(GET_ME);

  useEffect(() => {
    if (isLoggedIn !== (data && data.me)) {
      refetch();
    }
    if (data && data.me) {
      setLoggedIn(true);
      setMeId(data.me.id);
    } else {
      setLoggedIn(false);
    }
  });

  const handleAccountRedirect = () => {
    return null;
  };

  const renderUser = (
    
    <div className="accountIcons">
      <Notifications meId={meId} />
      <IconButton
        aria-label="account of current user"
        onClick={handleAccountRedirect}
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
          await setLoggedIn(false);
          setTimeout(async () => {
            await client.resetStore();
          }, 400);
        }}
      >
        Log Out
      </Button>
    </div>
  );

  const renderGuest = (
    <div className="accountIcons">
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
          <Typography variant="h5" color="inherit" align="left" noWrap>
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
            />
          </div>
          {isLoggedIn ? renderUser : renderGuest}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
