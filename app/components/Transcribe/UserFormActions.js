export const SCAN_REQUEST = 'SCAN_REQUEST';
export const SCAN_RESPONSE = 'SCAN_RESPONSE';
export const SCAN_ERROR = 'SCAN_ERROR';

const benchmarkApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3022' : 'https://api-benchmark.taggun.io';

export function scanRequest(apikey, url, target) {

  return (dispatch) => {
    dispatch({
      type: SCAN_REQUEST,
      apikey
    });

    return fetch(`${benchmarkApiUrl}/api/benchmark/v1/scan`, {
      method: 'post',
      body: JSON.stringify({
        url,
        target
      }),
      headers: {
        'Content-Type': 'application/json',
        apikey
      }
    }).then((response) => response.json())

      .then((result) => dispatch(scanResponse(result)))

      .catch((error) => dispatch(scanError(error)));
  };
}

export function scanResponse(result) {
  return (dispatch) => {
    dispatch({
      type: SCAN_RESPONSE,
      result
    });
  };
}
export function scanError(error) {
  return (dispatch) => {
    dispatch({
      type: SCAN_ERROR,
      error
    });
  };
}
