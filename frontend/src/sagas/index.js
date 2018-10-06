import {
  apply,
  takeEvery,
  takeLatest,
  throttle,
  put,
  call,
  take,
  all,
  fork,
} from 'redux-saga/effects';
import axios from 'axios';

import { verifyToken, setToken } from '../utils/storage';
import * as types from '../constants';
import { messageReceived } from '../actions';
import { delay, END, eventChannel } from 'redux-saga';

function apiLogin(data) {
  return axios({
    method: 'post',
    url: '/api/account/login',
    data: {
      username: data.username,
      password: data.password,
    },
  })
}

function apiLogout() {
  const obj = verifyToken('app');
  if(obj && obj.token) {
    const { token } = obj;
    return axios({
      method: 'get',
      url: `/api/account/logout?token=${token}`,
    })
    .then(data => data)
  }
}

function apiRegister(data)  {
  return axios({
    method: 'post',
    url: '/api/account/register',
    data: {
      username: data.username,
      password: data.password,
    },
  });
}

function apiVerify() {
  const obj = verifyToken('app');
  if(obj && obj.token) {
    const { token } = obj;
    return axios({
      method: 'get',
      url: `/api/account/verify?token=${token}`,
    })
    .then(data => data);
  }
}

function apiFetchUsers() {
  return axios({
    method: 'get',
    url: `/api/account/users`,
  })
  .then(users => users);
}

function* loginSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiLogin, data);
    const result = response.data;
    if(result.success) {
      setToken('app', { token: result.token, username: data.username });
      yield put({ type: types.LOGIN_SUCCESS, result });
    } else {
      yield put({ type: types.LOGIN_FAILURE, error: result.message });
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

function* logoutSaga() {
  yield delay(1000);
  try {
    const response = yield call(apiLogout);
    console.log('logoutSaga', response);
    if(response.data.success) {
      setToken('app', { token: null, username: null })
      yield put({ type: types.LOGOUT_SUCCESS, response });
    }
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

function* registerSaga(data) {
  yield delay(2000);
  try {
    const response = yield call(apiRegister, data);
    const result = response.data;
    if(result.success) {
      setToken('app', { token: result.token, username: data.username });
      yield put({ type: types.REGISTER_SUCCESS, result });
    } else yield put({ type: types.REGISTER_FAILURE, error: result.message });
  } catch (error) {
    yield put({ type: types.REGISTER_FAILURE, error });
  }
}

let username;
function* verifyTokenSaga() {
  try {
    const response = yield call(apiVerify);
    console.log('verifyTokenSaga', response);
    if (response.data.success) {
      username = response.data.user;
      yield put({ type: types.VERIFIED_SUCCESS, data: response.data });
    } else yield put({ type: types.VERIFIED_FAILURE, data: response.data });
  } catch (error) {
    yield put({ type: types.VERIFIED_FAILURE, error })
  }
}

function* fetchUsersSaga() {
  try {
    const response = yield call(apiFetchUsers);
    console.log('fetchUsersSaga', response);
    yield put({ type: types.FETCH_USERS_SUCCESS, users: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_USERS_FAILURE, error });
  }
}

// function createSocketChannel(socket) {
//   return eventChannel(emit => {
//     console.log('saga emit', emit);
//     const typingHandler = (event) => {
//       console.log('saga event', event);
//       emit(event.payload)
//     }
//
//     // setup the subscription
//     socket.on('is typing', typingHandler)
//
//     // the subscriber must return an unsubscribe function
//     // this will be invoked when the saga calls `channel.close` method
//     const unsubscribe = () => {
//       socket.off('is typing', typingHandler)
//     }
//
//     return unsubscribe;
//   })
// }
//
// function* typing(socket) {
//   yield call(delay, 5000);
//   yield apply(socket, socket.emit, ['typing']);
// }
//
// function* watchOnTyping(socket) {
//   const socketChannel = yield call(createSocketChannel, socket)
//
//   while (true) {
//     const payload = yield take(socketChannel)
//     yield put({ type: ADD_TYPING_USER, payload })
//     yield fork(typing, socket)
//   }
// }
function* isTyping(socket) {
  while (true) {
    const { payload } = yield take(types.ADD_TYPING_USER);
    console.log('add typing payload', payload);
    socket.emit('is typing', payload);
  }
}

function* stoppedTyping(socket) {
  while (true) {
    const { payload } = yield take(types.REMOVE_TYPING_USER);
    console.log('remove typing payload', payload);
    socket.emit('stopped typing', payload);
  }
}

function* rootSaga(params) {
  console.log('socket', params);
  yield fork(isTyping, params.socket);
  yield fork(stoppedTyping, params.socket);
  yield all([
    takeEvery(types.REGISTER, registerSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
    takeEvery(types.VERIFIED, verifyTokenSaga),
    takeEvery(types.FETCH_USERS, fetchUsersSaga),
    takeEvery(types.ADD_USER, data => {
      console.log('saga', data);
      params.socket.emit('user', data);
    }),
    takeEvery(types.ACTIVE_USERS, data => {
      console.log('active users saga', data);
      params.socket.emit('user', data);
    }),
    takeEvery(types.ADD_MESSAGE, data => {
      params.socket.emit('message', data);
    }),
    // takeEvery(types.ADD_TYPING_USER, data => {
    //   console.log('sagatyping', data);
    //   if(data.payload) {
    //     params.socket.emit('typing', data)
    //   }
    // }),
    // takeEvery(types.REMOVE_TYPING_USER, data => {
    //   console.log('saga remove typing', data);
    //   if(data.payload) {
    //     params.socket.emit('typing', data)
    //   }
    // }),
    // throttle(500, types.ADD_TYPING_USER, data => {
    //   console.log('sagatyping', data);
    //   params.socket.emit('is typing', data)
    // }),
    // throttle(500, types.REMOVE_TYPING_USER, data => {
    //   console.log('saga remove typing', data);
    //   params.socket.emit('is typing', data)
    // }),
  ]);
}

export default rootSaga;
