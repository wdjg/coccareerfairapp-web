import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import QRConfirmationModal from '../components/QRConfirmationModal';

import * as LineAPI from '../api/line';
import * as QRAPI from '../api/qr';
import { getLine } from '../redux/actions/line';

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

	constructor(props) {
		super(props);

		this.state = {
			company: null,
			show_modal: false,
		}
	}

	scanError(err) {
		console.log(err);
	}

	componentWillReceiveProps(next) {
		if (next.visible && next.token)
			this.props.getLine(next.token);
	}

	scanSuccess(data) {
		if (!data)
			return;
		QRAPI.getCompanyFromQR(this.props.token, data).then(res => {
			this.setState({ company: res.data, show_modal: true })
		}).catch(err => {
			console.log(err);
		})
	}

	closeModal(leave=false) {
		this.setState({ show_modal: false });
		if (leave)
			this.props.onExit();
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
					<div className={classNames("modal", {show: this.state.show_modal})}>
					<div className="shadow" onClick={() => this.closeModal()}></div>
					<div className="content">
						{this.state.company && <QRConfirmationModal
							name={this.state.company.name}
							employerID={this.state.company._id}
							lineID={this.props.line._id}
							status={this.props.line.status}
							token={this.props.token}
							closeModal={() => this.closeModal()}/>}
					</div>
				</div>
					<div className={classNames("exit", {active: state === 'entering' || state === 'entered'})} onClick={this.props.onExit}></div>
			 	</div>)}
			</Transition>
		);
	}
}

const mapStateToProps = state => ({
	line: state.line,
})

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getLine }, dispatch);

export default connect(null, mapDispatchToProps)(QRScannerFull);