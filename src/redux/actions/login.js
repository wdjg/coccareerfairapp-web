import * as UserAPI from '../../api/user';
// import * as CompaniesAPI from '../../api/companies';
import { updateUser, setUser, setAuthToken } from './user';
import { routerActions } from 'react-router-redux';

export function sessionLogin() {
	return dispatch => {
		const token = sessionStorage.getItem('jwt');
		if (!token) 
			return;

		dispatch(setAuthToken(token));
		UserAPI.getUser(token).then(res => {
			return dispatch(updateUser(res.data));
		}).catch(err => console.log(err));
	}
}

export function studentLogin(email, password) {
	return dispatch => {
		return UserAPI.login({email: email, password: password}).then(res => {
			const token = res.data.token
			sessionStorage.setItem('jwt', token);
			dispatch(setAuthToken(token));
			return UserAPI.getUser(token);
		});
	}
}

export function recruiterLogin(email, password) {
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
		dispatch(routerActions.replace('/'))
	}
}