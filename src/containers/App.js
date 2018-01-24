import React from 'react';
import Login from './Login';
import StudentMain from './StudentMain';

import './App.css';

import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

const App = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Login} />
    <Route path="/main" component={StudentMain} />
  </ConnectedSwitch>
);

export default withRouter(App);
