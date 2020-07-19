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

export const Notifications = ({subscribeToNew, data, loading, error, trigger, ...props}) => {
  const classes = useStyles();
  useEffect(() => {
    subscribeToNew();
  });

  const length = data&&data.newNotifications.length;
  return (
    <IconButton {...trigger}>
      <Badge
        className={classes.icon}
        badgeContent={length}        
      >
        <SvgIcon className={classes.icon}>
          <NotifcationsIcon {...props.trigger} />
        </SvgIcon>
      </Badge>
    </IconButton>
  );
};
