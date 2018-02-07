import React, { Component } from 'react';
import './QRConfirmationModal.css';

class QRConfirmationModal extends Component {

	joinLine(company_id) {
		console.log("JOIN LINE: " + company_id);
	}

	render() {
		return (
			<div className="QRConfirmationModal">
				<h2 className="join-title">Join line:</h2>
				<h1 className="name">{this.props.name}</h1>
				
				<div className="buttons">
					<div 
						className="btn confirm"
						onClick={() => this.joinLine(this.props.id)}>
						Join
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

export default QRConfirmationModal;