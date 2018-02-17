export const TOGGLE_CAMERA = 'TOGGLE_CAMERA';

/**
 * @param  {students} array of student objects
 * @return {function} reducer action
 */
export const pushStudentsToBatch = students => ({
  type: TOGGLE_CAMERA,
  payload: {students: students},
});