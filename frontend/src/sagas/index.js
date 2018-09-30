import {
  takeEvery,
  put,
  call,
  take,
  all,
  fork,
} from 'redux-saga/effects';
import axios from 'axios';
import { verifyToken, setToken } from '../utils/storage';
import * as types from '../constants';
import { delay } from 'redux-saga';


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
  console.log(data);
  try {
    const response = yield call(apiLogin, data);
    const result = response.data;
    if(result.success) {
      setToken('app', { token: result.token });
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
    console.log(response);
    if(response.data.success) {
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
      setToken('app', { token: result.token });
      yield put({ type: types.REGISTER_SUCCESS, result });
    } else yield put({ type: types.REGISTER_FAILURE, error: result.message });
  } catch (error) {
    yield put({ type: types.REGISTER_FAILURE, error });
  }
}

function* verifyTokenSaga() {
  try {
    const response = yield call(apiVerify);
    console.log('verifyTokenSaga', response);
    if (response.data.success) {
      yield put({ type: types.VERIFIED_SUCCESS, data: response.data });
    } else yield put({ type: types.VERIFIED_FAILURE, data: response.data });
  } catch (error) {
    yield put({ type: types.VERIFIED_FAILURE, error })
  }
}

function* fetchUsersSaga() {
  try {
    const response = yield call(apiFetchUsers);
    console.log(response);
    yield put({ type: types.FETCH_USERS_SUCCESS, users: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_USERS_FAILURE, error });
  }
}

function* rootSaga(params) {
  console.log('params', params);
  yield all([
    takeEvery(types.REGISTER, registerSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
    takeEvery(types.VERIFIED, verifyTokenSaga),
    takeEvery(types.FETCH_USERS, fetchUsersSaga),
    takeEvery(types.ADD_MESSAGE, action => {
      console.log('action', action);
      action.sender = 'username';
      params.socket.send(JSON.stringify(action));
    }),
  ]);
}

export default rootSaga;
