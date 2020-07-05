import React, { useEffect } from "react";
import PropTypes from "prop-types";
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
import { Link as RouterLink, useHistory } from "react-router-dom";
import { GET_ME, SEARCH_USERS } from "../graphql/Queries";
import { LOGOUT } from "../graphql/Mutations";

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

export default function Header({ setLoggedIn, isLoggedIn, client }) {
  const classes = useStyles();
  const [logout] = useMutation(LOGOUT);
  const { data, refetch } = useQuery(GET_ME);
  let history = useHistory();

  useEffect(() => {
    if (isLoggedIn !== (data && data.me)) {
      refetch();
    }
    if (data && data.me) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  function search(terms) {
    console.log("search values is", terms);
    history.push("/search", { searchTerm: terms });
  }

  console.log("data is ", JSON.stringify(data));
  console.log("is logged in? ", isLoggedIn);

  const renderUser = (
    <div className={classes.accountIcons}>
      <IconButton
        aria-label="account of current user"
        component={RouterLink}
        to={`${data && data.me ? "/profile/" + data.me.id : "/"}`}
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
          {isLoggedIn ? renderUser : renderGuest}
        </Toolbar>
      </AppBar>
    </div>
  );
}
