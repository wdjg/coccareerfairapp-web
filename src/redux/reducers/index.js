import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import user from './user';
import batch from './batch';

const rootReducer = combineReducers({
  user, batch,
  router: routerReducer,
});

export default rootReducer;
