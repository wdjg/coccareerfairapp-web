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