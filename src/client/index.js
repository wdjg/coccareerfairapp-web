import React from 'react';
import configureStore from '../redux/store/configureStore';
import createHistory from 'history/createBrowserHistory'

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from '../containers/App';

const history = createHistory();
const store = configureStore(window.__PRELOADED_STATE__, history);

// console.log(store, history)
hydrate(
  <Provider store={store}>
  	<ConnectedRouter history={history}>
    	<App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
