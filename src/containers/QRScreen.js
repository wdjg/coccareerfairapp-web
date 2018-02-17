import React, { Component } from 'react';
import QRCode from 'qrcode.react'
import axios from 'axios'
export default class QRScreen extends Component {

    constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

    componentDidMount() {
        axios({
            method: 'post',
            url:'https://coccareerfairapp-development.herokuapp.com/api',
            data: {"email": "test1@gmail.com", "password": "test"},
            headers: {'Content-Type': 'application/json'},
        })
        .then(res =>{
            this.setState({value: res});
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
		return (
			<div className="QRScreen">
            <QRCode value={this.state.value} />
            <div>QR Code</div>
			</div>
		);
	}
}
