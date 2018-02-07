export const SET_USER = 'SET_USER';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

/**
 * @param  {user}    JSON object containing user information
 * @return {function} reducer action
 */
export const setUser = user => ({
  type: SET_USER,
  payload: {user: user},
});

/**
 * @param  {user}    JSON object containing a string auth token
 * @return {function} reducer action
 */
export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  payload: {token: token},
});

export const PUSH_STUDENTS_TO_BATCH = 'PUSH_STUDENTS_TO_BATCH';
export const REMOVE_STUDENTS_FROM_BATCH = 'REMOVE_STUDENTS_FROM_BATCH';
export const SET_BATCH = 'SET_BATCH';

/**
 * @param  {students} array of student objects
 * @return {function} reducer action
 */
export const pushStudentsToBatch = students => ({
  type: PUSH_STUDENTS_TO_BATCH,
  payload: {students: students},
});

/**
 * @param  {students} array of student objects
 * @return {function} reducer action
 */
export const removesStudentFromBatch = students => ({
  type: REMOVE_STUDENTS_FROM_BATCH,
  payload: {students: students},
});

/**
 * @param  {batch}    array of student objects
 * @return {function} reducer action
 */
export const setBatch = batch => ({
  type: SET_BATCH,
  payload: {batch: batch},
});

export const SET_LINE_DETAILS = 'SET_LINE_DETAILS';

/**
 * @param  {details}  object containing line details
 * @return {function} reducer action
 */
export const setLineDetails = details => ({
  type: SET_LINE_DETAILS,
  payload: {details: details},
});


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