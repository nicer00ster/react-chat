import * as types from '../constants';
const io = require('socket.io-client');
import { messageReceived, populateUsersList, addUser } from '../actions';

const setupSocket = (dispatch, socket) => {

  socket.on('connect', data => {
    console.log('hererererrrere, da', data);
    switch(data.type) {
      case types.ACTIVE_USERS:
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
      // case types.ADD_USER:
      //   dispatch(addUser(data.name));
      //   break;
      default:
        break;
    }
  });
  // socket.onopen = () => {
  //   socket.send(JSON.stringify({
  //     type: types.ADD_USER,
  //     name: username,
  //     uid,
  //   }))
  // }
  //
  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log('onmessage', data);
  //   switch (data.type) {
  //     case types.ADD_MESSAGE:
  //       dispatch(messageReceived(data.message, data.sender))
  //       break;
  //     case types.ACTIVE_USERS:
  //       dispatch(populateUsersList(data.users))
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return socket;
}

export default setupSocket;
