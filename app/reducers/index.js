import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import home from '../components/Home/HomeReducer';
import userForm from '../components/Transcribe/UserFormReducer';
import counter from '../components/Counter/CounterReducer';

const rootReducer = combineReducers({
  home,
  userForm,
  counter,
  router,
});

export default rootReducer;
