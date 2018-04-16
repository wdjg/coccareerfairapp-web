import React from 'react';

import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import StudentProfile from './StudentProfile';
import CompanyProfile from './CompanyProfile';
import RecruiterMain from './RecruiterMain';
import RecruiterBatch from './RecruiterBatch';
import QRDisplay from './QRDisplay';
import RecruiterProfile from './RecruiterProfile';
import Interview from './Interview';
import SearchCompanies from './SearchCompanies';
import MapScreen from './MapScreen';

import * as Auth from './auth.js';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

const ConnectedSwitch = connect(state => ({
	location: state.location
}))(Switch);

export default class Routes extends React.Component {
	checkUser() {
		if (this.props.auth === "student") {
			return Auth.userIsStudent(StudentMain);
		} else if (this.props.auth === "recruiter") {
			return Auth.userIsRecruiter(RecruiterMain);
		} else if (this.props.auth === "admin") {
			return Auth.userIsAdmin(SearchCompanies);
		}
	}

	render() {
		return (
			<ConnectedSwitch>
				<Route path="/login" component={Auth.userIsNotAuth(Login)} />
				{!this.props.auth && <Route exact path="/" component={SearchCompanies}/>}
				<Route exact path="/" component={this.checkUser()} />	
				<Route path="/batch" component={Auth.userIsAuth(Auth.userIsRecruiter(RecruiterBatch))} />
				<Route path="/qr" component={Auth.userIsAuth(Auth.userIsRecruiter(QRDisplay))} />
				<Route path="/interview" component={Interview} />	
				<Route path="/profile" component={Auth.userIsAuth(this.props.auth === "recruiter" ? Auth.userIsRecruiter(RecruiterProfile) : Auth.userIsStudent(StudentProfile))} />	
				<Route path="/company/:id/notfound" component={NotFound} />
				<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={this.props.auth} />)} />
				<Route path="/search" component={SearchCompanies} />
				<Route path="/map" component={MapScreen} />
				<Route path="*" component={NotFound} />
			</ConnectedSwitch>
		)
	}
}