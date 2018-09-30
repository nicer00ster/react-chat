import {
  ADD_MESSAGE,
  MESSAGE_RECEIVED,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  INPUT,
  FOCUSED_USER,
} from '../constants';

const initialState = {
  message: '',
  sending: false,
  error: null,
  focusedUser: '',
  messages: [],
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_MESSAGE:
    console.log(action);
      return {
        ...state,
        sending: true,
      };
    case SEND_MESSAGE_SUCCESS:
    console.log('SEND_MESSAGE_SUCCESS', action);
      return {
        ...state,
        sending: false,
        message: action.message,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
      };
    // case FETCH_MESSAGES:
    //   return {
    //     ...state,
    //     fetching: true,
    //   };
    // case FETCH_MESSAGES_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: false,
    //     messages: action.messages,
    //   };
    // case FETCH_MESSAGES_FAILURE:
    //   return {
    //     ...state,
    //     fetching: false,
    //     messages: {},
    //     error: action.error,
    //   };
    case FOCUSED_USER:
      return {
        ...state,
        focusedUser: action.user,
      };
    case ADD_MESSAGE:
    case MESSAGE_RECEIVED:
    console.log('ADD_MESSAGE', action);
      return {
        ...state,
        messages: state.messages.concat([
          {
            message: action.message,
            sender: action.sender,
            id: action.id,
          },
        ]),
      };
    default:
      return state;
  }
}
