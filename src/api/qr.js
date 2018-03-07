import axios from 'axios';

export function getQRCode(token, employer_id) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/qr?employer_id=' + employer_id,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	})
}

export function getCompanyFromQR(token, qr_value) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/employers/qr?qr_code_value=' + qr_value,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
	})
}