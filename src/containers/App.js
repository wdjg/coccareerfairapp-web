import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';

import TopBar from '../components/TopBar'

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

import 'antd/lib/style/index.css';
import 'antd/lib/menu/style/index.css';
import './App.css';
import * as Auth from './auth.js';
import SmoothCollapse from 'react-smooth-collapse';

import { connect } from 'react-redux'
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';
import { Menu } from 'antd';
import '../resources/style.css';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

class App extends React.Component {

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
		this.scroll_content.addEventListener('scroll', this.handleScroll.bind(this));
		if (!window.location.href.includes('https')) {
			
		}
		if (!this.props.user.user_type)
			this.props.sessionLogin();
	}

	componentWillReceiveProps(next) {
		this.setState({ menu_current: next.location.pathname });
	}

	renderBottomNavButtons(buttons) {
		return buttons.map((button, index) =>(
			<div key={index} onClick={() => console.log(button.text)} className="bottom-nav__btn">
				<i className={button.icon}></i>
			</div>
		));
	}

	renderMenuButtons(buttons) {
		return buttons.map((button, index) =>(
			<Menu.Item key={button.to} click={button.onClick} className="menu-button">
				<Link to={button.to}><i className={button.icon}></i> {button.text}</Link>
			</Menu.Item>
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

	setMenuState(val) {
		if (val === undefined)
			val = false;
		this.setState({ show_menu: val });
	}

	render() {
		let auth = this.props.user.user_type;
		const student_buttons = [
			{onClick: () => this.props.history.replace('/'), icon: "icon-home", text: "Home"},
			{onClick: () => this.props.history.replace('/search'), icon: "icon-search", text: "Search"},
			{onClick: () => this.props.history.replace('/profile'), icon: "icon-user", text: "Profile"},
			{onClick: () => this.props.setScannerVisibility(true), icon: "icon-camera-alt", text: "QR Scanner"},
			{onClick: () => this.props.history.replace('/info'), icon: "icon-info", text: "About"},
		];
		const recruiter_buttons = [
			{onClick: () => this.props.history.replace('/'), icon: "icon-home", text: "Home"},
			{onClick: () => this.props.history.replace('/search'), icon: "icon-search", text: "Search"},
			{onClick: () => this.props.history.replace('/profile'), icon: "icon-user", text: "Profile"},
			{onClick: () => this.props.history.replace('/qr'), icon: "icon-qr", text: "QR Code"},
			{onClick: () => this.props.history.replace('/info'), icon: "icon-info", text: "About"},
		];
		const unregistered_buttons = [
			{onClick: () => this.props.history.replace('/'), icon: "icon-search", text: "Search", to: '/'},
			{onClick: () => this.props.history.replace('/info'), icon: "icon-info", text: "About", to: '/info'},
		];
		let top_buttons = [];
		if (auth) {
			top_buttons = [];
		} else {
			top_buttons = [
				{onClick: () => this.props.history.replace('/login'), content: "Login"},
			];
		}
		return (
			<div className="App">
				{this.props.browser.greaterThan.extraSmall && <Menu
	        onClick={this.handleMenuClick.bind(this)}
	        selectedKeys={[this.state.menu_current]}
	        mode="horizontal">
	        {this.renderMenuButtons(auth === undefined ? unregistered_buttons : (auth === "recruiter" ? recruiter_buttons : student_buttons))}
	      </Menu>}
				{this.props.browser.is.extraSmall && <SmoothCollapse
					expanded={this.state.show_navs}
					heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
					className="top-bar-hider">
					<TopBar buttons={top_buttons} onBurgerClick={() => this.setMenuState(true)} />
				</SmoothCollapse>}
				<div className="main">
					{this.props.browser.greaterThan.extraSmall && <div className="sidebar"></div>}
					<div className="content-container" ref={ref => {this.scroll_content = ref}}>
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
					</div>
				</div>
				
				
				{(this.props.user.user_type && this.props.browser.is.extraSmall) &&
					<SmoothCollapse
						expanded={this.state.show_navs}
						heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
						className="bottom-bar-hider">
						<nav className="bottom-nav">
							{this.renderBottomNavButtons(auth === "recruiter" ? recruiter_buttons : student_buttons)}
				  	</nav>
		  		</SmoothCollapse>}			
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
				<div 
					className={classNames("shade", {show: this.state.show_menu})}
					onClick={() => this.setMenuState(false)}></div>
				<div className={classNames("menu", {show: this.state.show_menu})}>
					
				</div>
		  </div>
	  )
	}
}

const mapStateToProps = state => ({
	user: state.user,
	scannerVisible: state.scanner.visible,
	browser: state.browser,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ sessionLogin, userLogout, setScannerVisibility }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));