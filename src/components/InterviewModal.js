import React, { Component } from 'react';
import classNames from 'classnames';
import './InterviewModal.css';

import { connect } from 'react-redux';

class InterviewModal extends Component {

	beginInterview(student_id) {
		console.log("BEGIN INTERVIEW: " + id);
	}

	render() {
		return (
			<div className="InterviewModal">
				<h1 className="name">{this.props.name}</h1>
				<div className="buttons">
					<div 
						className="btn begin-interview"
						onClick={() => this.beginInterview(this.props.id)}>
					</div>
					<div
						className="btn cancel"
						onClick={this.props.closeModal}>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	batch: state.batch,
});

export default InterviewModal;