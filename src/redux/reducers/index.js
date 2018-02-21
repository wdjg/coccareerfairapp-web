import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import batch from './batch';
import companies from './companies';
import scanner from './scanner';

const rootReducer = combineReducers({
  user, batch, companies, scanner,
  router: routerReducer,
});

export default rootReducer;
