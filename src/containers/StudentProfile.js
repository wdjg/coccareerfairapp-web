import React, { Component } from 'react';
import classNames from 'classnames';
import './StudentProfile.css';

import ErrorInput from '../components/ErrorInput';

import { connect } from 'react-redux'


class Example extends Component {

	isCSMajor(user) {
		return user.major === "Computer Science";
	}

	renderThreads(threads) {
		return threads.map((entry, index) => {
			return (<div key={index} className="thread">{entry}</div>)
		})
	}

	render() {
		return (
			<div className="Example">
				<h1 className="name">{this.props.user.name}</h1>
				<div className="entry">Major: {this.props.user.major}</div>
				{this.isCSMajor(this.props.user) && 
					<div className="threads">Threads: {this.renderThreads(this.props.user.threads)}</div>}
				<div className="entry">GPA: {this.props.user.GPA}</div>
				<div className="entry">Expected Gradutation Date: {this.props.user.graduation_date}</div>
				<div className="entry">Looking For: {this.props.user.looking_for}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(Example);