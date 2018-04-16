import React from 'react';
import classNames from 'classnames';

import TopBar from '../components/TopBar'
import Routes from './routes.js'

import './App.css';
import SmoothCollapse from 'react-smooth-collapse';

import { connect } from 'react-redux'
import { withRouter, } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { setScannerVisibility } from '../redux/actions/scanner';
import '../resources/icon-styles.css';

import logo from '../resources/jacket-logo.svg';

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
		// this.scroll_content.addEventListener('scroll', this.handleScroll.bind(this));
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
			<li 
				className={classNames("nav__menu-item", {menu_current: })}
				key={button.to}
				onClick={button.onClick}>
				<i className={classNames("menu-item__icon", button.icon)}></i>
				<div className="menu-item__label">button.text</div>
			</li>
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
		// <img src={logo} alt=""/>
		return (
			<div className="App">
				<nav className="side-nav">
					<div className="logo"></div>
					<div className="nav__content">
						<ul className="nav__menu-items">{this.renderMenuButtons(auth === undefined ? unregistered_buttons : (auth === "recruiter" ? recruiter_buttons : student_buttons))}</ul>
					</div>
				</nav>
				<div className="content">
					<div className="content__topbar">
						<div className="topbar__content">{this.props.navbar}</div>
						<div className="topbar__buttons">
							<div className="button login"><span onClick={() => this.props.history.replace('/login')}>Login</span></div>
						</div>
					</div>
					<div className="content__container" ref={ref => {this.scroll_content = ref}}>
						<Routes auth={this.props.user.user_type}/>
					</div>
				</div>
		  </div>
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
	bindActionCreators({ sessionLogin, userLogout, setScannerVisibility }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));