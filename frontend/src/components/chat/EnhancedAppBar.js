import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import EnhancedSidebar from './EnhancedSidebar';
import EnhancedMessageList from './EnhancedMessageList';

const drawerWidth = 240;
import styles from './styles';

function EnhancedAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.appBarContent}>
          <Typography variant="title" color="inherit" noWrap>
            Chicken Chat
          </Typography>
          <Button
            onClick={() => props.logout()}
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.toolbar} />
        <List>
          <EnhancedSidebar
            activeUsers={props.activeUsers}
            chat={props.chat}
            focusedUser={props.focusedUser} />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <EnhancedMessageList />
      </main>
    </div>
  );
}

EnhancedAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  chat: PropTypes.object,
  focusedUser: PropTypes.func,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedAppBar);
