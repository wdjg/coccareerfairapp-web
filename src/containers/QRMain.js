import React, { Component } from 'react';
import QRCode from 'qrcode-react';
import axios from 'axios';
import { connect } from 'react-redux';


class QRMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: ''
		}
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: 'https://coccareerfairapp-development.herokuapp.com/api/employers/' + this.props.user.employer_id + '/qr',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.user.token,
			}
		}).then(res => {
			console.log(res.data);
			this.setState({ code: res.data.qr_code_value })
		})
	}

	render() {
		return(
			<QRCode value={this.state.code} />
		);
	}
}
const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps)(QRMain);