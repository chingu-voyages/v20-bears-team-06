import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useAuth } from "../graphql/Hooks";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { makeStyles, fade, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  useMediaQuery,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link as RouterLink, useHistory, Redirect } from "react-router-dom";
import { NotificationsPopover } from "./mui_components/NotificationsPopover";
import { GET_ME } from "../graphql/Queries";
import { useLocation } from 'react-router-dom';

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
    [theme.breakpoints.down('sm')] :{
      width: '68%',
      marginRight: '0',
      marginBottom: theme.spacing(2)
    }
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
  barButtons : {
    [theme.breakpoints.down('sm')]:{
      padding: '2px 5px'
    }
  },
  buttonText : {
    [theme.breakpoints.down('sm')]:{
      fontSize: '.65rem'
    }
  },
  mobileTitle: {
    marginTop: theme.spacing(2)
  },
  mediumButton: {
    [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end'
    }
  }
}));

const LOGOUT = gql`
  mutation {
    logout
  }
`;

export default function Header() {
  const [redirect, setRedirect ] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const [logout] = useMutation(LOGOUT);
  let history = useHistory();
  const client = useApolloClient();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  let meData;
  const { data, error, loading } = useQuery(GET_ME);
  if (error) console.log(error);
  if (!loading&&data&&data.me){
    meData = data;
  }
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
    <Grid container spacing={1} xs={4} sm={4} md={3} justify='center' alignItems='center' className={classes.mediumButton}>
    <Grid item container direction='row' justify='center' alignItems='center' className={classes.mediumButton} xs={12} md={6}>
     {redirect!==null && <Redirect to={redirect} />}
      {me && <NotificationsPopover meId={me.id} />}

      <IconButton
        aria-label="account of current user"
        onClick={() => {
         setRedirect(`${me ? "/profile/" + me.id : "/"}`)
         
        }}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      </Grid>
      <Grid item>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        onClick={async () => {
          await logout(LOGOUT);
          setTimeout(async () => {
            await client.resetStore();
            setRedirect('/');
          }, 400);
        }}
      >
        Log Out
      </Button>
      </Grid>
    </Grid>
  );

  const renderGuest = (
    <Grid container spacing={1} xs={2} sm={2} justify='flex-end'>
      <Grid item >
      <Button
        component={RouterLink}
        to={"/login"}
        variant="outlined"
        size="small"
        color="inherit"
        className={classes.barButtons}
      >
        <Typography className={classes.buttonText} variant='subtitle2' align='center'>
          Log In
        </Typography>
      </Button>
      </Grid>
       <Grid item>
      <Button
        component={RouterLink}
        to={"/register"}
        variant="outlined"
        size="small"
        color="inherit"
        className={classes.barButtons}
      >
       <Typography className={classes.buttonText} variant='subtitle2' align='center'>
          Sign Up
        </Typography>
      </Button>
    </Grid>
    </Grid>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
      {!matches&&
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
        </Toolbar>}
        {matches && <Toolbar className={classes.mobileToolbar}>
          <Grid container xs={9} justify='center' spacing={1}>
          <Typography
            gutterBottom
            component={RouterLink}
            to={"/"}
            variant="h4"
            color="inherit"
            align="justify"
            className={classes.mobileTitle}
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
          </Grid>
          <div className={classes.grow} />
          {me ? renderUser : renderGuest}
        </Toolbar>}
      </AppBar>
    </div>
  );
}
