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
import MenuIcon from '../resources/burger-title.svg';
import CameraIcon from '../resources/icon-camera-alt.svg';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';

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

// const TitleRoute = ({title, setNavTitle, ...routeProps}) => {
// 	setNavTitle(title);
// 	return <Route {...routeProps} />;
// };

class App extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	title: ''
	  };
	}

	componentDidMount() {
		if (!window.location.href.includes('https')) {
			
		}
		if (!checkAuth(this.props.user))
			this.props.sessionLogin();
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
					<div className="top-nav__item right">
						<div className="logout" onClick={this.props.userLogout}>Logout</div>
						{checkAuth(this.props.user) === "student" && <img className="camera" src={CameraIcon} alt="camera" onClick={() => this.props.setScannerVisibility(true)}/>}
					</div>
			  </nav>
			  <ConnectedSwitch>
					{checkAuth(this.props.user) && <Redirect path="/login" to="/"/>}
					{checkAuth(this.props.user) === "recruiter" && <Redirect exact path="/" to="/recruiter"/>}
					{checkAuth(this.props.user) === "student" && <Redirect exact path="/" to="/student"/>}
					<Route path="/login" component={Login} />
					<AuthRoute path="/student" authTypes={["student"]} userAuth={checkAuth(this.props.user)} component={StudentMain} />
					<AuthRoute path="/recruiter" authTypes={["recruiter"]} userAuth={checkAuth(this.props.user)} component={RecruiterBatch} />
					<AuthRoute path="/qr" authTypes={["recruiter"]} userAuth={checkAuth(this.props.user)}  component={QRDisplay} />
					<Route path="/studentprofile" component={StudentProfile} />	
					<Route path="/recruiterprofile" component={RecruiterProfile} />
					<Route path="/company/notfound" component={NotFound} />
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={checkAuth(this.props.user)} />)} />
					<Route exact path="/" component={SearchCompanies} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
				<nav className="bottom-nav">
					{this.renderBottomNavButtons(buttons)}
			  </nav>
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
		  </div>
	  )
	}
}

// <Route path="/scanner" authTypes={["student"]} userAuth={checkAuth(this.props.user)} component={QRScanner} />

const mapStateToProps = state => ({
	user: state.user,
	path: state.router.location.pathname,
	scannerVisible: state.scanner.visible,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ sessionLogin, userLogout, setScannerVisibility }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));