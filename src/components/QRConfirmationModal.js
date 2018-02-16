import React, { Component } from 'react';
import './QRConfirmationModal.css';
import axios from 'axios';

class QRConfirmationModal extends Component {

	handleConfirm(employer_id) {
		if (!this.props.status) {
			console.log("JOIN LINE: " + employer_id);
			axios({
				method: 'post',
				url: 'https://coccareerfairapp-development.herokuapp.com/api/lines',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token,
				},
				data: {
					employer_id: employer_id,
				}
			}).then(res => {
				// TODO handle immediate line placement
				this.props.closeModal(true);
			}).catch(err => console.log(err));
		} else if (this.props.status === 'notification') {
			console.log("CONFIRM LINE ENTRY: " + employer_id);
			axios({
				method: 'put',
				url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/' + this.props.lineID,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token,
				},
				data: {
					status: 'inline',
				}
			}).then(res => {
				// TODO handle immediate line placement
				this.props.closeModal(true);
			}).catch(err => console.log(err));
		} else if (this.props.status !== 'notification') {
			// TODO give user notificaiton that they they're already in line, also make sure to differentiate between same line and other
			// Actually, handle this 
		}
	}

	// TODO change 'Confirm Line Entry' to something more understandable
	render() {
		return (
			<div className="QRConfirmationModal">
				<h2 className="join-title">{this.props.status === 'notification' ? 'Confirm Line Entry' : 'Join Line'}:</h2>
				<h1 className="name">{this.props.name}</h1>
				
				<div className="buttons">
					<div 
						className="btn confirm"
						onClick={() => this.handleConfirm(this.props.employerID)}>
						{this.props.status === 'notification' ? 'Confirm' : 'Join'}
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