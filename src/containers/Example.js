import React, { Component } from 'react';
import classNames from 'classnames';
import './Example.css';

import { connect } from 'react-redux'

class Example extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bool: false,
		}
	}

	renderInterests(interests) {
		return interests.map((entry, index) => 
			(<div className="interest" key={index}>{entry}</div>)
		);
	}

	render() {
		return (
			<div className="Example" onClick={() => this.setState({bool: !this.state.bool})}>
				<h1 className="name">{this.props.user.name}</h1>
				<div className="entry">Major: {this.props.user.major}</div>
				<div className="entry">{this.props.user.gpa}</div>
				<div className="entry">{this.props.user.year}</div>
				<div className="entry">{this.renderInterests(this.props.user.interests)}</div>
				<div className={classNames("foo", {bar: this.state.bool})}>AAAAAAAAAARG</div>
				{this.state.bool && <div className="baz">Hello</div>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: {
		name: "Floopy",
		major: "Floopanomics",
		gpa: 3.5,
		year: "Freshman",
		interests: ["Blarg", "Honk", "Floop"],
		graduation_date: "2",
		looking_for: "Internship",
	},
});

export default connect(mapStateToProps)(Example);