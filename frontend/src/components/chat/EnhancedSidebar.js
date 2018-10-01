import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const EnhancedSidebar = props => (
  <List>
    <Typography align="center" variant="caption">
      ONLINE
    </Typography>
    {Object.values(props.users).map(user => (
      user.isActive
      ? <ListItem
          onClick={e => props.focusedUser(e.target.textContent)}
          className={classNames([
            props.chat.focusedUser === user.username ? 'focused' : null,
            !user.isActive ? 'offline' : null
          ])}
          key={user._id}
          dense
          button>
          <Avatar alt={user.username} src={'http://i.pravatar.cc/150?img=3'} />
          <ListItemText primary={user.username} />
        </ListItem>
      : null
    ))}
    <Divider style={{ marginBottom: '1rem', marginTop: '1rem' }} />
    <Typography align="center" variant="caption">
      OFFLINE
    </Typography>
    {Object.values(props.users).map(user => (
      !user.isActive
      ? <ListItem
          onClick={e => props.focusedUser(e.target.textContent)}
          className={classNames([
            props.chat.focusedUser === user.username ? 'focused' : null,
            'offline'
          ])}
          key={user._id}
          dense
          button>
          <Avatar alt={user.username} src={'http://i.pravatar.cc/150?img=3'} />
          <ListItemText primary={user.username} />
        </ListItem>
      : null
    ))}
  </List>
);

EnhancedSidebar.propTypes = {
  // focusedUser: PropTypes.func,
  // users: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     name: PropTypes.string.isRequired,
  //   }).isRequired,
  // ).isRequired,
  // chat: PropTypes.shape({
  //   focusedUser: PropTypes.string,
  // }),
};

export default connect(state => ({
  users: state.user.users,
}), {})(EnhancedSidebar);
