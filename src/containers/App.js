import React from 'react';
// import PropTypes from 'prop-types';

import NotFound from './NotFound';
import Login from './Login';
import StudentMain from './StudentMain';
import StudentProfile from './StudentProfile';
import QRScannerFull from './QRScannerFull';
import CompanyProfile from './CompanyProfile';
import RecruiterMain from './RecruiterMain';
import RecruiterBatch from './RecruiterBatch';
import QRDisplay from './QRDisplay';
import RecruiterProfile from './RecruiterProfile';
import Interview from './Interview';
import SearchCompanies from './SearchCompanies';

import './App.css';
import * as Auth from './auth.js';
import MenuIcon from '../resources/burger-title.svg';
import CameraIcon from '../resources/icon-camera-alt-dark.svg';

import HomeIcon from '../resources/icon-home.svg';
import InfoIcon from '../resources/icon-info.svg';
import UserIcon from '../resources/icon-user.svg';
import SearchIcon from '../resources/icon-serach.svg';
import QRIcon from '../resources/icon-qr.svg';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

class App extends React.Component {

	componentDidMount() {
		if (!window.location.href.includes('https')) {
			
		}
		if (!this.props.user.user_type)
			this.props.sessionLogin();
	}

	renderBottomNavButtons(buttons) {
		return buttons.map((button, index) =>(
			<div key={index} onClick={button.function} className="bottom-nav__btn"><img src={button.icon} alt={button.path}/></div>
		));
	}

	render() {
		let auth = this.props.user.user_type;
		const studentButtons = [
			{function: () => this.props.history.replace('/'), icon: HomeIcon},
			{function: () => this.props.history.replace('/search'), icon: SearchIcon},
			{function: () => this.props.history.replace('/profile'), icon: UserIcon},
			{function: () => this.props.setScannerVisibility(true), icon: CameraIcon},
			{function: () => this.props.history.replace('/info'), icon: InfoIcon},
		];
		const recruiterButtons = [
			{function: () => this.props.history.replace('/'), icon: HomeIcon},
			{function: () => this.props.history.replace('/search'), icon: SearchIcon},
			{function: () => this.props.history.replace('/profile'), icon: UserIcon},
			{function: () => this.props.history.replace('/qr'), icon: QRIcon},
			{function: () => this.props.history.replace('/info'), icon: InfoIcon},
		];
		// console.log(auth)
		// {this.props.user.user_type === "student" && <img className="camera" src={CameraIcon} alt="camera" onClick={() => this.props.setScannerVisibility(true)}/>}
		return (
			<div className="App">
				<nav className="top-nav">
					<div className="top-nav__item"><img className="burger" src={MenuIcon} alt="menu"/></div>
					<div className="top-nav__item title"></div>
					<div className="top-nav__item right">
						{auth ? <div className="logout" onClick={this.props.userLogout}>Logout</div> :
							<Link className="logout" to="/login">Login</Link>}
					</div>
			  </nav>
			  <ConnectedSwitch>
					<Route path="/login" component={Auth.userIsNotAuth(Login)} />
					{!auth && <Route exact path="/" component={SearchCompanies}/>}
					<Route exact path="/" component={Auth.userIsAuth(auth === "recruiter" ? Auth.userIsRecruiter(RecruiterMain) : Auth.userIsStudent(StudentMain))} />	
					<Route path="/batch" component={Auth.userIsAuth(Auth.userIsRecruiter(RecruiterBatch))} />
					<Route path="/qr" component={Auth.userIsAuth(Auth.userIsRecruiter(QRDisplay))} />
					<Route path="/interview" component={Interview} />	
					<Route path="/profile" component={Auth.userIsAuth(auth === "recruiter" ? Auth.userIsRecruiter(RecruiterProfile) : Auth.userIsStudent(StudentProfile))} />	
					<Route path="/company/:id/notfound" component={NotFound} />
					<Route path="/company/:id" render={props => (<CompanyProfile {...props} auth={this.props.user.user_type} />)} />
					<Route path="/search" component={SearchCompanies} />
					<Route path="*" component={NotFound} />
			  </ConnectedSwitch>
				{this.props.user.user_type && <nav className="bottom-nav">
					{this.renderBottomNavButtons(auth === "recruiter" ? recruiterButtons : studentButtons)}
			  </nav>}
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
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