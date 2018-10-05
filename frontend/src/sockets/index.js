import * as types from '../constants';
const io = require('socket.io-client');
import { messageReceived, populateUsersList, addUser, addTypingUser } from '../actions';

const setupSocket = (dispatch, socket) => {

  socket.on('user', data => {
    console.log('hererererrrere, da', data);
    switch(data.type) {
      case types.ADD_USER:
        console.log('hahahahahahaha', data.user);
        // dispatch(addUser(data));
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
        dispatch(messageReceived(data.message, data.sender));
        break;
      default:
        break;
    }
  });

  socket.on('typing', data => {
    console.log('sockietheretyping', data);
    switch(data.type) {
      case types.ADD_TYPING_USER:
        dispatch(addTypingUser(data.payload));
        break;
      case types.REMOVE_TYPING_USER:
        dispatch(removeTypingUser(data.payload));
        break;
      default:
        break;
    }
  })

  return socket;
}

export default setupSocket;
