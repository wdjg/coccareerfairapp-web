import * as UserAPI from '../../api/user';
import { setAuthToken } from './user';

export function studentRegister(name, email, password) {
	return dispatch => {
		return UserAPI.register({
			name: name,
			email: email,
			password: password
		}).then(res => {
			const token = res.data.token
			sessionStorage.setItem('jwt', token);
			dispatch(setAuthToken(token));
			return UserAPI.getUser(token);
		});
	}
}

export function recruiterRegister(name, email, password, code) {
	return dispatch => {
		return UserAPI.register({
			name: name,
			email: email,
			password: password,
			modifiers: {
				employer_id: code,
				user_type: 'recruiter',
			}
		}).then(res => {
			const token = res.data.token
			sessionStorage.setItem('jwt', token);
			return UserAPI.getUser(token);
		})
	}
}