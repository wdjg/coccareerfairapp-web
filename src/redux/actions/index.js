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
