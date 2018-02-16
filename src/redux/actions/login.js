import * as LoginAPI from '../../api/login';
import { setUser, setAuthToken } from './user';

export function sessionLogin() {
	return dispatch => {
		const token = sessionStorage.getItem('jwt');
		if (!token) 
			return;

		dispatch(setAuthToken(token));
		LoginAPI.getUser(token).then(user => {
			dispatch(setUser(user));
		}).catch(err => console.log(err));
	}
}

export function userLogin(email, password) {
	return dispatch => {
		LoginAPI.login(email, password).then(res => {
			sessionStorage.setItem('jwt', res.token);
			return LoginAPI.getUser(res.token);
		}).then(user => {
			dispatch(setUser(user));
		}).catch(err => console.log(err));
	}
}