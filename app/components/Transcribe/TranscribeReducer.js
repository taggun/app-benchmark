import {
  FILE_REQUEST,
  FILE_RESPONSE,
  FILE_ERROR
} from './TranscribeActions';

const initialState = {
  apikey: undefined,
  file: undefined,
  md5: undefined,
  contentType: undefined
};

export default function transcribe(state = initialState, action) {
  switch (action.type) {
    case FILE_REQUEST:
      return Object.assign({}, state, {
        apikey: action.apikey,
        md5: action.md5,
        contentType: action.contentType,
        error: undefined
      });
    case FILE_RESPONSE:
      return Object.assign({}, state, {
        file: action.file,
        error: undefined
      });
    case FILE_ERROR:
      return Object.assign({}, state, {
        error: action.error.message,
        file: undefined,
        md5: undefined,
        contentType: undefined
      });
    default:
      return state;
  }
}
