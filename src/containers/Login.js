import React, { Component } from 'react';
import classNames from 'classnames';
// import logo from './react.svg';
import './Login.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

  setText(e, item) {
    this.setState({item: e.target.value})
  }

  render() {
    return (
      <div className="Login">
        <div className="titlebar">

        </div>
        <div className="tabs">
          <div className="tabs__labels">
            {this.renderTabLabels(loginTabs)}
          </div>
          <div className="tabs__windows">

            <TabWindow
              id={loginTabs[0].id}
              hide={this.state.curTab !== 0}>
              <div className="login-content">
                <div className="spacer"/>
                <Hider hide={!this.state.studentErrorCodes.username}>
                  <Warning text={this.state.studentErrorCodes.username}/>
                </Hider>
                <input
                  className="username"
                  placeholder="Username"
                  onChange={e => this.setText(e, 'studentUsername')}/>

                <Hider hide={!this.state.studentErrorCodes.password}>
                  <Warning text={this.state.studentErrorCodes.password}/>
                </Hider>
                <input
                  className="password"
                  placeholder="Password"
                  onChange={e => this.setText(e, 'studentPassword')}/>
                
                <Hider hide={!this.state.studentErrorCodes.confirmPassword || !this.state.showStudentRegister}>
                  <Warning text={this.state.studentErrorCodes.confirmPassword}/>
                </Hider>
                <Hider hide={!this.state.showStudentRegister}>
                  <input
                    className="confirm-password"
                    placeholder="Confirm Password"
                    onChange={e => this.setText(e, 'studentConfirmPassword')}/>
                </Hider>
                <div 
                  className="btn btn--login selectable"
                  onClick={this.state.showStudentRegister ?
                    this.onStudentRegister.bind(this) : this.onStudentLogin.bind(this)}>
                  {this.state.showStudentRegister ? "Register" : "Login"}
                </div>
                <div
                  className="btn-sub selectable"
                  onClick={() => this.setState(prev => ({showStudentRegister: !prev.showStudentRegister}))}>
                  {this.state.showStudentRegister ? "Back to login" : "Don't have a login? Register"}
                </div>
              </div>
            </TabWindow>
            <TabWindow
              id={loginTabs[1].id}
              hide={this.state.curTab !== 1}>
              <div className="login-content">
                <div className="spacer"/>

                <Hider hide={!this.state.recruiterErrorCodes.username}>
                  <Warning text={this.state.recruiterErrorCodes.username}/>
                </Hider>
                <input className="username" placeholder="Username"></input>

                <Hider hide={!this.state.recruiterErrorCodes.password}>
                  <Warning text={this.state.recruiterErrorCodes.password}/>
                </Hider>
                <input className="password" placeholder="Password"></input>

                <Hider hide={!this.state.recruiterErrorCodes.confirmPassword || !this.state.showRecruiterRegister}>
                  <Warning text={this.state.recruiterErrorCodes.confirmPassword}/>
                </Hider>
                <Hider hide={!this.state.showRecruiterRegister}>
                  <input className="confirm-password" placeholder="Confirm Password"></input>
                </Hider>

                <Hider hide={!this.state.recruiterErrorCodes.passcode || !this.state.showRecruiterRegister}>
                  <Warning text={this.state.recruiterErrorCodes.passcode}/>
                </Hider>
                <Hider hide={!this.state.showRecruiterRegister}>
                  <input className="passcode" placeholder="Company Passcode"></input>
                </Hider>
                <div 
                  className={classNames("btn", "btn--login", "selectable")}
                  onClick={this.state.showRecruiterRegister ?
                    this.onRecruiterRegister.bind(this) : this.onRecruiterLogin.bind(this)}>
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

class Hider extends Component {
  render() {
    return (
      <div className={classNames("hider", {hidden: this.props.hide})}>
        {this.props.children}
      </div>
    );
  }
}

class Warning extends React.Component {
  render() {
    return (
      <div className="warning"><MdError className="error-icon"/>
        <span className="warning__text">{this.props.text}</span>
      </div>
    );
  }
}

export default withRouter(Login);


/*
<div 
  className={classNames('login-divider', 'recruiter', {hide: this.state.hideRecruiter})}
  onClick={() => this.setState(prev => ({hideRecruiter: !prev.hideRecruiter}))}>
  <div className="login-divider__content top">
    a
  </div>
</div>
<div
  className={classNames('login-divider', 'student', {hide: this.state.hideStudent})}
  onClick={() => this.setState(prev => ({hideStudent: !prev.hideStudent}))}>
  <div className="login-divider__content bottom">
    b
  </div>
</div>
*/

/*
<div className="Home-header">
  <img src={logo} className="Home-logo" alt="logo" />
  <h2>Welcome to Razzle</h2>
</div>
<p className="Home-intro">
  To get started, edit <code>src/App.js</code> or{' '}
  <code>src/Home.js</code> and save to reload.
</p>
<ul className="Home-resources">
  <li>
    <a href="https://github.com/jaredpalmer/razzle">Docs</a>
  </li>
  <li>
    <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
  </li>
  <li>
    <a href="https://palmer.chat">Community Slack</a>
  </li>
</ul>
*/