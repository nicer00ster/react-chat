import React from 'react';
import { connect } from 'react-redux';
import Navigation from './components/router/Router';

import {
  screenResize,
  handleInput,
  register,
  login,
  logout,
  addMessage,
  verifyToken,
  fetchUsers,
  focusedUser,
  populateUsersList,
  addUser,
  addTypingUser,
  removeTypingUser,
  fetchChannels,
  changeChannel,
} from './actions';

class Root extends React.Component {
  componentDidMount() {
    this.props.verifyToken();
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }
  updateDimensions() {
    this.props.screenResize(window.innerWidth);
  }
  render() {
    return <Navigation {...this.props} />
  }
}

const mapStateToProps = ({ app, user, chat }) => ({
  app,
  user,
  chat,
});

const mapDispatchToProps = {
  screenResize,
  handleInput,
  login,
  logout,
  register,
  addMessage,
  verifyToken,
  fetchUsers,
  focusedUser,
  populateUsersList,
  addUser,
  addTypingUser,
  removeTypingUser,
  fetchChannels,
  changeChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
