import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  chat: chatReducer,
});

export default rootReducer;
