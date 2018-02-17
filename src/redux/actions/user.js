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