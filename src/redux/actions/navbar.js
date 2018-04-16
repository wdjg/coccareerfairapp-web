export const SET_NAV_CONTENT = 'SET_NAV_CONTENT';

/**
 * @param  {companies} array of companies objects
 * @return {function}  reducer action
 */
export const setNavContent = content => ({
  type: SET_NAV_CONTENT,
  payload: {content: content},
});