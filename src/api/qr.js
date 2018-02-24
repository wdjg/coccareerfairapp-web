import axios from 'axios';

export function getQRCode(token, id) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/employers/' + id + '/qr',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	})
}

export function getCompanyFromQR(token, qrValue) {
	return axios({
		method: 'post',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/employers/qr',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		data: {
			value: qrValue
		}
	})
}