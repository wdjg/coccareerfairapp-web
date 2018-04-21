import React from 'react';
import classNames from 'classnames';

import TopBar from '../components/TopBar'
import Button from '../components/Button'
import Modal from '../components/Modal'
import QRScannerFull from './QRScannerFull'
import Routes from './routes.js'
import { showLoading } from 'react-redux-loading-bar'

import './App.css';
import SmoothCollapse from 'react-smooth-collapse';

import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sessionLogin, userLogout } from '../redux/actions/login';
import { getBatch } from '../redux/actions/batch';
import { updateUser } from '../redux/actions/user';
import { getLine } from '../redux/actions/line';
import { setScannerVisibility } from '../redux/actions/scanner';
import { setNavButtons } from '../redux/actions/navbar';
import '../resources/icon-styles.css';

import { withRouter } from 'react-router-dom';


import logo from '../resources/jacket-logo.svg';

class App extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			show_navs: true,
			show_menu: false,
			notification_modal: false,
			line_company: {}
		};
		this.last_scroll = 0;
		this.scroll_content = null;
		this.queryInterval = null;
	}

	componentDidMount() {
		this.props.setNavButtons([
			{onClick: () => this.props.history.push('/login'), content: "Login"},
		]);
		if (!this.props.user.user_type)
			this.props.sessionLogin().then(user => {
				if (user && !this.queryInterval) {
					if (user.user_type === 'student')
						this.props.getLine(user.token);
					else if (user.user_type === 'recruiter')
						this.props.getBatch(user.token, user.employer_id);
					this.queryInterval = setInterval(() => {
						if (!this.state.notification_modal) {
							if (user.user_type === 'student')
								this.props.getLine(user.token);
							else if (user.user_type === 'recruiter')
								this.props.getBatch(user.token, user.employer_id);
						}
					}, 2000);
				}
			});
	}

	componentWillReceiveProps(next) {
		if (this.props.line !== next.line) {
			if (next.line.status === 'inline') {
				const company = next.companies.find(e => e._id === this.props.line.employer_id)
				this.setState({
					notification_modal: !next.user.dismissed_notification, 
					line_company: company ? company : {}
				});
			}
		}
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
			if (this.props.user.token && !this.queryInterval) {
				this.queryInterval = setInterval(() => {
					if (!this.state.notification_modal) {
						if (this.props.user.user_type === 'student')
							this.props.getLine(this.props.user.token);
						else if (this.props.user.user_type === 'recruiter')
							this.props.getBatch(this.props.user.token, this.props.user.employer_id);
					}
				}, 2000);
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
				className={classNames("nav__menu-item", {active: this.props.location.pathname === button.to})}
				key={index}
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

	notificationClose() {
		this.props.updateUser({ dismissed_notification: true })
		this.setState({ notification_modal: false })
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
			{onClick: () => this.props.history.push('/'), icon: "icon-home", text: "Home", to: '/'},
			{onClick: () => this.props.history.push('/search'), icon: "icon-search", text: "Search", to: '/search'},
			// {onClick: () => this.props.history.push('/profile'), icon: "icon-user", text: "Profile", to: '/profile'},
			{onClick: () => this.props.setScannerVisibility(true), icon: "icon-camera-alt", text: "QR Scanner", to: '/qr'},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About", to: '/info'},
		];
		const recruiter_buttons = [
			{onClick: () => this.props.history.push('/'), icon: "icon-home", text: "Home", to: '/'},
			{onClick: () => this.props.history.push('/search'), icon: "icon-search", text: "Search", to: '/search'},
			// {onClick: () => this.props.history.push('/profile'), icon: "icon-user", text: "Profile", to: '/profile'},
			{onClick: () => this.props.history.push('/qr'), icon: "icon-qr", text: "QR Code", to: '/qr'},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About", to: '/info'},
		];
		const unregistered_buttons = [
			{onClick: () => this.props.history.push('/'), icon: "icon-search", text: "Search", to: '/'},
			{onClick: () => this.props.history.push('/info'), icon: "icon-info", text: "About", to: '/info'},
		];
		// <img src={logo} alt=""/>
		return (
			<div className="App">
				<Modal 
					shade
					show={this.state.notification_modal}
					closeModal={()=>this.notificationClose()}
					className="line-notification">
					<div className="modal-content">
						<h1>You're up!</h1>
						<p>{this.state.line_company.name} is ready for you, head over to the line labelled <b>virtual line</b></p>
						<Button onClick={()=>this.notificationClose()}>Close</Button>
					</div>
				</Modal>
				{this.props.browser.greaterThan.extraSmall ? (
						<div className="desktop">
							<nav className="side-nav">
								<div className="logo"><img src={logo} alt="Jacket" onClick={() => this.props.history.push('/')}/></div>
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
						</div>
					) : (
						<div className="mobile">
							<SmoothCollapse
								expanded={this.state.show_navs}
								heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
								className="top-bar-hider">
								<TopBar buttons={this.props.navbar.buttons} onBurgerClick={() => this.setMenuState(true)} />
							</SmoothCollapse>
							{this.props.navbar.content && <div className="topbar__content">{this.props.navbar.content}</div>}
							<div className="content__container" ref={ref => {this.scroll_content = ref}}>
								<Routes auth={this.props.user.user_type}/>
							</div>
							<SmoothCollapse
								expanded={this.state.show_navs && Boolean(auth)}
								heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
								className="bottom-bar-hider">
								<nav className="bottom-nav">
									{this.renderBottomNavButtons(auth === "recruiter" ? recruiter_buttons : student_buttons)}
								</nav>
							</SmoothCollapse>
						</div>
					) 
				}
				<QRScannerFull onExit={() => this.props.setScannerVisibility(false)} visible={this.props.scannerVisible}/>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	user: state.user,
	scannerVisible: state.scanner.visible,
	browser: state.browser,
	navbar: state.navbar,
	line: state.line,
	companies: state.companies,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ 
		sessionLogin, 
		userLogout, 
		setScannerVisibility, 
		showLoading,
		setNavButtons, 
		getLine, 
		updateUser,
		getBatch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));