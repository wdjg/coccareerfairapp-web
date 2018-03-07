import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Button from '../components/Button';
import BottomModal from '../components/BottomModal'

import { getCompanyFromQR } from '../redux/actions/qr';
import { getLine, joinLine, setLineStatus } from '../redux/actions/line';

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
			scanning: false,
			show_modal: false,
		}
	}

	scanError(err) {
		console.log(err);
	}

	scanSuccess(data) {
		// console.log(data)
		if (!data || this.state.scanning)
			return;
		this.setState({ scanning: true });
		this.props.getLine(this.props.user.token).then(res => {
			return this.props.getCompanyFromQR(this.props.token, data);
		}).then(res => {
			this.setState({ company: res.data, show_modal: true, scanning: false })
		}).catch(err => {
			console.log(err);
			this.setState({ scanning: false });
		})
	}

	handleConfirm(employer_id) {
		if (!this.props.line.status) {
			this.props.joinLine(this.props.user.token, employer_id);
		} else if (this.props.status === 'notification') {
			this.props.setLineStatus(this.props.user.token, this.props.line._id, 'inline');
		} else if (this.props.status !== 'notification') {

		}
	}

	closeModal(leave=false) {
		this.setState({ show_modal: false });
		if (leave)
			this.props.onExit();
	}


	render() {
		const can_inline = this.props.line.status === 'notification';
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
					<BottomModal className="scanner-modal">
						{this.state.company && <div>
							<h2 className="join-title">{can_inline ? 'Confirm Line Entry' : 'Join Line'}:</h2>
							<h1 className="name">{this.state.company.name}</h1>
							<div className="buttons">
								<Button 
									className="btn confirm"
									onClick={() => this.handleConfirm(this.props.line.employer_id)}>
									{can_inline ? 'Confirm' : 'Join'}
								</Button>
								<Button
									className="btn cancel"
									onClick={this.props.closeModal}>
									Cancel
								</Button>
							</div>
						</div>}
					</BottomModal>
					<div className={classNames("exit", {active: state === 'entering' || state === 'entered'})} onClick={this.props.onExit}></div>
				</div>)}
			</Transition>
		);
	}
}

const mapStateToProps = state => ({
	line: state.line,
	user: state.user,
	companies: state.companies,
})

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getLine, joinLine, setLineStatus, getCompanyFromQR }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QRScannerFull);