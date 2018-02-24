import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import './QRScannerFull.css';

const containerTransition = {
	entering: { height: 0 },
	entered: { height: '100vh' },
}

const finderTransition = {
	entering: {
		opacity: 0,
		width: '101vw',
		height: '101vw',
	},
	entered: {
		opacity: 1,
		width: '40vw',
		height: '40vw',
	}
}

class QRScannerFull extends Component {

	scanSuccess(data) {
		console.log(data);
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
			<Transition in={this.props.visible} timeout={400} unmountOnExit={true} className="QRScannerFull">
			 	{state => (
			 		<div className="qr-container" style={{...containerTransition[state]}}>
				 	<QrReader
						className="qr-scanner"
	          delay={300}
	          onError={this.scanError.bind(this)}
	          onScan={this.scanSuccess.bind(this)}
	          showViewFinder={false}
	          />
	          
					<div className="finder" style={{...finderTransition[state]}}>
						<div className="corner tl"></div>
						<div className="corner tr"></div>
						<div className="corner bl"></div>
						<div className="corner br"></div>
					</div>
					<div className={classNames("exit", {active: state === 'entering' || state === 'entered'})} onClick={this.props.onExit}></div>
			 	</div>)}
			</Transition>
		);
	}
}
// <div className="scanner-container">
// </div>

export default QRScannerFull;