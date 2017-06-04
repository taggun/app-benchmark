export const FILE_REQUEST = 'FILE_REQUEST';
export const FILE_RESPONSE = 'FILE_RESPONSE';
export const FILE_ERROR = 'FILE_ERROR';

const benchmarkApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3022' : 'https://api-benchmark.taggun.io';

export function fileRequest(apikey, md5, contentType) {
  return (dispatch) => {
    dispatch({
      type: FILE_REQUEST,
      apikey
    });

    return fetch(`${benchmarkApiUrl}/api/account/v1/download/${md5}`, {
      method: 'get',
      headers: {
        'Content-Type': contentType,
        apikey
      }
    })

      .then((body) => dispatch(fileResponse(body)))

      .catch((error) => dispatch(fileError(error)));
  };
}

export function fileResponse(body) {
  debugger
  return (dispatch) => {
    dispatch({
      type: FILE_RESPONSE,
      body
    });
  };
}
export function fileError(error) {
  debugger
  return (dispatch) => {
    dispatch({
      type: FILE_ERROR,
      error
    });
  };
}
