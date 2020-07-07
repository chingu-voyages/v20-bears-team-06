import React, { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import { SvgIcon } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import NotifcationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "white",
  },
}));

export const Notifications = (props) => {
  const classes = useStyles();

  return (
    <IconButton>
      <Badge
        className={classes.icon}
        badgeContent={
          (props.notifications && props.notifications.length) || null
        }
      >
        <SvgIcon className={classes.icon}>
          <NotifcationsIcon {...props.trigger} />
        </SvgIcon>
      </Badge>
    </IconButton>
  );
};
