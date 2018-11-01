import * as types from '../constants';
const io = require('socket.io-client');
import { messageReceived, populateUsersList, addUser, addTypingUser, removeTypingUser, changeChannel } from '../actions';

const setupSocket = (dispatch, socket) => {

  socket.on('user', data => {
    switch(data.type) {
      case types.ADD_USER:
        dispatch(addUser(data.user));
        break;
      case types.ACTIVE_USERS:
        dispatch(populateUsersList(data));
        break;
      default:
        break;
    }
  });

  socket.on('message', data => {
    switch(data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.channel, data.sender));
        break;
      default:
        break;
    }
  });

  socket.on('is typing', data => {
    dispatch(addTypingUser(data));
  });

  socket.on('stopped typing', data => {
    dispatch(removeTypingUser(data));
  });

  socket.on('change channel', data => {
    dispatch(changeChannel(data.channel))
  });

  return socket;
}

export default setupSocket;
