import React, { Component } from 'react';
// import classNames from 'classnames';
// import './RecruiterMain.css';
import Button from '../../components/Button';
import { connect } from 'react-redux'

class RecruiterMain extends Component {

	render() {
		return (
			<div className="RecruiterMain">
				<div className="welcome">Welcome {this.props.user.name}!</div>
				<div className="recruiter-buttons">
					<div className="company">
						<Button onClick={() => this.props.history.replace('company/' + this.props.user.employer_id)}>Your Company's profile</Button>
					</div>
					<div className="batch">
						<Button onClick={() => this.props.history.replace('batch')}>Your Virtual Line</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,	
})

export default connect(mapStateToProps)(RecruiterMain);