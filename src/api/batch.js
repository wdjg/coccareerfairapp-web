import axios from 'axios';

export function getBatch(token, employer_id) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/users?employer_id=' + employer_id,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	})
}