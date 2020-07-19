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

const useNoteQuery = (meId) => {
  const { data, loading } = useQuery(NOTIFICATION_QUERY, {
    variables: { userId: meId }
  });

  if (!loading && data && data.newNotifications) {
    return data.newNotifications;
  }
};

export function NotificationsPopover({ meId }) {
  let notificationIds;
  const classes = useStyles();
  const [setSeen] = useMutation(SET_SEEN_MUTATION);
  const history = useHistory();
  const {  subscribeToMore, data, loading, error, refetch } = useQuery(NOTIFICATION_QUERY, {
    variables: {userId: meId}
  });


  if (error) console.log(error);
  if (!loading&&data){
    notificationIds = data.newNotifications.map(el=>el.id);
    console.log(notificationIds);
  }
  

  const handleClose = () => {
    if (notificationIds&&notificationIds.length>0){
      const { data, loading, error } = setSeen({
        variables:{notificationIds}
      });
      if (error) console.log(error);
      if (!loading && data){
        if (data.setSeen===true){
          refetch({variables:{userId:meId}});
        }
      }
    }
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={classes.popoverDiv}>
          <Notifications
            meId={meId}
            trigger={bindTrigger(popupState)}
            data={data}
            loading={loading}
            error={error}
              subscribeToNew={() => {
                subscribeToMore({
                  document: NOTIFICATIONS,
                  variables: {userId: meId},
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newNotifications = subscriptionData.data.notificationsSub;
                    console.log( Object.assign({},prev,{newNotifications}))
                    return Object.assign({},prev,{newNotifications});
                  }})
                }}
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
           
            onClose={()=>{
              let bind = bindPopover(popupState);
              handleClose();
              bind.onClose();
            }}
          >
            <NotificationsList
              history={history}
              data={data}
              loading={loading}
              error={error}
              subscribeToNew={() => {
                subscribeToMore({
                  document: NOTIFICATIONS,
                  variables: {userId: meId},
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newNotifications = subscriptionData.data.notificationsSub;
                    console.log( Object.assign({},prev,{newNotifications}))
                    return Object.assign({},prev,{newNotifications});
                  }})
                }}
             />
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
