import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { responsiveStateReducer } from 'redux-responsive'

import user from './user';
import batch from './batch';
import companies from './companies';
import scanner from './scanner';
import line from './line';

const rootReducer = combineReducers({
  user, batch, companies, scanner, line,
  router: routerReducer,
  browser: responsiveStateReducer,
});

export default rootReducer;
