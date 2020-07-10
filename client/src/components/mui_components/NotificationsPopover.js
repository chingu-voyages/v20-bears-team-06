import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { AddSpecialtyForm } from "./AddSpecialtyForm";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Notifications } from "../Notifications";
import { NotificationsList } from "../NotificationsList";
import { useSubscription, useQuery, useMutation } from "@apollo/react-hooks";
import { NOTIFICATIONS } from "../../graphql/Subscriptions";
import { NOTIFICATION_QUERY } from "../../graphql/Queries";
import { SET_SEEN_MUTATION } from "../../graphql/Mutations";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  popoverDiv: {
    display: "inline-block",
  },
  paper: {
    maxHeight: theme.spacing(50),
  },
}));

const useNotes = (meId) => {
  const { data, loading } = useSubscription(NOTIFICATIONS, {
    variables: { userId: meId },
    shouldResubscribe: true,
  });

  if (!loading && data && data.notificationSub) {
    console.log(data.notificationSub);
    return data.notificationSub;
  }
};

const useNoteQuery = (meId) => {
  const { data, loading } = useQuery(NOTIFICATION_QUERY, {
    variables: { userId: meId },
  });

  if (!loading && data.newNotifications) {
    return data.newNotifications;
  }
};

export function NotificationsPopover({ meId }) {
  const classes = useStyles();
  const [setSeen] = useMutation(SET_SEEN_MUTATION);
  const history = useHistory();
  let notes = useNotes(meId);
  let qNotes = useNoteQuery(meId);
  notes = notes ? notes : qNotes;

  let notifications = notes;

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={classes.popoverDiv}>
          <Notifications
            notifications={notifications}
            meId={meId}
            trigger={bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              className: classes.paper,
            }}
          >
            <NotificationsList
              history={history}
              notifications={notifications}
            />
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
