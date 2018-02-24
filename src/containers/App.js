import React from 'react';
// import PropTypes from 'prop-types';

import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import StudentProfile from './StudentProfile';
import QRScannerFull from './QRScannerFull';
import CompanyProfile from './CompanyProfile';
import RecruiterBatch from './RecruiterBatch';
import QRDisplay from './QRDisplay';
import RecruiterProfile from './RecruiterProfile';
import SearchCompanies from './SearchCompanies';

import './App.css';
import * as Auth from './auth.js';
import MenuIcon from '../resources/burger-title.svg';
import CameraIcon from '../resources/icon-camera-alt.svg';

// import HomeIcon from '../resources/icon-home.svg';
import InfoIcon from '../resources/icon-info.svg';
import UserIcon from '../resources/icon-user.svg';
import SearchIcon from '../resources/icon-serach.svg';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

<<<<<<< HEAD
/**
 * @return {string} the authorization type of this user
 */
const checkAuth = user => {
	return user.user_type;
}

const AuthRoute = ({component: Component, authTypes, userAuth, ...routeProps }) => {
	console.log(userAuth)
	return (<Route {...routeProps} render={props => (
	    (userAuth && authTypes.includes(userAuth))
	      ? <Component {...props} auth={userAuth} />
	      : <Redirect to='/login' />
	  )} />
	);
}
=======
const studentButtons = [
	{path: '/', icon: SearchIcon},
	{path: '/profile', icon: UserIcon},
	{path: '/info', icon: InfoIcon},
];
>>>>>>> search-screen

const recruiterButtons = [
	{path: '/', icon: SearchIcon},
	{path: '/profile', icon: UserIcon},
	{path: '/info', icon: InfoIcon},
];

class App extends React.Component {

	constructor(props) {
	  super(props);
	}

	componentDidMount() {
		if (!window.location.href.includes('https')) {
			
		}
		if (!this.props.user.user_type)
			this.props.sessionLogin();
	}

	renderBottomNavButtons(buttons) {
		return buttons.map((button, index) =>(
			<Link key={index} to={button.path} className="bottom-nav__btn"><img src={button.icon} alt={button.path}/></Link>
		));
	}

	render() {
		return (
			<div className="App">
				<nav className="top-nav">
					<div className="top-nav__item"><img className="burger" src={MenuIcon} alt="menu"/></div>
					<div className="top-nav__item title"></div>
					<div className="top-nav__item right">
						<div className="logout" onClick={this.props.userLogout}>Logout</div>
						{this.props.user.user_type === "student" && <img className="camera" src={CameraIcon} alt="camera" onClick={() => this.props.setScannerVisibility(true)}/>}
					</div>
			  </nav>
			  <ConnectedSwitch>
					<Route path="/login" component={Auth.userIsNotAuth(Login)} />
					<Route path="/student" component={Auth.userIsStudent(StudentMain)} />
					<Route path="/recruiter" component={Auth.userIsRecruiter(RecruiterBatch)} />
					<Route path="/qr" component={Auth.userIsRecruiter(QRDisplay)} />
					<Route path="/profile" component={this.props.user_type === "recruiter" ? Auth.userIsRecruiter(RecruiterProfile) : Auth.userIsStudent(StudentProfile)} />	
					<Route path="/company/notfound" component={NotFound} />
<<<<<<< HEAD
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={checkAuth(this.props.user)} />)} />
					<Route exact path="/" component={Login} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
				<nav className="bottom-nav">
					{this.renderBottomNavButtons(buttons)}
			  </nav>
				<QRScannerFull
					token={this.props.user.token}
					onExit={() => this.props.setScannerVisibility(false)}
					visible={this.props.scannerVisible}/>
=======
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={this.props.user.user_type} />)} />
					<Route exact path="/" component={SearchCompanies} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
				{this.props.user.user_type && <nav className="bottom-nav">
					{this.renderBottomNavButtons(this.props.user_type === "recruiter" ? recruiterButtons : studentButtons)}
			  </nav>}
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
>>>>>>> search-screen
		  </div>
	  )
	}
}

const mapStateToProps = state => ({
	user: state.user,
	scannerVisible: state.scanner.visible,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ sessionLogin, userLogout, setScannerVisibility }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));