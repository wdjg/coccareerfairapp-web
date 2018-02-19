import * as UserAPI from '../../api/user';
import { setUser, setAuthToken } from './user';

export function sessionLogin() {
	return dispatch => {
		const token = sessionStorage.getItem('jwt');
		if (!token) 
			return;

		dispatch(setAuthToken(token));
		UserAPI.getUser(token).then(res => {
			dispatch(setUser(res.data));
		}).catch(err => console.log(err));
	}
}

export function userLogin(email, password) {
	return dispatch => {
		return UserAPI.login({email: email, password: password}).then(res => {
			const token = res.data.token
			sessionStorage.setItem('jwt', token);
			dispatch(setAuthToken(token));
			return UserAPI.getUser(token);
		});
	}
}

export function userLogout() {
	return dispatch => {
		sessionStorage.removeItem('jwt');
		dispatch(setUser({}));
	}
}