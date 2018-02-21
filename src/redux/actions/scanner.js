export const SET_SCANNER_VISIBILITY = "SET_SCANNER_VISIBILITY";

/**
 * @param  {details}  boolean denoting desired visibility of scanner
 * @return {function} reducer action
 */
export const setScannerVisibility = visible => ({
  type: SET_SCANNER_VISIBILITY,
  payload: {visible: visible},
});