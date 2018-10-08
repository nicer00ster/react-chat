import * as types from '../constants';
const io = require('socket.io-client');
import { messageReceived, populateUsersList, addUser, addTypingUser, removeTypingUser, changeChannel } from '../actions';

const setupSocket = (dispatch, socket) => {

  socket.on('user', data => {
    console.log('hererererrrere, da', data);
    switch(data.type) {
      case types.ADD_USER:
        console.log('hahahahahahaha', data.user);
        dispatch(addUser(data.user));
        break;
      case types.ACTIVE_USERS:
        console.log('heehehehehehehehehehehehe', data);
        dispatch(populateUsersList(data));
        break;
      default:
        break;
    }
  });

  socket.on('message', data => {
    console.log('messagehere', data);
    switch(data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.channel, data.sender));
        break;
      default:
        break;
    }
  });

  socket.on('is typing', data => {
    console.log('sockietheretyping', data);
    dispatch(addTypingUser(data));
  });

  socket.on('stopped typing', data => {
    console.log('sockiestoppedtyping', data);
    dispatch(removeTypingUser(data));
  });

  socket.on('change channel', data => {
    console.log('sockie change channel', data);
    dispatch(changeChannel(data.channel))
  });

  return socket;
}

export default setupSocket;
