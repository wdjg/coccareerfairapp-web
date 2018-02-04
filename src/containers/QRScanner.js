import React, { Component } from 'react';
import './QRScanner.css';

import { MdChevronLeft } from 'react-icons/lib/md';

import QrReader from 'react-qr-reader'

class QRScanner extends Component {

	scanSuccess(data) {
		if (data) console.log(data);
	}

	scanError(err) {
		if (err) console.log(err);
	}

	render() {
		console.log(this.props)
		return (
			<div className="QRScanner">
				<div className="scanner-container">
					<div className="scanner-spacer"></div>
					<QrReader
						className="qr-scanner"
	          delay={300}
	          onError={this.scanSuccess}
	          onScan={this.scanError}
	          showViewFinder={false}
	          style={{ width: '100%' }}
	          />
					<div className="scanner-spacer"></div>
				</div>
				<div className="finder">
					<div className="corner tl"></div>
					<div className="corner tr"></div>
					<div className="corner bl"></div>
					<div className="corner br"></div>
				</div>
					<MdChevronLeft className="back" onClick={() => this.props.history.goBack()}/>
			</div>
		);
	}
}

export default QRScanner;