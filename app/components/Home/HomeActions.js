import createHistory from 'history/createHashHistory';

const history = createHistory();

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_RESPONSE = 'LIST_RESPONSE';
export const LIST_ERROR = 'LIST_ERROR';
export const LIST_BENCHMARK_RESULT = 'LIST_BENCHMARK_RESULT';
export const LIST_SAVE_RESULT = 'LIST_SAVE_RESULT';
export const SCAN_REQUEST = 'SCAN_REQUEST';
export const SCAN_RESPONSE = 'SCAN_RESPONSE';
export const SCAN_ERROR = 'SCAN_ERROR';

const benchmarkApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3022' : 'https://api-benchmark.taggun.io';

export function benchmarkListRequest(apikey) {
  return (dispatch) => {
    dispatch({
      type: LIST_REQUEST,
      apikey
    });

    return fetch(`${benchmarkApiUrl}/api/benchmark/v1/list`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        apikey
      }
    }).then((response) => response.json())

    .then((body) => dispatch(benchmarkListResponse(body)))

    .catch((error) => dispatch(benchmarkListError(error)));
  };
}

export function benchmarkListResponse(list) {
  return (dispatch) => {
    history.push('/transcribe');
    dispatch({
      type: LIST_RESPONSE,
      list
    });
  };
}

export function benchmarkListError(error) {
  return (dispatch) => {
    dispatch({
      type: LIST_ERROR,
      error
    });
  };
}

export function startBenchmark(list, apikey, target) {
  return (dispatch) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].benchmark) {
        fetch(`${benchmarkApiUrl}/api/benchmark/v1/scan`, {
          method: 'post',
          body: JSON.stringify({
            url: `${benchmarkApiUrl}/api/benchmark/v1/file/${list[i].md5}?apikey=${apikey}`,
            target,
            ipAddress: list[i].userIpAddress || list[i].callerIpAddress
          }),
          headers: {
            'Content-Type': 'application/json',
            apikey
          }
        }).then((response) => response.json())

        .then((result) => dispatch(scanResponse(result, list[i].md5)))

        .catch((error) => dispatch(scanError(error)));
      }
    }
  };
}


export function scanResponse(result, md5) {
  return (dispatch) => {
    dispatch({
      type: LIST_BENCHMARK_RESULT,
      result,
      md5
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
