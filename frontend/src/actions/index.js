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
export function sendMessage(message, to, user) {
  return {
    type: types.SEND_MESSAGE,
    message,
    to,
    user,
  };
}

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

// Chat Actions
let nextMessageId = 0;
let nextUserId = 0;

export function addMessage(message, sender) {
  console.log(message, sender);
  return {
    type: types.ADD_MESSAGE,
    id: nextMessageId++,
    message,
    sender,
  };
}

export function addUser(name) {
  console.log('addUser', name);
  return {
    type: types.ADD_USER,
    id: nextUserId++,
    name,
  };
}

export function messageReceived(message, sender) {
  return {
    type: types.MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    sender,
  };
}

export function populateUsersList(users) {
  return {
    type: types.ACTIVE_USERS,
    users,
  };
}
