import React from 'react';
import configureStore from '../redux/store/configureStore';
import createHistory from 'history/createBrowserHistory'

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { calculateResponsiveState } from 'redux-responsive'

import App from '../containers/App';

const history = createHistory();
const store = configureStore(window.__PRELOADED_STATE__, history);

hydrate(
  <Provider store={store}>
  	<ConnectedRouter history={history}>
    	<App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

store.dispatch(calculateResponsiveState(window))

if (module.hot) {
  module.hot.accept();
}
