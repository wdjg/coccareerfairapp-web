import * as CompaniesAPI from '../../api/companies';

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
			dispatch(setCompanies(res.data.employers));
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