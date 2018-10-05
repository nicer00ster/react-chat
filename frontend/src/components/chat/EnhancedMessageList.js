import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import EnhancedMessage from './EnhancedMessage';
import EnhancedUserTyping from './EnhancedUserTyping';

const EnhancedMessageList = ({ messages, usersTyping }) => (
  <List>
    {Object.values(messages).map(message => (
      <EnhancedMessage
        key={message.id}
        {...message} />
    ))}
    {usersTyping.length > 0
      ? Object.values(usersTyping).map(user => (
        <EnhancedUserTyping
          key={user._id}
          {...user}
        />
      ))
      : null
    }
  </List>
);

EnhancedMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(state => ({
  messages: state.chat.messages,
  usersTyping: state.user.usersTyping,
}), {})(EnhancedMessageList);
