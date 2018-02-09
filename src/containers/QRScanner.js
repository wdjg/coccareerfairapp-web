import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import './QRScanner.css';

import QRConfirmationModal from '../components/QRConfirmationModal';

import { MdChevronLeft } from 'react-icons/lib/md';
import { connect } from 'react-redux';

class QRScanner extends Component {

	constructor(props) {
		super(props);

		this.state = {
			lastQR: null,
			showModal: false,
			company: null
	  };
	}

	//TODO make sure we're getting id from the qr code for redux
	scanSuccess(data) {
		if (this.state.showModal) return;
		if (data) console.log(data);
		//TODO make this not Microsoft
		data = '8675309RICK'
		const company = this.props.companies.find(e => e.id === data);
		this.setState({lastQR: data, showModal: true});
	}

	scanError(err) {
		if (err) console.log(err);
	}

	closeModal() {
		this.setState({ showModal: false });
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
	          onError={this.scanError.bind(this)}
	          onScan={this.scanSuccess.bind(this)}
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
				<div className={classNames("modal", {show: this.state.showModal})}>
					<div className="shadow" onClick={() => this.closeModal()}></div>
					<div className="content">
						{this.state.company && <QRConfirmationModal
							name={this.state.state.company}
							id={this.state.state.company}
							closeModal={() => this.closeModal()}/>}
					</div>
				</div>
				<MdChevronLeft className="back" onClick={() => this.props.history.goBack()}/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	companies: state.companies,
});

export default connect(mapStateToProps)(QRScanner);