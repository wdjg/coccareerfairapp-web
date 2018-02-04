import React, { Component } from 'react';
import classNames from 'classnames';
import './StudentMain.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

	renderCompany(company) {
		return company ? company : "Not in Line"
	}

	//TODO render time correctly
	renderWait(wait) {
		if (wait) {
			return (<span>{Math.round(wait)}<span className="min">min</span></span>);
		} else {
			return "N/A";
		}
	}

	render() {
		return (
			<div className="StudentMain" onClick={() => this.setState(prev => ({showCamera: true}))}>
				<div className="line-details">
					<div className="company">
						<h2>In Line</h2>
						<div className="data">{this.renderCompany(this.props.company)}</div>
					</div>
					<div className="wait">
						<h2>Wait</h2>
						<div className="data">{this.renderWait(this.props.wait)}</div>
					</div>
				</div>
				<Link className="show-camera btn" to="/scanner">
					Tap to Show Camera
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	company: "Microsoft",
	wait: 31.2,
});

export default connect(mapStateToProps)(StudentMain);