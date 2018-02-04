import React, { Component } from 'react';
import './InterviewModal.css';

class InterviewModal extends Component {

	beginInterview(student_id) {
		console.log("BEGIN INTERVIEW: " + student_id);
	}

	render() {
		return (
			<div className="InterviewModal">
				<h2 className="interview-title">Interview With:</h2>
				<h1 className="name">{this.props.name}</h1>
				
				<div className="buttons">
					<div 
						className="btn begin"
						onClick={() => this.beginInterview(this.props.id)}>
						Begin
					</div>
					<div
						className="btn cancel"
						onClick={this.props.closeModal}>
						Cancel
					</div>
				</div>
			</div>
		);
	}
}

export default InterviewModal;