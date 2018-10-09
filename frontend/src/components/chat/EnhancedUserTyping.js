import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const EnhancedUserTyping = ({ username }) => (
    <ListItem key={username}>
      <Avatar alt={username} src={'http://i.pravatar.cc/150?img=3'} />
      <span className="typing-indicator">
        <ListItemText secondary={`${username} is typing...`} />
      </span>
    </ListItem>
);

EnhancedUserTyping.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
};

export default EnhancedUserTyping;
