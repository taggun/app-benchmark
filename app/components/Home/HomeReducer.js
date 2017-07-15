
import _ from 'lodash';
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_ERROR,
  LIST_BENCHMARK_RESULT,
  LIST_SAVE_RESULT
} from './HomeActions';

const initialState = {
  apikey: undefined,
  list: [],
  error: undefined
};

export default function home(state = initialState, action) {

  const updatedList = [];

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
    case LIST_BENCHMARK_RESULT:
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].md5 === action.md5) {
          const result = Object.assign({}, state.list[i]);
          if (result.benchmark && action.result) {
            result.benchmark.totalAmountResult =
              action.result.totalAmount.data === result.benchmark.totalAmount;
            result.benchmark.taxAmountResult =
              action.result.taxAmount.data === result.benchmark.taxAmount;
            if (result.benchmark.date) {
              result.benchmark.dateResult = !!action.result.date.data &&
                action.result.date.data.substring(0, 10) === result.benchmark.date.substring(0, 10);
            }
            if (result.benchmark.merchantName) {
              result.benchmark.merchantNameResult = !!action.result.merchantName.data &&
                action.result.merchantName.data.toUpperCase()
                  === result.benchmark.merchantName.toUpperCase();
            }
          }
          updatedList.push(result);
        } else {
          updatedList.push(state.list[i]);
        }
      }
      return Object.assign({}, state, {
        list: updatedList
      });
    case LIST_SAVE_RESULT:
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i]._id === action.id) {
          const result = Object.assign({}, state.list[i]);
          result.benchmark = action.benchmark;
          updatedList.push(result);
        } else {
          updatedList.push(state.list[i]);
        }
      }
      return Object.assign({}, state, {
        list: updatedList
      });
    default:
      return state;
  }
}
