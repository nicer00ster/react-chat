import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const EnhancedMessage = ({ message, user, sender }) => (
    <ListItem key={message._id}>
      <Avatar alt={user} src={'http://i.pravatar.cc/150?img=3'} />
      <ListItemText primary={message} secondary={user || sender} />
    </ListItem>
);

EnhancedMessage.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default EnhancedMessage;
