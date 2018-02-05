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
 * @return {string} 
 */
const checkAuth = user => {
	return null;
	// return "recruiter";
}

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<nav>
			  </nav>
			  <ConnectedSwitch>
					{checkAuth(this.props.user) === "recruiter" && <Redirect exact path="/" to="/recruiter"/>}
					{checkAuth(this.props.user) === "student" && <Redirect exact path="/" to="/recruiter"/>}
					<Route exact path="/" component={Login} />
					<Route path="/student" component={StudentMain} />
					<Route path="/recruiter" component={RecruiterMain} />
					<Route path="/example" component={Example} />
					<Route path="/scanner" component={QRScanner} />
					<Route path="/company/notfound" component={NotFound} />
					<Route exact path="/company/:id" component={CompanyProfile} />
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
