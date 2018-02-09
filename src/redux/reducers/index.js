import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import batch from './batch';
import companies from './companies';

const rootReducer = combineReducers({
  user, batch, companies,
  router: routerReducer,
});

export default rootReducer;
