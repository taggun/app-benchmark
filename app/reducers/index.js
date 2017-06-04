import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import home from '../components/Home/HomeReducer';
import counter from '../components/Counter/CounterReducer';

const rootReducer = combineReducers({
  home,
  counter,
  router,
});

export default rootReducer;
