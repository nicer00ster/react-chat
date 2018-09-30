import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import EnhancedMessage from './EnhancedMessage';

const EnhancedMessageList = ({ messages }) => (
  <List>
    {Object.values(messages).map(message => (
      <EnhancedMessage
        key={message.id}
        {...message} />
    ))}
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
}), {})(EnhancedMessageList);
