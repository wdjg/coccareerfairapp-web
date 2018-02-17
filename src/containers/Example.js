import React, { Component } from 'react';
import classNames from 'classnames';
import './Example.css';

import ErrorInput from '../components/ErrorInput';
import Button from '../components/Button';

import { connect } from 'react-redux'


class Example extends Component {

	render() {
		return (
			<div className="Example">
				<Button>Test</Button>
			</div>
		);
	}
}
// {isFloopMajor() }
const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(Example);