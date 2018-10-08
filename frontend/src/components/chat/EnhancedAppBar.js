import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Code from '@material-ui/icons/Code';
import FastFood from '@material-ui/icons/FastFood';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import EnhancedSidebar from './EnhancedSidebar';
import EnhancedMessageList from './EnhancedMessageList';

const drawerWidth = 240;
import styles from './styles';

function EnhancedAppBar(props) {
  const { classes } = props;
  const buttonClassname = classNames({
    [classes.buttonSuccess]: props.chat.fetching,
  });
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.appBarContent}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ margin: 12 }} variant="title" color="inherit" noWrap>
              Chicken Chat
            </Typography>
            <Tooltip title='Lobby'>
              <Button
                style={{ width: 35, height: 35, margin: 6 }}
                variant="fab"
                disabled={props.chat.fetching || props.user.currentChannel === 'lobby'}
                className={buttonClassname}
                onClick={() => props.changeChannel('lobby')}
                color="secondary">
                <MeetingRoom />
                {props.chat.fetching && <CircularProgress size={42} className={classes.fabProgress} />}
              </Button>
            </Tooltip>
            <Tooltip title='Coding'>
              <Button
                style={{ width: 35, height: 35, margin: 6 }}
                variant="fab"
                disabled={props.chat.fetching || props.user.currentChannel === 'coding'}
                className={buttonClassname}
                onClick={() => props.changeChannel('coding')}
                color="secondary">
                <Code />
                {props.chat.fetching && <CircularProgress size={42} className={classes.fabProgress} />}
              </Button>
            </Tooltip>
            <Tooltip title='Food'>
              <Button
                style={{ width: 35, height: 35, margin: 6 }}
                variant="fab"
                disabled={props.chat.fetching || props.user.currentChannel === 'food'}
                className={buttonClassname}
                onClick={() => props.changeChannel('food')}
                color="secondary">
                <FastFood />
                {props.chat.fetching && <CircularProgress size={42} className={classes.fabProgress} />}
              </Button>
            </Tooltip>
          </div>
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
        <EnhancedMessageList channel={props.user.currentChannel} />
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
