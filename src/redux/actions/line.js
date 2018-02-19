export const SET_LINE_DETAILS = 'SET_LINE_DETAILS';

/**
 * @param  {details}  object containing line details
 * @return {function} reducer action
 */
export const setLineDetails = details => ({
  type: SET_LINE_DETAILS,
  payload: {details: details},
});