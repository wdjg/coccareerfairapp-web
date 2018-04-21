import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

import './QRDisplay.css'
import * as QRAPI from '../../api/qr';
import * as Auth from '../auth.js';

class QRDisplay extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: ''
		}
	}

	componentDidMount() {
		QRAPI.getQRCode(this.props.user.token, this.props.user.employer_id).then(res => {
			this.setState({ code: res.data.qr_code_value })
		})
	}

	render() {
		return(
			<div className="QRDisplay">
				<div className="code-container">
					<div className="code"><QRCode value={this.state.code} size={260} /></div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	user: state.user,
});

export default Auth.userIsAuth(Auth.userIsRecruiter(connect(mapStateToProps)(QRDisplay)));
