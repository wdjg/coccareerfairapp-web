import axios from 'axios';

export function getLine(token) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	})
}

export function getLineStats(employer_id) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/stats?employer_id=' + employer_id,
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

// export function getUserLineStats(token) {
// 	return axios({
// 		method: 'get',
// 		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/stats',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Authorization': 'Bearer ' + token,
// 		}
// 	})
// }

export function joinLine(token, employer_id) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/stats',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		data: {
			employer_id: employer_id,
		}
	})
}

export function setLineStatus(token, line_id, status) {
	return axios({
		method: 'patch',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/' + line_id + 'status',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		data: {
			status: status,
		}
	})
}

export function recruiterSetLineStatus(token, line_id, status) {
	return axios({
		method: 'patch',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/lines/' + line_id + 'status',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		data: {
			status: status,
		}
	})
}