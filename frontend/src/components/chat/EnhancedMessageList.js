import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import EnhancedMessage from './EnhancedMessage';
import EnhancedUserTyping from './EnhancedUserTyping';

const EnhancedMessageList = ({ messages, channel, usersTyping }) => (
  <List>
    {Object.values(messages).map(message => (
      channel === message.channel
      ? <EnhancedMessage
          key={message._id}
          {...message} />
      : null
    ))}
    {usersTyping.length > 0
      ? Object.values(usersTyping).map(user => (
        <EnhancedUserTyping
          key={user._id}
          {...user} />
      ))
      : null
    }
  </List>
);

EnhancedMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(state => ({
  messages: state.chat.messages,
  usersTyping: state.user.usersTyping,
  channel: state.user.currentChannel,
}), {})(EnhancedMessageList);
