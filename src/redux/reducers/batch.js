import { fromJS } from 'immutable';
import { PUSH_STUDENTS_TO_BATCH, REMOVE_STUDENTS_FROM_BATCH, SET_BATCH, SET_INTERVIEW_STUDENT } from '../actions/batch';

const initialState = {
  students: [],
  interviewStudent: null,
}

const batch = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case PUSH_STUDENTS_TO_BATCH:
      return immutableState.update("students", students => students.concat(action.payload.students)).toJS();
    case REMOVE_STUDENTS_FROM_BATCH:
      action.payload.students.forEach(student => {
        immutableState = immutableState.update("students", students => students.remove(immutableState.indexOf(student)));
      });
      return immutableState.toJS();
    case SET_BATCH:
      return immutableState.set("student", action.payload.students);
    case SET_INTERVIEW_STUDENT:
      return immutableState.set("interviewStudent", action.payload.student)
    default:
      return state;
  }
};

export default batch;
