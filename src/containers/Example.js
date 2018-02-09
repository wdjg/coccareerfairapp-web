import React, { Component } from 'react';
import classNames from 'classnames';
import './Example.css';

import ErrorInput from '../components/ErrorInput';

import { connect } from 'react-redux'


class Example extends Component {
	isFloopMajor(user) {
		return user.major === "Floopanomics"
	}

	isFloopMajor(user) {
		return user.major === "Floopanomics";
	}

<<<<<<< HEAD
	renderInterests(interests) {
		return interests.map((entry, index) =>
			(<div className="interest" key={index}>{entry}</div>)
		);
	}

	renderStudentInfo(user) {
		return null;
=======
	renderThreads(threads) {
		return threads.map((entry, index) => {
			return (<div key={index} className="thread">{entry}</div>)
		})
>>>>>>> master
	}

	renderThreads(threads) {
		return threads.map((entry, index) =>{
			return (<div key = {index} className ="thread">{entry}</div>)
		})
	}

	render() {
		return (
			<div className="Example">
				<h1 className="name">{this.props.user.name}</h1>
				<div className="entry">Major: {this.props.user.major}</div>
<<<<<<< HEAD
				{this.isFloopMajor(this.props.user) &&
					<div className = "threads">{this.renderThreads((this.props.user.threads))}</div>}
=======
				{this.isFloopMajor(this.props.user) && 
					<div className="threads">{this.renderThreads(this.props.user.threads)}</div>}
>>>>>>> master
			</div>
		);
	}
}
// {isFloopMajor() }
const mapStateToProps = state => ({
<<<<<<< HEAD
	user: {
		name: "Floopy",
		major: "Floopanomics",
		gpa: 3.5,
		year: "Freshman",
		interests: ["Blarg", "Honk", "Floop"],
		threads: ['Schnops', 'Blip'],
		graduation_date: "2",
		looking_for: "Internship",
	},
=======
	user: state.user
>>>>>>> master
});

export default connect(mapStateToProps)(Example);
