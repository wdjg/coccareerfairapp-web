import React from 'react';

import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import StudentProfile from './StudentProfile';
import CompanyProfile from './CompanyProfile';
// import RecruiterMain from './RecruiterMain';
import RecruiterBatch from './RecruiterBatch';
import QRDisplay from './QRDisplay';
import RecruiterProfile from './RecruiterProfile';
import Interview from './Interview';
import SearchCompanies from './SearchCompanies';
import MapScreen from './MapScreen';
import Info from './Info';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

const ConnectedSwitch = connect(state => ({
	location: state.location
}))(Switch);

class Routes extends React.Component {
	render() {
		return (
			<ConnectedSwitch>
				<Route path="/login" component={Login} />
				{!this.props.auth && <Route exact path="/" component={SearchCompanies}/>}
				<Route exact path="/" component={this.props.auth === "recruiter" ? RecruiterBatch : this.props.auth === "admin" ? SearchCompanies : StudentMain} />	
				<Route path="/batch" component={RecruiterBatch} />
				<Route path="/qr" component={QRDisplay} />
				<Route path="/interview" component={Interview} />	
				<Route path="/profile" component={this.props.auth === "recruiter" ? RecruiterProfile : StudentProfile} />	
				<Route path="/company/:id/notfound" component={NotFound} />
				<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={this.props.auth} />)} />
				<Route path="/search" component={SearchCompanies} />
				<Route path="/map" component={MapScreen} />
				<Route path="/info" component={Info} />
				<Route path="*" component={NotFound} />
			</ConnectedSwitch>
		)
	}
}

export default Routes;
