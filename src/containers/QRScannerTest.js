import React, { Component } from 'react';
import QrReader from 'react-qr-reader'

import './QRScannerTest.css';

class QRScannerTest extends Component {

	scanSuccess(data) {
		console.log(data);
	}

	scanError(err) {
		if (err) console.log(err);
	}

	scanError(err) {
		if (err) console.log(err);
	}

	closeModal(leave=false) {
		this.setState({ showModal: false });
		if (leave)
			this.props.history.goBack();
	}


	render() {
		return (
			<div className="QRScannerTest">
				<QrReader
					className="qr-scanner"
          delay={300}
          onError={this.scanError.bind(this)}
          onScan={this.scanSuccess.bind(this)}
          showViewFinder={false}
          />
          
				<div className="finder">
					<div className="corner tl"></div>
					<div className="corner tr"></div>
					<div className="corner bl"></div>
					<div className="corner br"></div>
				</div>
			</div>
		);
	}
}
// <div className="scanner-container">
// </div>

export default QRScannerTest;