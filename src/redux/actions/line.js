import * as LineAPI from '../../api/line';
import * as CompaniesAPI from '../../api/companies';
import { updateCompany } from './companies';

export const SET_LINE_DETAILS = 'SET_LINE_DETAILS';

/**
 * @param  {details}  object containing line details
 * @return {function} reducer action
 */
export const setLineDetails = details => ({
  type: SET_LINE_DETAILS,
  payload: {details: details},
});

export function getLine(token) {
	return dispatch => {
		LineAPI.getLine(token).then(res => {
			dispatch(setLineDetails(res.data));
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