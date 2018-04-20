import * as CompaniesAPI from '../../api/companies';
import * as LineAPI from '../../api/line';

export const SET_COMPANIES = 'SET_COMPANIES';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';

/**
 * @param  {companies} array of companies objects
 * @return {function}  reducer action
 */
export const setCompanies = companies => ({
  type: SET_COMPANIES,
  payload: {companies: companies},
});

/**
 * @param  {company}  company object
 * @return {function} reducer action
 */
export const updateCompany = company => ({
  type: UPDATE_COMPANY,
  payload: {company: company},
});

export function getCompanies(token) {
	return dispatch => {
		return CompaniesAPI.getAllCompanies(token).then(res => {
			if (token) {
				let promises = []
				res.data.employers.forEach(employer => {
					promises.push(LineAPI.getLineStats(token, employer._id).then(res => {
						return {...employer, line_stats: res.data};
					}).catch(err => console.log(err)));
				});
				Promise.all(promises).then(employers => {
					dispatch(setCompanies(employers));
				});
			} else {
				dispatch(setCompanies(res.data.employers));
			}
		});
	}
}

export function getCompany(token, employer_id) {
	return dispatch => {
		return CompaniesAPI.getCompany(token, employer_id).then(res => {
			dispatch(updateCompany(res.data));
			return Promise.resolve(res.data);
		});
	}
}