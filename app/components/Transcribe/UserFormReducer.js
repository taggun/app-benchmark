import {
  SCAN_REQUEST,
  SCAN_RESPONSE,
  SCAN_ERROR
} from './UserFormActions';

const initialState = {
  apikey: undefined,
  url: undefined,
  target: undefined,
  result: undefined
};

export default function userForm(state = initialState, action) {
  switch (action.type) {
    case SCAN_REQUEST:
      return Object.assign({}, state, {
        apikey: action.apikey,
        url: action.url,
        target: action.target,
        result: undefined,
        error: undefined
      });
    case SCAN_RESPONSE:
      return Object.assign({}, state, {
        result: action.result,
        error: undefined
      });
    case SCAN_ERROR:
      return Object.assign({}, state, {
        error: action.error.message,
        result: undefined,
        apikey: undefined,
        url: undefined,
        target: undefined,
      });
    default:
      return state;
  }
}
