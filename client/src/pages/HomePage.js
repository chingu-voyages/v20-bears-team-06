import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Container,
  fade,
  InputBase,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { GET_ME_CACHE } from "../graphql/Queries";
import SearchIcon from "@material-ui/icons/Search";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { GET_ME } from "../graphql/Queries";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroText: {
    margin: theme.spacing(5),
    fontSize: "2.6rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.6rem",
    },
  },
  heroSubText: {
    margin: theme.spacing(2),
    fontSize: "1.4rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.8rem",
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    margin: theme.spacing(2),
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
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    // width: "20ch",
    // },
  },
  welcomeText: {
    margin: theme.spacing(4),
  },
  profileButton: {
    margin: theme.spacing(2),
  },
}));

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const searchFieldText = isMobile
    ? "Search..."
    : "Search for teachers and documents here...";
  function search(terms) {
    console.log("search values is", terms);
    history.push("/search", { searchTerm: terms });
  }
  let history = useHistory();
  const { data: meData } = useQuery(GET_ME_CACHE);
  const me = meData ? meData.me : null;
  console.log(`homepage login ? ${me}`);

  return me ? (
    <div>
      <Container maxWidth="md" align="center">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.welcomeText}
        >
          {`Welcome ${me.firstName}!`}
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={searchFieldText}
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
        <Button
          aria-label="account of current user"
          component={RouterLink}
          variant="outlined"
          size="large"
          className={classes.profileButton}
          to={`/profile/${me.id}`}
        >
          View Your Profile, Connections, and Content
        </Button>
      </Container>
    </div>
  ) : (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            className={classes.heroText}
            component="h1"
            variant="h2"
            align="center"
          >
            Welcome to the Teacher's App!
          </Typography>
          <Typography
            className={classes.heroSubText}
            variant="h5"
            align="center"
          >
            A social space for teachers to share lesson plans, handouts, and
            other documents in these trying times.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  component={RouterLink}
                  to={"/register"}
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={RouterLink}
                  to={"/login"}
                  variant="outlined"
                  color="primary"
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}
