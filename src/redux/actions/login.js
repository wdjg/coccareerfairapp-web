import * as LoginAPI from '../../api/login';
import { setUser, setAuthToken } from './user';

export function sessionLogin() {
	return dispatch => {
		const token = sessionStorage.getItem('jwt');
		console.log(token);
		if (!token) 
			return;

		dispatch(setAuthToken(token));
		LoginAPI.getUser(token).then(res => {
			dispatch(setUser(res.data));
		}).catch(err => console.log(err));
	}
}

export function userLogin(email, password) {
	return dispatch => {
		LoginAPI.login(email, password).then(res => {
			console.log(res);
			sessionStorage.setItem('jwt', res.data.token);
			console.log("token: " + sessionStorage.getItem('jwt'));
			return LoginAPI.getUser(res.token);
		}).then(res => {
			dispatch(setUser(res.data));
			return { success: true };
		}).catch(err => {
			return { 
				success: false,
				err: err,
			}
		});
	}
}