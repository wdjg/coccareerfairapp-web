import React from 'react';
// import PropTypes from 'prop-types';

import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import RecruiterMain from './RecruiterMain';
import QRScanner from './QRScanner';
import CompanyProfile from './CompanyProfile';
import StudentProfile from './StudentProfile';
import QRMain from './QRMain';
import RecruiterProfile from './RecruiterProfile';

import './App.css';
import MenuIcon from '../resources/burger-title.svg';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin } from '../redux/actions/login';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

/**
 * @return {string} the authorization type of this user
 */
const checkAuth = user => {
	return user.user_type;
}

const AuthRoute = ({component: Component, authTypes, userAuth, ...routeProps }) => (
	<Route {...routeProps} render={props => (
    (userAuth && authTypes.includes(userAuth))
      ? <Component {...props} auth={userAuth} />
      : <Redirect to='/login' />
  )} />
);

const TitleRoute = ({title, setNavTitle, ...routeProps}) => {
	setNavTitle(title);
	return <Route {...routeProps} />;
};

class App extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	title: ''
	  };
	}

	renderBottomNavButtons(buttons) {
		return buttons.map((button, index) =>(
			<Link to={button.link}><img src={button.icon} alt={button.link}/></Link>
		));
	}

	render() {
		let buttons = [];
		if (checkAuth(this.props.user) === "recruiter") {

		} else if (checkAuth(this.props.user) === "student") {

		} else {

		}
		return (
			<div className="App">
				<nav className="top-nav">
					<div className="top-nav__item"><img className="burger" src={MenuIcon} alt="menu"/></div>
					<div className="top-nav__item title"></div>
					<div className="top-nav__item"></div>
			  </nav>
			  <ConnectedSwitch>
					{checkAuth(this.props.user) && <Redirect path="/login" to="/"/>}
					{checkAuth(this.props.user) === "recruiter" && <Redirect exact path="/" to="/recruiter"/>}
					{checkAuth(this.props.user) === "student" && <Redirect exact path="/" to="/student"/>}
					<Route path="/login" component={Login} />
					<AuthRoute path="/student" authTypes={["student"]} userAuth={checkAuth(this.props.user)} component={StudentMain} />
					<AuthRoute path="/scanner" authTypes={["student"]} userAuth={checkAuth(this.props.user)} component={QRScanner} />
					<AuthRoute path="/recruiter" authTypes={["recruiter"]} userAuth={checkAuth(this.props.user)} component={RecruiterMain} />
					<AuthRoute path="/qr" authTypes={["recruiter"]} userAuth={checkAuth(this.props.user)}  component={QRMain} />
					<Route path="/studentprofile" component={StudentProfile} />	
					<Route path="/recruiterprofile" component={RecruiterProfile} />
					<Route path="/company/notfound" component={NotFound} />
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={checkAuth(this.props.user)} />)} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
				<nav className="bottom-nav">
					{this.renderBottomNavButtons(buttons)}
			  </nav>
		  </div>
	  )
	}
}

const mapStateToProps = state => ({
	user: state.user,
	path: state.router.location.pathname,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ sessionLogin }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));