import axios from 'axios';

export function getUser(token) {
	return axios({
		method: 'get',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/users/auth',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		}
	});
}

export function login({email, password}) {
	return axios({
		method: 'post',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/login',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			email: email,
			password: password,
		}
	});
}

export function register({name, email, password, modifiers}) {
	return axios({
		method: 'post',
		url: 'https://coccareerfairapp-development.herokuapp.com/api/register',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			name: name,
			email: email,
			password: password,
			...modifiers
		}
	});
}

