import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Grid }from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed'
  },
}));

export const BottomNavSwitch = ({ meId }) => {
  const classes = useStyles();
  const [value, setValue] = useState('userContent');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Grid item xs={4}>
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="User Content"
        value="userContent"
        icon={<AccountCircleOutlined />}
      />
      <BottomNavigationAction
        label="Saved Content"
        value="saved"
        icon={<FolderIcon />}
      />
      <BottomNavigationAction
        label="Favorite Content"
        value="favorite"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
    </Grid>
  );
};
