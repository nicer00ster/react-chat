import * as types from '../constants';

const initialState = {
  username: '',
  password: '',
  id: '',
  currentChannel: 'lobby',
  authenticated: false,
  isLoading: false,
  error: false,
  users: [],
  usersTyping: [],
  offlineUsers: [],
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.INPUT: {
      return {
        ...state,
        [action.el]: action.input,
      };
    }
    case types.LOGIN:
    case types.LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case types.VERIFIED_SUCCESS:
      return {
        ...state,
        username: action.data.user,
        id: action.data.id,
        authenticated: true,
        error: false,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        error: false,
        username: action.result.username,
        password: '',
      };
    case types.LOGOUT_SUCCESS:
    case types.VERIFIED_FAILURE:
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        error: action.error,
        username: '',
        password: '',
      };
    case types.REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        error: false,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        error: action.error,
      };
    case types.FETCH_USERS:
      return {
        ...state,
        fetching: true,
      };
    case types.FETCH_USERS_SUCCESS:
      // console.log('fetch', action);
      return {
        ...state,
        fetching: false,
        offlineUsers: action.users,
      };
    case types.ACTIVE_USERS: {
      // console.log('ACTIVE_USERS', action.users);
      return {
        ...state,
        users: action.users.users,
      }
    }
    case types.ADD_USER: {
      // console.log('ADD_USER', action);
      return {
        ...state,
        users: state.users.concat([
          { name: action.name, id: action.id },
        ]),
      };
    }
    case types.REMOVE_USER: {
      return {
        ...state,
      }
    }
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case types.CHANGE_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel,
      };
    case types.ADD_TYPING_USER:
      // return state.update('usersTyping', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
      // console.log('ADD_TYPING_USER', action);
      return {
        ...state,
        usersTyping: Object.values(state.offlineUsers).filter(users => users._id === action.payload),
      };
    case types.REMOVE_TYPING_USER:
      // console.log('REMOVE_TYPING_USER', action);
      return {
        ...state,
        usersTyping: Object.values(state.usersTyping).filter(users => users._id !== action.payload),
      };
      // return state.update('usersTyping', (users) => users.filter((userID) => userID !== action.payload));
    default:
      return state;
  }
}
