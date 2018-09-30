import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import EnhancedAppBar from './EnhancedAppBar';
import EnhancedInput from './EnhancedInput';
import EnhancedWrapper from './EnhancedWrapper';
// import { addUser } from '../../actions';
import styles from './styles';

class Chat extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <EnhancedAppBar
          logout={this.props.logout}
          chat={this.props.chat}
          focusedUser={this.props.focusedUser} />
        <EnhancedWrapper>
          <EnhancedInput username={this.props.user.username} />
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

const mapDispatchToProps = dispatch => ({
  dispatch: name => {
    dispatch(addUser(name));
  },
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
