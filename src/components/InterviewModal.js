import React, { Component } from 'react';
import './InterviewModal.css';

import Button from './Button';

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
					<Button 
						className="btn begin"
						onClick={() => this.beginInterview(this.props.id)}>
						Begin
					</Button>
					<Button
						className="btn cancel"
						onClick={this.props.closeModal}>
						Cancel
					</Button>
				</div>
			</div>
		);
	}
}

export default InterviewModal;