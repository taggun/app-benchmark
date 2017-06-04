import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_ERROR
} from '../actions/home';

const initialState = {
  apikey: undefined,
  list: [],
  error: undefined
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case LIST_REQUEST:
      return Object.assign({}, state, {
        apikey: action.apikey,
        list: [],
        error: undefined
      });
    case LIST_RESPONSE:
      return Object.assign({}, state, {
        list: action.list,
        error: undefined
      });
    case LIST_ERROR:
      return Object.assign({}, state, {
        error: action.error.message,
        list: []
      });
    default:
      return state;
  }
}
