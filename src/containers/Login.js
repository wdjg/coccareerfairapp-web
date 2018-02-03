import React, { Component } from 'react';
import classNames from 'classnames';
// import logo from './react.svg';
import './Login.css';
import ErrorInput from '../components/ErrorInput'
import Hider from '../components/Hider'

import { withRouter } from 'react-router-dom';

import {MdError} from 'react-icons/lib/md';

const loginTabs = [{id: 'student', label: 'Student'}, {id: 'recruiter', label: 'Recruiter'}];

const errors = {
	general: {
		requiredField: "This is a required field",
	},
	username: {
		unknown: "This user is unknown",
	},
	password: {
		incorrect: "Password is incorrect",
	},
}

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curTab: 0,
			showStudentRegister: false,
			showRecruiterRegister: false,

			studentUsername: '',
			studentPassword: '',
			studentConfirmPassword: '',
			studentErrorCodes: {
				username: null,
				password: null,
				confirmPassword: null,
			},

			recruiterUsername: '',
			recruiterPassword: '',
			recruiterConfirmPassword: '',
			recruiterPasscode: '',
			recruiterErrorCodes: {
				username: null,
				password: null,
				confirmPassword: null,
				passcode: null,
			},
		};
	}

	renderTabWindows(tabs) {
		return tabs.map((item, index) => (
			<div className={classNames(
				"windows__window",
				item.id,
				{hidden: this.state.curTab === index})}>
			</div>));
	}

	renderTabLabels(tabs) {
		return tabs.map((item, index) => 
			(<div
				key={index}
				className={classNames("labels__label", "selectable", {selected: this.state.curTab === index})}
				onClick={() => this.setState({curTab: index})}>{item.label}</div>));
	}

	onStudentLogin() {
		this.setState({studentErrorCodes: {
			username: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		if (this.state.studentUsername.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (this.state.studentPassword.length < 1)
			errorCodes.password = errors.general.requiredField;

		console.log("LOGIN: student " + (Object.keys(errorCodes).length > 0 ? "FAILURE" : "SUCCESS"));

		this.setState({studentErrorCodes: errorCodes});
	}

	onStudentRegister() {
		this.setState({studentErrorCodes: {
			username: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		if (this.state.studentUsername.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (this.state.studentPassword.length < 1)
			errorCodes.password = errors.general.requiredField;

		if (this.state.studentConfirmPassword.length < 1)
			errorCodes.confirmPassword = errors.general.requiredField;

		console.log("REGISTER: student " + (Object.keys(errorCodes).length > 0 ? "FAILURE" : "SUCCESS"));

		this.setState({studentErrorCodes: errorCodes});
	}

	onRecruiterLogin() {
		this.setState({recruiterErrorCodes: {
			username: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		if (this.state.recruiterUsername.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (this.state.recruiterPassword.length < 1)
			errorCodes.password = errors.general.requiredField;

		console.log("LOGIN: recruiter " + (Object.keys(errorCodes).length > 0 ? "FAILURE" : "SUCCESS"));

		this.setState({recruiterErrorCodes: errorCodes});
	}

	onRecruiterRegister() {
		this.setState({recruiterErrorCodes: {
			username: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		if (this.state.recruiterUsername.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (this.state.recruiterPassword.length < 1)
			errorCodes.password = errors.general.requiredField;

		if (this.state.recruiterConfirmPassword.length < 1)
			errorCodes.confirmPassword = errors.general.requiredField;

		if (this.state.recruiterPasscode.length < 1)
			errorCodes.passcode = errors.general.requiredField;

		console.log("REGISTER: recruiter " + (Object.keys(errorCodes).length > 0 ? "FAILURE" : "SUCCESS"));

		this.setState({recruiterErrorCodes: errorCodes});
	}

	render() {
		return (
			<div className="Login">
				<div className="tabs">
					<div className="tabs__labels">
						{this.renderTabLabels(loginTabs)}
					</div>
				<div className="tabs__windows">
					<TabWindow id={loginTabs[0].id} hide={this.state.curTab !== 0}>
						<div className="login-content">
							<div className="spacer"/>
							<ErrorInput 
								className="username"
								errorCode={this.state.studentErrorCodes.username}
								placeholder="Username"
								onChange={e => this.setState({studentUsername: e.target.value})} />
							<ErrorInput 
								className="password"
								errorCode={this.state.studentErrorCodes.password}
								placeholder="Password"
								onChange={e => this.setState({studentPassword: e.target.value})} />
							<Hider height={45} hide={!this.state.showStudentRegister}>
								<ErrorInput 
									className="confirm-password"
									errorCode={this.state.studentErrorCodes.confirmPassword}
									placeholder="Confirm Password"
									onChange={e => this.setState({studentConfirmPassword: e.target.value})} />
							</Hider>
							<div 
								className="btn btn--login selectable"
								onClick={this.state.showStudentRegister ? this.onStudentRegister.bind(this) : this.onStudentLogin.bind(this)}>
								{this.state.showStudentRegister ? "Register" : "Login"}
							</div>
							<div
								className="btn-sub selectable"
								onClick={() => this.setState(prev => ({showStudentRegister: !prev.showStudentRegister}))}>
								{this.state.showStudentRegister ? "Back to login" : "Don't have a login? Register"}
							</div>
						</div>
					</TabWindow>
					<TabWindow id={loginTabs[1].id} hide={this.state.curTab !== 1}>
						<div className="login-content">
							<div className="spacer"/>
							<ErrorInput 
								className="username"
								errorCode={this.state.recruiterErrorCodes.username}
								placeholder="Username"
								onChange={e => this.setState({recruiterUsername: e.target.value})} />
							<ErrorInput 
								className="password"
								errorCode={this.state.recruiterErrorCodes.password}
								placeholder="Password"
								onChange={e => this.setState({recruiterPassword: e.target.value})} />
							<Hider height={90} hide={!this.state.showRecruiterRegister}>
								<ErrorInput 
									className="confirm-password"
									errorCode={this.state.recruiterErrorCodes.confirmPassword}
									placeholder="Confirm Password"
									onChange={e => this.setState({recruiterConfirmPassword: e.target.value})} />
								<ErrorInput 
									className="passcode"
									errorCode={this.state.recruiterErrorCodes.passcode}
									placeholder="Company Passcode"
									onChange={e => this.setState({recruiterPasscode: e.target.value})} />
							</Hider>
							<div 
							className={classNames("btn", "btn--login", "selectable")}
							onClick={this.state.showRecruiterRegister ? this.onRecruiterRegister.bind(this) : this.onRecruiterLogin.bind(this)}>
								{this.state.showRecruiterRegister ? "Register" : "Login"}
							</div>
						<div
						className="btn-sub selectable"
						onClick={() => this.setState(prev => ({showRecruiterRegister: !prev.showRecruiterRegister}))}>
						{this.state.showRecruiterRegister ? "Back to login" : "Don't have a login? Register"}
						</div>
					</div>
					</TabWindow>
					</div>
				</div>
			</div>
		);
	}
}

class TabWindow extends Component {
	render() {
		return (
			<div className={classNames("windows__window", this.props.id, {hidden: this.props.hide})}>
				{this.props.children}
			</div>
			);
	}
}

export default withRouter(Login);