import React, { Component } from 'react';
import './Example.css';

import { connect } from 'react-redux'


class Example extends Component {

	isFloopMajor(user) {
		return user.major === "Floopanomics";
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
				{this.isFloopMajor(this.props.user) && 
					<div className="threads">{this.renderThreads(this.props.user.threads)}</div>}
			</div>
		);
	}
}
// {isFloopMajor() }
const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(Example);