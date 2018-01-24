import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

const configureStore = (preloadedState, history) => {
  const middleware = [thunk, routerMiddleware(history), logger];
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
