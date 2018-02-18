import axios from 'axios';

export function getUser(token) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	});
}

export function login(email, password) {
	return axios({
		method: 'post',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/users',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			email: email,
			password: password,
		}
	});
}