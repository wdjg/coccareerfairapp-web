import * as LineAPI from '../../api/line';
import * as CompaniesAPI from '../../api/companies';
import { updateCompany } from './companies';

export const UPDATE_LINE_DETAILS = 'SET_LINE_DETAILS';

/**
 * @param  {details}  object containing line details
 * @return {function} reducer action
 */
export const updateLineDetails = details => ({
  type: UPDATE_LINE_DETAILS,
  payload: {details: details},
});

export function getLine(token) {
	return dispatch => {
		LineAPI.getLine(token).then(res => {
			dispatch(updateLineDetails(res.data));
			dispatch(getLineStats(token, res.data.employer_id));
			return CompaniesAPI.getCompany(token, res.data.employer_id).then(res => {
				if (!res.data)
					throw "Company doesn't exist (this is probably because you reset the company id after you joined the line)";
				dispatch(updateCompany(res.data));
			});
		}).catch(err => {
			console.log(err);
		});
	}
}

export function getLineStats(token, employer_id) {
	return dispatch => {
		LineAPI.getLineStats(token, employer_id).then(res => {
			dispatch(updateLineDetails(res.data));
		}).catch(err => {
			console.log(err);
		});
	}
}

export function joinLine(token, employer_id) {
	return dispatch => {
		return LineAPI.joinLine(token, employer_id).then(res => {
			dispatch(updateLineDetails(res.data));
			dispatch(getLineStats(token));
			return new Promise(res);
		});
	}
}

export function setStudentLineStatus(token, line_id, status) {
	return dispatch => {
		return LineAPI.setStudentLineStatus(token, line_id, status).then(res => {
			dispatch(updateLineDetails(res.data));
			return new Promise(res);
		})
	}
}

export function setLineStatus(token, line_id, status) {
	return dispatch => {
		return LineAPI.setLineStatus(token, line_id, status).then(res => {
			dispatch(updateLineDetails(res.data));
			// dispatch(getLineStats(token));
			return new Promise(res);
		});
	}
}