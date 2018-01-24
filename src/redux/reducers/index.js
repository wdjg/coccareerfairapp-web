import { combineReducers } from 'redux';
import counter from './counter';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  counter,
  router: routerReducer,
});

export default rootReducer;
