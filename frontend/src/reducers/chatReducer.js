import * as types from '../constants';

const initialState = {
  message: '',
  sending: false,
  error: null,
  focusedUser: '',
  messages: [],
  channels: [],
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEND_MESSAGE:
      return {
        ...state,
        sending: true,
      };
    case types.SEND_MESSAGE_SUCCESS:
    // console.log('SEND_MESSAGE_SUCCESS', action);
      return {
        ...state,
        sending: false,
        message: action.message,
      };
    case types.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
      };
    case types.INPUT:
    // console.log('INPUT', action);
      return {
        ...state,
        message: action.input,
      };
    case types.FETCH_MESSAGES:
      return {
        ...state,
        fetching: true,
      };
    case types.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        fetching: false,
        messages: action.messages.data,
      };
    case types.FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        fetching: false,
        messages: {},
        error: action.error,
      };
    case types.FOCUSED_USER:
      return {
        ...state,
        focusedUser: action.user,
      };
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECEIVED:
    // console.log('ADD_MESSAGE', action);
      return {
        ...state,
        message: '',
        messages: state.messages.concat([
          {
            message: action.message,
            sender: action.sender,
            channel: action.channel,
            _id: action.id,
          },
        ]),
      };
    case types.FETCH_CHANNELS:
      return {
        ...state,
        fetching: true,
      }
    case types.FETCH_CHANNELS_SUCCESS:
    // console.log('fetch-chanels succes', action.channels.data);
      return {
        ...state,
        fetching: false,
        channels: action.channels.data,
      }
    case types.FETCH_CHANNELS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action,
      }
    default:
      return state;
  }
}
