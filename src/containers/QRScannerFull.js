import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Button from '../components/Button';
import BottomModal from '../components/BottomModal';
import SmoothCollapse from 'react-smooth-collapse'

import { getCompanyFromQR } from '../redux/actions/qr';
import { getLine, joinLine, setLineStatus, setLineDetails } from '../redux/actions/line';

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
			confirm_status: null,
			error_status: null,
		}
	}

	scanError(err) {
		console.log(err);
	}

	scanSuccess(data) {
		// console.log(data)
		if (!data || this.state.scanning)
			return;
		this.setState({ 
			scanning: true,
			confirm_status: null,
			error_status: null, 
		});
		this.props.getLine(this.props.user.token).then(res => {
			return this.props.getCompanyFromQR(this.props.user.token, data);
		}).then(res => {
			this.setState({ company: res.data, show_modal: true, scanning: false })
		})
	}

	handleConfirm(employer_id) {
		console.log("CONFIRMED");
		if (this.props.line.employer_id && this.props.line.employer_id !== employer_id) {
			console.log("ERROR: OTHER LINE")
			this.setState({ error_status: "otherline" });
		} else if (!this.props.line.status) {
			console.log("SUCCESS: JOIN LINE")
			this.props.joinLine(this.props.user.token, employer_id).then(res => {
				this.setState({ confirm_status: res.data.status })
			});
		} else if (this.props.line.status === 'notification') {
			console.log("SUCCESS: CONFIRM LINE")
			this.props.setLineStatus(this.props.user.token, this.props.line._id, 'inline');
			this.setState({ confirm_status: 'inline' })
		} else if (this.props.line.status === 'preline') {
			console.log("ERROR: MUST WAIT")
			this.setState({ error_status: "mustwait" });
		} else if (this.props.line.status === 'inline') {
			console.log("ERROR: ALREADY IN LINE");
			this.setState({ error_status: "alreadyin" });
		}
	}

	closeModal(leave=false) {
		this.setState({ show_modal: false });
		if (leave)
			this.props.onExit();
	}


	render() {
		console.log(this.state)
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
					<BottomModal className="scanner-modal" show={this.state.show_modal}>
						{this.state.company && <div>
							<h2 className="join-title">{can_inline ? 'Confirm Line Entry' : 'Join Line'}:</h2>
							<h1 className="name">{this.state.company.name}</h1>
							<SmoothCollapse expanded={Boolean(this.state.confirm_status)} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
								{this.state.confirm_status === 'inline' && <div className="confirm-msg inline">You can join the batch now!</div>}
								{this.state.confirm_status === 'preline' && <div className="confirm-msg preline">OK, not wait for a notification</div>}
							</SmoothCollapse>
							<SmoothCollapse expanded={Boolean(this.state.error_status)} heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)">
								{this.state.error_status === 'mustwait' && <div className="error-msg mustwait">You must wait to recieve a notification</div>}
								{this.state.error_status === 'otherline' && <div className="error-msg otherline">You're already in a line</div>}
								{this.state.error_status === 'alreadyin' && <div className="error-msg alreadyin">You're already in line</div>}
							</SmoothCollapse>
							{(!this.state.confirm_status && !this.state.error_status) ? <div className="buttons">
								<Button 
									className="btn confirm"
									onClick={() => this.handleConfirm(this.state.company._id)}>
									{can_inline ? 'Confirm' : 'Join'}
								</Button>
								<Button
									className="btn cancel"
									onClick={() => this.closeModal(false)}>
									Cancel
								</Button>
							</div> :
							<Button
								className="btn cancel"
								onClick={() => this.closeModal(false)}>
								{this.state.error_status ? "Retry" : "Close"}
							</Button>}
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
	bindActionCreators({ getLine, joinLine, setLineStatus, getCompanyFromQR, setLineDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QRScannerFull);