import React, { Component } from 'react';
import classNames from 'classnames';
import './RecruiterProfile.css';

import ErrorInput from '../components/ErrorInput';

import { connect } from 'react-redux'


class RecruiterProfile extends Component {

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

	renderStudentInfo(user) {
		return null;
	}

	render() {
		return (
			<div className="RecruiterProfile" onClick={() => this.setState({bool: !this.state.bool})}>
				<h1 className="name">{this.props.user.name}</h1>
				<div className="entry">Major: {this.props.user.major}</div>
				<div className="entry">{this.props.user.gpa}</div>
				<div className="entry">{this.props.user.year}</div>
				<div className="entry">{this.renderInterests(this.props.user.interests)}</div>
				<div className={classNames("foo", {bar: this.state.bool})}>AAAAAAAAAARG</div>
				<ErrorInput text="hello" show={this.state.bool}/>
			</div>
		);
	}
}
				// {this.state.bool && <div className="baz">Hello</div>}

const mapStateToProps = state => ({
	user: {
		name: "Floopy",
		company_id: "3334544",
        title: ""
	},
});

export default connect(mapStateToProps)(RecruiterProfile);
