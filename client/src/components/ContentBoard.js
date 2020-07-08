import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../pages/ProfilePage";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from "../graphql/Mutations";
import { GET_ME, FOLLOWER_IDS } from "../graphql/Queries";
import { FollowerCount } from "./FollowerCount";
import { ContentDisplay } from "./ContentDisplay";

const useIsFollowing = (profile, meId) => {
  if (profile && meId) {
    let ids = profile.followers.map((el) => el.id);
    return ids.includes(meId);
  }
};

const useStyles = makeStyles((theme) => ({
  root: {},
  avatarGroup: {
    justifyContent: "center",
    padding: theme.spacing(2),
    "& div": {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  leftCard: {
    minHeight: theme.spacing(10),
  },
  followButton: {
    padding: theme.spacing(2),
  },
  fileDisplay: {
    height: theme.spacing(20),
    "& div": {
      [theme.breakpoints.up("xs")]: {
        height: theme.spacing(4),
      },
      [theme.breakpoints.up("md")]: {},
    },
  },
  contentCard: {
    boxSizing: "border-box",
    height: "85%",
    width: "100%",
  },
  contentToolbar: {
    backgroundColor: theme.palette.primary.light,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "white",
  },
  toolbarText: {
    color: "white",
  },
}));

export const ContentBoard = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  let context = useContext(ProfileContext);

  let { profile, isLoggedIn, isOwnProfile, meId } = context;

  const following = useIsFollowing(profile, meId);

  const [isFollowing, setIsFollowing] = useState(following);

  const { userId } = useParams();

  const [follow] = useMutation(FOLLOW_USER_MUTATION);
  const [unfollow] = useMutation(UNFOLLOW_USER_MUTATION);

  const followUser = async () => {
    const response = await follow({
      variables: {
        userId: meId || null,
        toFollow: userId || null,
      },
    });

    console.log(response);
    if (response) {
      setIsFollowing(!isFollowing);
    }
  };

  const unfollowUser = async () => {
    const response = await unfollow({
      variables: {
        userId: meId || null,
        toUnfollow: userId || null,
      },
    });

    if (response) {
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <>
      <Grid
        className={classes.contentCard}
        item
        container
        xs={12}
        md={4}
        direction="row"
      >
        <Grid item container xs={12} justify="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  About Me
                </Typography>
                <Typography variant="body2" align="justify">
                  {profile && profile.about_me}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container xs={12} justify="center">
            <Grid item xs={12} md={10}>
              <Card>
                <FollowerCount
                  currentCount={profile && profile.follower_count}
                />
                <Typography variant="h5" align="center" color="primary">
                  followers
                </Typography>
                <AvatarGroup
                  className={classes.avatarGroup}
                  align="center"
                  max={4}
                  size="small"
                >
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </AvatarGroup>
                <Grid container justify="center" xs={12}>
                  <Grid item className={classes.followButton}>
                    {!isOwnProfile && meId && !isFollowing && (
                      <Button
                        onClick={followUser}
                        size="small"
                        variant="outlined"
                        color="primary"
                      >
                        follow
                      </Button>
                    )}
                    {!isOwnProfile && meId && isFollowing && (
                      <Button
                        onClick={unfollowUser}
                        size="small"
                        variant="outlined"
                        color="primary"
                      >
                        <Typography
                          color="secondary"
                          variant="subtitle2"
                          align="center"
                        >
                          unfollow
                        </Typography>
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row" xs={12} md={8}>
        <Grid item xs={12}>
          <Card className={classes.contentCard}>
            <Toolbar className={classes.contentToolbar} variant="dense">
              <IconButton>
                <AccountCircleIcon className={classes.toolbarText} />
              </IconButton>
              <Typography variant="h6" className={classes.toolbarText}>
                {profile && profile.name}'s Content
              </Typography>
            </Toolbar>
            <ContentDisplay userId={userId} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
