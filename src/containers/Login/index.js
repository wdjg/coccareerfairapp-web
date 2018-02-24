import React, { Component } from 'react';
import classNames from 'classnames';
// import logo from './react.svg';
import './Login.css';
import Button from '../../components/Button';
import Warning from '../../components/Warning';
import Loading from '../../components/Loading';
import SmoothCollapse from 'react-smooth-collapse';
import { Formik } from 'formik';

// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../redux/actions/user';
import { userLogin } from '../../redux/actions/login';
import { studentRegister, recruiterRegister } from '../../redux/actions/register';

const loginTabs = [{id: 'student', label: 'Student'}, {id: 'recruiter', label: 'Recruiter'}];

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curTab: 0,
			studentRegister: false,
			recruiterRegister: false,
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

	handleStudentSubmit(values, { setSubmitting, setErrors}) {
		if (this.state.studentRegister) {
			console.log("REGISTER: student");
			this.props.studentRegister(values.name, values.email.trim(), values.password).then(res => {
				setSubmitting(false);
				this.props.updateUser(res.data)
			}).catch(err => {
				setSubmitting(false);
				setErrors(transformAPIError(err.response.data.message));
			});

		} else {
			console.log("LOGIN: student");
			this.props.userLogin(values.email.trim(), values.password).then(res => {
				setSubmitting(false);
				this.props.updateUser(res.data)
			}).catch(err => {
				setSubmitting(false);
				setErrors(transformAPIError(err.response.data.message));
			});
		}
	}

	handleRecruiterSubmit(values, { setSubmitting, setErrors}) {
		if (this.state.recruiterRegister) {
			console.log("REGISTER: recruiter");
			this.props.recruiterRegister(values.name, values.email.trim(), values.password, values.passcode).then(res => {
				setSubmitting(false);
				this.props.updateUser(res.data)
			}).catch(err => {
				setSubmitting(false);
				setErrors(transformAPIError(err.response.data.message));
			});

		} else {
			console.log("LOGIN: recruiter");
			this.props.userLogin(values.email.trim(), values.password).then(res => {
				setSubmitting(false);
				this.props.updateUser(res.data)
			}).catch(err => {
				setSubmitting(false);
				setErrors(transformAPIError(err.response.data.message));
			});
		}
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
							<Formik
								initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
								validate={this.state.studentRegister ? validateRegister : validateLogin}
								onSubmit={this.handleStudentSubmit.bind(this)}
								render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
									<form onSubmit={handleSubmit}>
										<SmoothCollapse className="error-input" expanded={this.state.studentRegister} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
											<Warning expanded={Boolean(touched.name && errors.name)} text={errors.name}/>
											<input
												type="text"
												name="name"
												placeholder="Name"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.name}
											/>
										</SmoothCollapse>
										<div className="error-input">
											<Warning expanded={Boolean(touched.email && errors.email)} text={errors.email}/>
											<input
												type="email"
												name="email"
												placeholder="Email"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.email}
											/>
										</div>
										<div className="error-input">
											<Warning expanded={Boolean(touched.password && errors.password)} text={errors.password}/>
											<input
												type="password"
												name="password"
												placeholder="Password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
										</div>
										<SmoothCollapse className="error-input" expanded={this.state.studentRegister} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
											<Warning expanded={Boolean(touched.confirmPassword && errors.confirmPassword)} text={errors.confirmPassword}/>
											<input
												type="password"
												name="confirmPassword"
												placeholder="Confirm Password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.confirmPassword}
											/>
										</SmoothCollapse>
										{isSubmitting && <Loading/>}
										<div className="spacer"></div>
										<Button type="submit" disabled={isSubmitting}>
											{this.state.studentRegister ? "Register" : "Login"}
										</Button>
										<div
											className="btn-sub selectable"
											onClick={() => this.setState(prev => ({studentRegister: !prev.studentRegister}))}>
											{this.state.studentRegister ? "Back to login" : "Don't have a login? Register"}
										</div>
									</form>
								)}
							/>
						</div>
					</TabWindow>
					<TabWindow id={loginTabs[1].id} hide={this.state.curTab !== 1}>
						<div className="login-content">
							<Formik
								initialValues={{ email: '', password: '', name: '', confirmPassword: '', passcode: '' }}
								validate={this.state.recruiterRegister ? validateRecruiterRegister : validateLogin}
								onSubmit={this.handleRecruiterSubmit.bind(this)}
								render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
									<form onSubmit={handleSubmit}>
										<SmoothCollapse className="error-input" expanded={this.state.recruiterRegister} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
											<Warning expanded={Boolean(touched.name && errors.name)} text={errors.name}/>
											<input
												type="text"
												name="name"
												placeholder="Name"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.name}
											/>
										</SmoothCollapse>
										<div className="error-input">
											<Warning expanded={Boolean(touched.email && errors.email)} text={errors.email}/>
											<input
												type="email"
												name="email"
												placeholder="Email"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.email}
											/>
										</div>
										<div className="error-input">
											<Warning expanded={Boolean(touched.password && errors.password)} text={errors.password}/>
											<input
												type="password"
												name="password"
												placeholder="Password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
										</div>
										<SmoothCollapse className="error-input" expanded={this.state.recruiterRegister} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
											<Warning expanded={Boolean(touched.confirmPassword && errors.confirmPassword)} text={errors.confirmPassword}/>
											<input
												type="password"
												name="confirmPassword"
												placeholder="Confirm Password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.confirmPassword}
											/>
											<Warning expanded={Boolean(touched.passcode && errors.passcode)} text={errors.passcode}/>
											<input
												type="text"
												name="passcode"
												placeholder="Company Code"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.passcode}
											/>
										</SmoothCollapse>
										{isSubmitting && <Loading className="loading"/>}
										<div className="spacer"></div>
										<Button type="submit" disabled={isSubmitting}>
											{this.state.recruiterRegister ? "Register" : "Login"}
										</Button>
										<div
											className="btn-sub selectable"
											onClick={() => this.setState(prev => ({recruiterRegister: !prev.recruiterRegister}))}>
											{this.state.recruiterRegister ? "Back to login" : "Don't have a login? Register"}
										</div>
									</form>
								)}
							/>
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
			<div className={classNames(this.props.className, "windows__window", this.props.id, {hidden: this.props.hide})}>
				{this.props.children}
			</div>
			);
	}
}

const mapStateToProps = state => ({
	
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ updateUser, userLogin, studentRegister, recruiterRegister }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const validateLogin = values => {
	// same as above, but feel free to move this into a class method now.
	let errors = {};
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.password) {
		errors.password = 'Required';
	}
	return errors;
};

const validateRegister = values => {
	let errors = validateLogin(values);
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = 'Required';
	}
	if (values.confirmPassword !== values.password) {
		errors.password = 'Passwords don\'t match';
	}
	return errors;
}

const validateRecruiterRegister = values => {
	let errors = validateRegister(values);
	if (!values.passcode)
		errors.passcode = 'Required';
	return errors;
}

const transformAPIError = error => {
	let errors = {};
	if (error === "LoginError: No user found for email")
		errors.email = "No user with this email"
	if (error === "LoginError: Invalid email password combination")
		errors.email = "Invalid Login"
	if (error === "RegisterError: User already exists!")
		error.email = "User already exists"
	// if (error === )
	// 	error.email = ""
	return errors;
}