import React, { Component } from 'react';
import './Example.css';

<<<<<<< HEAD
import ErrorInput from '../components/ErrorInput';
import Button from '../components/Button';

=======
>>>>>>> company-profile-screen
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