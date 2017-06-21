import {
  SCAN_REQUEST,
  SCAN_RESPONSE,
  SCAN_ERROR,
  SAVE_REQUEST,
  SAVE_RESPONSE,
  SAVE_ERROR
} from './UserFormActions';

const initialState = {
  apikey: undefined,
  url: undefined,
  target: undefined,
  result: undefined,
  isLoading: false
};

export default function userForm(state = initialState, action) {
  switch (action.type) {
    case SCAN_REQUEST:
      return Object.assign({}, state, {
        apikey: action.apikey,
        url: action.url,
        target: action.target,
        result: undefined,
        error: undefined,
        isLoading: true
      });
    case SCAN_RESPONSE:
      return Object.assign({}, state, {
        result: action.result,
        error: undefined,
        isLoading: false
      });
    case SCAN_ERROR:
      return Object.assign({}, state, {
        error: action.error.message,
        result: undefined,
        apikey: undefined,
        url: undefined,
        target: undefined,
        isLoading: false
      });
    case SAVE_REQUEST:
      return Object.assign({}, state, {
        error: undefined,
        isLoading: true
      });
    case SAVE_RESPONSE:
      return Object.assign({}, state, {
        error: undefined,
        isLoading: false
      });
    case SAVE_ERROR:
      return Object.assign({}, state, {
        error: action.errorMessage,
        isLoading: false
      });
    default:
      return state;
  }
}
