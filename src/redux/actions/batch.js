export const PUSH_STUDENTS_TO_BATCH = 'PUSH_STUDENTS_TO_BATCH';
export const REMOVE_STUDENTS_FROM_BATCH = 'REMOVE_STUDENTS_FROM_BATCH';
export const SET_BATCH = 'SET_BATCH';
export const SET_INTERVIEW_STUDENT = 'SET_INTERVIEW_STUDENT';

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
 * @param  {students} array of student objects
 * @return {function} reducer action
 */
export const setInterviewStudent = student => ({
  type: SET_INTERVIEW_STUDENT,
  payload: {student: student},
});

/**
 * @param  {batch}    array of student objects
 * @return {function} reducer action
 */
export const setBatch = batch => ({
  type: SET_BATCH,
  payload: {batch: batch},
});

export const getBatch = token => {

}