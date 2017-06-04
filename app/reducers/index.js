import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import home from './home';
import counter from './counter';

const rootReducer = combineReducers({
  home,
  counter,
  router,
});

export default rootReducer;
