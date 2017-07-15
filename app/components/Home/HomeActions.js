import createHistory from 'history/createHashHistory';

const history = createHistory();

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_RESPONSE = 'LIST_RESPONSE';
export const LIST_ERROR = 'LIST_ERROR';
export const LIST_BENCHMARK_RESULT = 'LIST_BENCHMARK_RESULT';
export const LIST_SAVE_RESULT = 'LIST_SAVE_RESULT';

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
