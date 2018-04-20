import React from 'react';
import classNames from 'classnames';

import TopBar from '../components/TopBar'
import QRScannerFull from './QRScannerFull'
import Routes from './routes.js'
import { showLoading } from 'react-redux-loading-bar'

import 'antd/lib/style/index.css'
import './App.css';
import SmoothCollapse from 'react-smooth-collapse';

import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';
import { setNavButtons } from '../redux/actions/navbar';
import '../resources/icon-styles.css';

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

import { Route, Switch, withRouter } from 'react-router-dom';


const ConnectedSwitch = connect(state => ({
	location: state.location
}))(Switch);

// import logo from '../resources/jacket-logo.svg';

class App extends React.Component {
	checkUser() {
		if (this.props.auth === "student") {
			return Auth.userIsStudent(StudentMain);
		} else if (this.props.auth === "recruiter") {
			return Auth.userIsRecruiter(RecruiterMain);
		} else if (this.props.auth === "admin") {
			return Auth.userIsAdmin(SearchCompanies);
		}
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	show_navs: true,
	  	show_menu: false,
	  	menu_current: '/search'
	  };
	  this.last_scroll = 0;
	  this.scroll_content = null;
	}

	componentDidMount() {
		this.setState({ menu_current: this.props.location.pathname });
		this.props.setNavButtons([
			{onClick: () => this.props.history.push('/login'), content: "Login"},
		]);
		// this.scroll_content.addEventListener('scroll', this.handleScroll.bind(this));
		if (!window.location.href.includes('https')) {
			
		}
		if (!this.props.user.user_type)
			this.props.sessionLogin();
	}

	componentWillReceiveProps(next) {
		this.setState({ menu_current: next.location.pathname });
		if (this.props.user.user_type !== next.user.user_type) {
			if (!next.user.user_type) {
				this.props.setNavButtons([
					{onClick: () => this.props.history.push('/login'), content: "Login"},
				]);
			} else {
				this.props.setNavButtons([
					{onClick: () => this.props.userLogout(), content: "Logout"},
				]);
			}
		}
	}

	renderBottomNavButtons(buttons) {
		return buttons.map((button, index) =>(
			<div key={index} onClick={() => button.onClick()} className="bottom-nav__btn">
				<i className={button.icon}></i>
			</div>
		));
	}

	renderSideMenuButtons(buttons) {
		return buttons.map((button, index) =>(
			<li 
				className={classNames("nav__menu-item", {active: this.state.menu_current === button.to})}
				key={button.to}
				onClick={button.onClick}>
				<i className={classNames("menu-item__icon", button.icon)}></i>
				<span className="menu-item__label">{button.text}</span>
			</li>
		));
	}

	renderTopNavButtons(buttons) {
  	return buttons.map((button, index) => (
  		<div key={index} className="button">
  			{button.content ? <span key={index} onClick={() => button.onClick()}>{button.content}</span> :
  				<i className={button.icon}></i>}
			</div>
		));
  }

	componentWillUnmount() {
    this.scroll_content.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll(event) {
		const d_scroll = event.srcElement.scrollTop - this.last_scroll;
		if (d_scroll > 10) {
			this.last_scroll = event.srcElement.scrollTop;
	    this.setState({ show_navs: false });
		} else if (d_scroll < -5) {
			this.last_scroll = event.srcElement.scrollTop;
	    this.setState({ show_navs: true });
		}
	}

	handleMenuClick(e) {
		console.log(e)
		// e.item.onClick();
    // this.setState({
    //   menu_current: e.key,
    // });
  }

	render() {
		let auth = this.props.user.user_type;
		const student_buttons = [
			{onClick: () => this.props.history.push('/'), icon: "icon-home", text: "Home"},
			{onClick: () => this.props.history.push('/search'), icon: "icon-search", text: "Search"},
			{onClick: () => this.props.history.push('/profile'), icon: "icon-user", text: "Profile"},
			{onClick: () => this.props.setScannerVisibility(true), icon: "icon-camera-alt", text: "QR Scanner"},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About"},
		];
		const recruiter_buttons = [
			{onClick: () => this.props.history.push('/'), icon: "icon-home", text: "Home"},
			{onClick: () => this.props.history.push('/search'), icon: "icon-search", text: "Search"},
			{onClick: () => this.props.history.push('/profile'), icon: "icon-user", text: "Profile"},
			{onClick: () => this.props.history.push('/qr'), icon: "icon-qr", text: "QR Code"},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About"},
		];
		const unregistered_buttons = [
			{onClick: () => this.props.history.push('/'), icon: "icon-search", text: "Search", to: '/'},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About", to: '/info'},
		];
		// <img src={logo} alt=""/>
		return (
			this.props.browser.greaterThan.extraSmall ? (<div className="App">
				<nav className="side-nav">
					<div className="logo"></div>
					<div className="nav__content">
						<ul className="nav__menu-items">{this.renderSideMenuButtons(auth === undefined ? unregistered_buttons : (auth === "recruiter" ? recruiter_buttons : student_buttons))}</ul>
					</div>
				</nav>
				<div className="content">
					<div className="content__topbar">
						<div className="topbar__content">{this.props.navbar.content}</div>
						<div className="topbar__buttons">{this.renderTopNavButtons(this.props.navbar.buttons)}</div>
					</div>
					<div className="content__container" ref={ref => {this.scroll_content = ref}}>
						<Routes auth={this.props.user.user_type}/>
					</div>
				</div>
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
		  </div>) : 
		  (<div className="App">
				<SmoothCollapse
					expanded={this.state.show_navs}
					heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
					className="top-bar-hider">
					<TopBar buttons={this.props.navbar.buttons} onBurgerClick={() => this.setMenuState(true)} />
				</SmoothCollapse>
				<div className="content__container" ref={ref => {this.scroll_content = ref}}>
					<Routes auth={this.props.user.user_type}/>
				</div>
				<SmoothCollapse
					expanded={this.state.show_navs && auth}
					heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
					className="bottom-bar-hider">
					<nav className="bottom-nav">
						{this.renderBottomNavButtons(auth === "recruiter" ? recruiter_buttons : student_buttons)}
			  	</nav>
	  		</SmoothCollapse>
	  		<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
		  </div>)
	  )
	}
}



const mapStateToProps = state => ({
	user: state.user,
	scannerVisible: state.scanner.visible,
	browser: state.browser,
	navbar: state.navbar,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ sessionLogin, userLogout, setScannerVisibility, showLoading, setNavButtons }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));