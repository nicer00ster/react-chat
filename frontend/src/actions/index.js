import * as types from '../constants';

// Global Actions
export function screenResize(width) {
  return {
    type: types.SCREEN_RESIZE,
    width,
  };
}

export function handleInput(input, el) {
  return {
    type: types.INPUT,
    input,
    el,
  };
}

// Auth Actions
export function login(e, username, password) {
  e.preventDefault();
  return {
    type: types.LOGIN,
    username,
    password,
  }
}

export function register(e, username, password) {
  e.preventDefault();
  return {
    type: types.REGISTER,
    username,
    password,
  }
}

export function logout(user) {
  return {
    type: types.LOGOUT,
    user,
  };
}

// Chat Actions

export function focusedUser(user) {
  return {
    type: types.FOCUSED_USER,
    user,
  };
}

export function verifyToken() {
  return {
    type: types.VERIFIED,
  };
}

export function fetchUsers() {
  return {
    type: types.FETCH_USERS,
  };
}

export function fetchChannels() {
  return {
    type: types.FETCH_CHANNELS,
  };
}

export function fetchMessages() {
  return {
    type: types.FETCH_MESSAGES,
  };
}
// Chat Actions
let nextMessageId = 0;
let nextUserId = 0;

export function addMessage(message, channel, sender) {
  return [{
    type: types.ADD_MESSAGE,
    _id: nextMessageId++,
    message,
    channel,
    sender,
  }, {
    type: types.SEND_MESSAGE,
    _id: nextMessageId++,
    message,
    channel,
    sender,
  }];
}

export function messageReceived(message, channel, sender) {
  return {
    type: types.MESSAGE_RECEIVED,
    _id: nextMessageId++,
    message,
    channel,
    sender,
  };
}

export function addUser(name) {
  return {
    type: types.ADD_USER,
    id: nextUserId++,
    name,
  };
}

export function populateUsersList(users) {
  return {
    type: types.ACTIVE_USERS,
    users,
  };
}

export function addTypingUser(uid) {
   return {
     type: types.ADD_TYPING_USER,
     payload: uid,
   };
 }

 export function removeTypingUser(uid) {
   return {
     type: types.REMOVE_TYPING_USER,
     payload: uid,
   };
 }

 export function changeChannel(channel) {
   return {
     type: types.CHANGE_CHANNEL,
     channel,
   };
 }
