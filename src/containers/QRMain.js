import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react';


export default class QRMain extends Component {
	render() {
		return(
			<QRCode value="http://facebook.github.io/react/" />
		);
	}
}


