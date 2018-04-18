import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { responsiveStateReducer } from 'redux-responsive'
import { loadingBarReducer } from 'react-redux-loading-bar'

import user from './user';
import batch from './batch';
import companies from './companies';
import scanner from './scanner';
import line from './line';
import searchfilter from './searchfilter';
import navbar from './navbar';

const rootReducer = combineReducers({
  user, batch, companies, scanner, line, searchfilter, navbar,
  router: routerReducer,
  browser: responsiveStateReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
