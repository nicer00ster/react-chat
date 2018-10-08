import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import EnhancedAppBar from './EnhancedAppBar';
import EnhancedInput from './EnhancedInput';
import EnhancedWrapper from './EnhancedWrapper';
import styles from './styles';

class Chat extends React.Component {
  componentDidMount() {
    this.props.addUser(this.props.user.username);
    this.props.fetchUsers();
    this.props.fetchChannels();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <EnhancedAppBar
          logout={this.props.logout}
          chat={this.props.chat}
          user={this.props.user}
          activeUsers={this.props.user.activeUsers}
          changeChannel={this.props.changeChannel}
          focusedUser={this.props.focusedUser} />
        <EnhancedWrapper>
          <EnhancedInput
            uid={this.props.user.id}
            channel={this.props.user.currentChannel}
            username={this.props.user.username} />
        </EnhancedWrapper>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
  handleInput: PropTypes.func,
  sendMessage: PropTypes.func,
  focusedUser: PropTypes.func,
  fetchMessages: PropTypes.func,
  connectSocket: PropTypes.func,
  disconnectSocket: PropTypes.func,
  classes: PropTypes.object,
  chat: PropTypes.shape({
    message: PropTypes.string,
    focusedUser: PropTypes.string,
  }),
};


export default withStyles(styles)(Chat);
