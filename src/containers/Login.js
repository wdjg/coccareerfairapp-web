import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
// import logo from './react.svg';
import './Login.css';
import ErrorInput from '../components/ErrorInput'
import Hider from '../components/Hider'
import Button from '../components/Button'

// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setAuthToken } from '../redux/actions/user';

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

			student: {
				email: '',
				name: '',
				password: '',
				confirmPassword: '',
			},
			studentErrorCodes: {
				email: null,
				name: null,
				password: null,
				confirmPassword: null,
			},

			recruiter: {
				email: '',
				name: '',
				password: '',
				confirmPassword: '',
				passcode: '',
			},
			recruiterErrorCodes: {
				email: null,
				name: null,
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
		console.log("LOGIN: student");
		this.setState({studentErrorCodes: {
			email: null,
			password: null,
			confirmPassword: null,
		}});
		let errorCodes = {}
		let s = this.state.student;
		if (s.email.length < 1)
			errorCodes.email = errors.general.requiredField;

		if (s.password.length < 1)
			errorCodes.password = errors.general.requiredField;

		if (Object.keys(errorCodes).length > 0) {
			console.log("REGISTER: student FAILURE");
			this.setState({studentErrorCodes: errorCodes});
			return;
		}

		axios({
			method: 'post',
		  url: 'https://coccareerfairapp-development.herokuapp.com/api/login',
		  data: {
		  	email: s.email,
		  	password: s.password,
		  },
		  headers: {
		    "Content-Type": 'application/json'
		  }
		}).then(res => {
			this.props.setAuthToken(res.data.token);
			return axios({
				method: 'get',
			  url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
			  headers: {
			  	"Authorization": "Bearer " + res.data.token,
			    "Content-Type": 'application/json'
			  }
			});
		}).then(res => {
			this.props.setUser(res.data);
			console.log("LOGIN: student SUCCESS");
			this.props.history.push('student');
		}).catch(err => {
			console.log(err);
			console.log("LOGIN: student FAILURE");
			// TODO set error values
		});

		this.setState({studentErrorCodes: errorCodes});
	}

	onStudentRegister() {
		this.setState({studentErrorCodes: {
			username: null,
			password: null,
			confirmPassword: null,
		}});
		let errorCodes = {}
		let s = this.state.student;
		if (s.name.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (s.password.length < 1)
			errorCodes.password = errors.general.requiredField;

		if (s.confirmPassword.length < 1)
			errorCodes.confirmPassword = errors.general.requiredField;

		console.log("REGISTER: student");
		if (Object.keys(errorCodes).length > 0) {
			console.log("REGISTER: student FAILURE");
			this.setState({studentErrorCodes: errorCodes});
			return;
		}

		axios({
			method: 'post',
		  url: 'https://coccareerfairapp-development.herokuapp.com/api/register',
		  data: {
		  	email: s.email,
		  	name: s.name,
		  	password: s.password,
		  },
		  headers: {
		    "Content-Type": 'application/json'
		  }
		}).then(res => {
			this.props.setAuthToken(res.data.token);
			return axios({
				method: 'get',
			  url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
			  headers: {
			  	"Authorization": "Bearer " + res.data.token,
			    "Content-Type": 'application/json'
			  }
			});
		}).then(res => {
			this.props.setUser(res.data);
			console.log("REGISTER: student SUCCESS");
			this.props.history.push('student');
		}).catch(err => {
			console.log(err);
			console.log("REGISTER: student FAILURE");
			// TODO set error values
		});

		this.setState({studentErrorCodes: errorCodes});
	}

	onRecruiterLogin() {
		this.setState({recruiterErrorCodes: {
			name: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		let r = this.state.recruiter;
		if (r.name.length < 1)
			errorCodes.username = errors.general.requiredField;

		if (r.password.length < 1)
			errorCodes.password = errors.general.requiredField;

		console.log("LOGIN: recruiter");
		axios({
			method: 'post',
		  url: 'https://coccareerfairapp-development.herokuapp.com/api/login',
		  data: {
		  	email: r.email,
		  	password: r.password,
		  },
		  headers: {
		    "Content-Type": 'application/json'
		  }
		}).then(res => {
			this.props.setAuthToken(res.data.token);
			return axios({
				method: 'get',
			  url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
			  headers: {
			  	"Authorization": "Bearer " + res.data.token,
			    "Content-Type": 'application/json'
			  }
			});
		}).then(res => {
			this.props.setUser(res.data);
			console.log("LOGIN: recruiter SUCCESS");
			this.props.history.push('recruiter');
		}).catch(err => {
			console.log(err);
			console.log("LOGIN: recruiter FAILURE");
			// TODO set error values
		});

		this.setState({studentErrorCodes: errorCodes});
	}

	onRecruiterRegister() {
		this.setState({recruiterErrorCodes: {
			name: null,
			password: null,
			confirmPassword: null,
			passcode: null,
		}});
		let errorCodes = {}
		let r = this.state.recruiter;
		if (r.name.length < 1)
			errorCodes.name = errors.general.requiredField;

		if (r.password.length < 1)
			errorCodes.password = errors.general.requiredField;

		if (r.confirmPassword.length < 1)
			errorCodes.confirmPassword = errors.general.requiredField;

		if (r.passcode.length < 1)
			errorCodes.passcode = errors.general.requiredField;

		console.log("REGISTER: recruiter");
		axios({
			method: 'post',
		  url: 'https://coccareerfairapp-development.herokuapp.com/api/register',
		  data: {
		  	email: r.email,
		  	name: r.name,
		  	password: r.password,
		  	user_type: 'recruiter',
		  	employer_id: r.passcode,
		  },
		  headers: {
		    "Content-Type": 'application/json'
		  }
		}).then(res => {
			this.props.setAuthToken(res.data.token);
			console.log(res.data.token);
			return axios({
				method: 'get',
			  url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
			  headers: {
			  	"Authorization": "Bearer " + res.data.token,
			    "Content-Type": 'application/json'
			  }
			});
		}).then(res => {
			this.props.setUser(res.data);
			console.log("REGISTER: recruiter SUCCESS");
			this.props.history.push('recruiter');
		}).catch(err => {
			console.log(err);
			console.log("REGISTER: recruiter FAILURE");
			// TODO set error values
		});

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
						<form className="login-content">
							<div className="spacer"/>
							<Hider height={45} hide={!this.state.showStudentRegister}>
								<ErrorInput 
									className="name"
									errorCode={this.state.studentErrorCodes.confirmPassword}
									placeholder="Name"
									text={this.state.student.name}
									onChange={e => this.setState({student: {...this.state.student, name: e}})} />
							</Hider>
							<ErrorInput 
								className="email"
								errorCode={this.state.studentErrorCodes.email}
								placeholder="Email"
								text={this.state.student.email}
								onChange={e => this.setState({student: {...this.state.student, email: e}})} />
							<ErrorInput 
								className="password"
								errorCode={this.state.studentErrorCodes.password}
								placeholder="Password"
								password
								text={this.state.student.password}
								onChange={e => this.setState({student: {...this.state.student, password: e}})} />
							<Hider height={45} hide={!this.state.showStudentRegister}>
								<ErrorInput 
									className="confirm-password"
									errorCode={this.state.studentErrorCodes.confirmPassword}
									placeholder="Confirm Password"
									password
									text={this.state.student.confirmPassword}
									onChange={e => this.setState({student: {...this.state.student, confirmPassword: e}})} />
							</Hider>
							<Button
								style={{marginTop: '15px' }}
								type="submit"
								onClick={this.state.showStudentRegister ? this.onStudentRegister.bind(this) : this.onStudentLogin.bind(this)}>
								{this.state.showStudentRegister ? "Register" : "Login"}
							</Button>
							<div
								className="btn-sub selectable"
								onClick={() => this.setState(prev => ({showStudentRegister: !prev.showStudentRegister}))}>
								{this.state.showStudentRegister ? "Back to login" : "Don't have a login? Register"}
							</div>
						</form>
					</TabWindow>
					<TabWindow id={loginTabs[1].id} hide={this.state.curTab !== 1}>
						<form className="login-content">
							<div className="spacer"/>
							<Hider height={45} hide={!this.state.showRecruiterRegister}>
								<ErrorInput 
									className="name"
									errorCode={this.state.recruiterErrorCodes.name}
									placeholder="Name"
									text={this.state.recruiter.name}
									onChange={e => this.setState({recruiter: {...this.state.recruiter, name: e}})} />
							</Hider>
							<ErrorInput 
								className="email"
								errorCode={this.state.recruiterErrorCodes.username}
								placeholder="Email"
								text={this.state.recruiter.email}
								onChange={e => this.setState({recruiter: {...this.state.recruiter, email: e}})} />
							<ErrorInput 
								className="password"
								errorCode={this.state.recruiterErrorCodes.password}
								placeholder="Password"
								password
								text={this.state.recruiter.pass}
								onChange={e => this.setState({recruiter: {...this.state.recruiter, password: e}})} />
							<Hider height={96} hide={!this.state.showRecruiterRegister}>
								<ErrorInput 
									className="confirm-password"
									errorCode={this.state.recruiterErrorCodes.confirmPassword}
									placeholder="Confirm Password"
									password
									text={this.state.recruiter.confirmPassword}
									onChange={e => this.setState({recruiter: {...this.state.recruiter, confirmPassword: e}})} />
								<ErrorInput 
									className="passcode"
									errorCode={this.state.recruiterErrorCodes.passcode}
									placeholder="Company Passcode"
									text={this.state.recruiter.passcode}
									onChange={e => this.setState({recruiter: {...this.state.recruiter, passcode: e}})} />
							</Hider>
							<Button
								style={{marginTop: '15px' }}
								type="submit"
								onClick={this.state.showRecruiterRegister ? this.onRecruiterRegister.bind(this) : this.onRecruiterLogin.bind(this)}>
								{this.state.showRecruiterRegister ? "Register" : "Login"}
							</Button>
						<div
						className="btn-sub selectable"
						onClick={() => this.setState(prev => ({showRecruiterRegister: !prev.showRecruiterRegister}))}>
						{this.state.showRecruiterRegister ? "Back to login" : "Don't have a login? Register"}
						</div>
					</form>
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

const mapStateToProps = state => ({
	
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setUser, setAuthToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);