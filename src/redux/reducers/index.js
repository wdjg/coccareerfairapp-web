import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import batch from './batch';
import companies from './companies';
import line from './line';

const rootReducer = combineReducers({
  user, batch, companies, line,
  router: routerReducer,
});

export default rootReducer;
