import * as types from '../constants'
import { messageReceived, populateUsersList } from '../actions'

const setupSocket = (dispatch, username, uid) => {
  const socket = new WebSocket('ws://10.0.40.58:8989');

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username,
      uid,
    }))
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('onmessage', data);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.sender))
        break;
      case types.ACTIVE_USERS:
        dispatch(populateUsersList(data.users))
        break;
      default:
        break;
    }
  }

  return socket
}

export default setupSocket
