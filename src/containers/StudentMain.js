import React, { Component } from 'react';
import classNames from 'classnames';
import './StudentMain.css';
import { withRouter } from 'react-router-dom';

import QrReader from 'react-qr-reader'

class StudentMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showCamera: false,
		}
	}

	scanSuccess(data) {
		if (data) console.log(data);
	}

	scanError(err) {
		if (err) console.log(err);
	}

	render() {
		return (
			<div className="StudentMain" onClick={() => this.setState(prev => ({showCamera: true}))}>
				<div className="line-container">
				</div>
				{this.state.showCamera && <div className="scanner-container">
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
				</div>}
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

// <div className="line-container">
// 					<div className="color-bar"></div>
// 					<div className="line-content"></div>
// 				</div>

export default withRouter(StudentMain);