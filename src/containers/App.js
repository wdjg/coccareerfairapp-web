import React from 'react';
import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import RecruiterMain from './RecruiterMain';
import Example from './Example';
import QRScanner from './QRScanner';
import CompanyProfile from './CompanyProfile';

import './App.css';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

/**
 * @return {string} the authorization type of this user
 */
const checkAuth = user => {
	// console.log(user);
	return user.user_type;
}

const AuthRoute = ({component: Component, authType: required, userAuth: auth, ...routeProps }) => (
	<Route {...routeProps} render={props => (
    (auth && required.includes(auth))
      ? <Component {...props} auth={auth} />
      : <Redirect to='/login' />
  )} />
);

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<nav>
			  </nav>
			  <ConnectedSwitch>
					{checkAuth(this.props.user) && <Redirect path="/login" to="/"/>}
					{checkAuth(this.props.user) === "recruiter" && <Redirect exact path="/" to="/recruiter"/>}
					{checkAuth(this.props.user) === "student" && <Redirect exact path="/" to="/student"/>}
					<Route path="/login" component={Login} />
					<AuthRoute path="/student" authType={["student"]} userAuth={checkAuth(this.props.user)} component={StudentMain} />
					<AuthRoute path="/scanner" authType={["student"]} userAuth={checkAuth(this.props.user)} component={QRScanner} />
					<AuthRoute path="/recruiter" authType={["recruiter"]} userAuth={checkAuth(this.props.user)} component={RecruiterMain} />
					<Route path="/company/notfound" component={NotFound} />
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={checkAuth(this.props.user)} />)} />
					<Route path="/" component={Example} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
		  </div>
	  )
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

export default withRouter(connect(mapStateToProps)(App));
