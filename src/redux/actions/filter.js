export const SET_FILTER = 'SET_FILTER';
export const SET_FILTER_KEY = 'SET_FILTER_KEY';

/**
 * @param  {companies} array of companies objects
 * @return {function}  reducer action
 */
export const setFilter = filter => ({
  type: SET_FILTER,
  payload: {filter: filter},
});

/**
 * @param  {company}  company object
 * @return {function} reducer action
 */
export const setFilterKey = (key, value) => ({
  type: SET_FILTER_KEY,
  payload: {key: key, value: value},
});