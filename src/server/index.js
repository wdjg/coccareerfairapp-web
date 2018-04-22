import React from 'react';
import configureStore from '../redux/store/configureStore';
import express from 'express';
import serialize from 'serialize-javascript';
// import qs from 'qs';
import createHistory from 'history/createMemoryHistory'
// import passport from 'passport';

import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter, push } from 'react-router-redux';

import App from '../containers/App';
import HttpsRedirect from 'react-https-redirect';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // Compile an initial state
    const preloadedState = {};
    const history = createHistory();

    // Create a new Redux store instance
    const store = configureStore(preloadedState, history);
    store.dispatch(push(req.url));
    // Render the component to a string
    const markup = renderToString(
      <Provider store={store}>
        <HttpsRedirect>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </HttpsRedirect>
      </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Jacket</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
          ${process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`);
  });

export default server;
