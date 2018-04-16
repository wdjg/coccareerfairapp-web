export const SET_FILTER = 'SET_FILTER';
export const SET_FILTER_KEY = 'SET_FILTER_KEY';

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: {filter: filter},
});

export const setFilterKey = (key, value) => ({
  type: SET_FILTER_KEY,
  payload: {key: key, value: value},
});