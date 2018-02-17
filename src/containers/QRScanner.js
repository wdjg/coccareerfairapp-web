import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import classNames from 'classnames';
import './QRScanner.css';
import axios from 'axios';
import { setLineDetails } from '../redux/actions';
import { bindActionCreators } from 'redux';

import QRConfirmationModal from '../components/QRConfirmationModal';

import { MdChevronLeft } from 'react-icons/lib/md';
import { connect } from 'react-redux';

class QRScanner extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			company: null,
			line: {},
	  };
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: 'https://coccareerfairapp-development.herokuapp.com/api/lines',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.user.token,
			}
		}).then(res => {
			if (!res.data)
				return;
			this.props.setLineDetails(res.data);
		}).catch(err => console.log(err));
	}

	//TODO make sure we're getting id from the qr code for redux
	//TODO handle case where user is already in line
	scanSuccess(data) {
		if (this.state.showModal) return;
		if (!data) return;
		console.log(data);
		//TODO make this not Microsoft
		console.log(this.props.user.token);
		axios({
			method: 'post',
			url: 'https://coccareerfairapp-development.herokuapp.com/api/employers/qr',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.user.token,
			},
			data: {
				value: data
			}
		}).then(res => {
			// console.log(res.data)
			this.setState({ showModal: true, company: res.data });
		}).catch(err => console.log(err));
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
							name={this.state.company.name}
							employerID={this.state.company._id}
							lineID={this.state.line._id}
							status={this.state.line.status}
							token={this.props.user.token}
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
	line: state.line,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setLineDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);