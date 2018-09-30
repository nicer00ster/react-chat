import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const EnhancedMessage = ({ message, sender }) => (
  sender !== 'Me'
    ? <ListItem key={sender.id}>
        <Avatar alt={sender} src={'http://i.pravatar.cc/150?img=3'} />
        <ListItemText primary={message} secondary={sender} />
      </ListItem>
    : <ListItem key={sender.id}>
        <Avatar alt={sender} src={'http://i.pravatar.cc/150?img=3'} />
        <ListItemText primary={message} secondary={sender} />
      </ListItem>
);

EnhancedMessage.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
};

export default EnhancedMessage;
