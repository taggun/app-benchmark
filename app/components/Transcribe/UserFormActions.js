export const SCAN_REQUEST = 'SCAN_REQUEST';
export const SCAN_RESPONSE = 'SCAN_RESPONSE';
export const SCAN_ERROR = 'SCAN_ERROR';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const SAVE_RESPONSE = 'SAVE_RESPONSE';
export const SAVE_ERROR = 'SAVE_ERROR';

const benchmarkApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3022' : 'https://api-benchmark.taggun.io';

export function scanRequest(apikey, url, target, ipAddress) {
  return (dispatch) => {
    dispatch({
      type: SCAN_REQUEST,
      apikey
    });

    return fetch(`${benchmarkApiUrl}/api/benchmark/v1/scan`, {
      method: 'post',
      body: JSON.stringify({
        url,
        target,
        ipAddress
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

export function saveRequest(apikey, id, benchmark) {
  return (dispatch) => {
    dispatch({
      type: SAVE_REQUEST,
      id,
      benchmark,
      apikey
    });

    const payload = Object.assign({ id }, benchmark);

    return fetch(`${benchmarkApiUrl}/api/benchmark/v1/save`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        apikey
      }
    }).then((response) => response.json())

      .then((result) => dispatch(saveResponse(result)))

      .catch((error) => dispatch(saveError(error)));
  };
}

export function saveResponse(result) {
  if (result.error) {
    return (dispatch) => {
      dispatch({
        type: SAVE_ERROR,
        errorMessage: result.message
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: SAVE_RESPONSE,
      result
    });
  };
}
export function saveError(error) {
  return (dispatch) => {
    dispatch({
      type: SAVE_ERROR,
      error
    });
  };
}
