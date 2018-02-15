import { fromJS } from 'immutable';
import { PUSH_STUDENTS_TO_BATCH, REMOVE_STUDENTS_FROM_BATCH, SET_BATCH } from '../actions';

const initialState = []

const batch = (state = initialState, action) => {
  let immutableState = fromJS(immutableState);
  switch (action.type) {
    case PUSH_STUDENTS_TO_BATCH:
      return immutableState.concat(action.payload.students).toJS();
    case REMOVE_STUDENTS_FROM_BATCH:
      action.payload.students.forEach(student => {
        immutableState = immutableState.remove(immutableState.indexOf(student));
      });
      return immutableState.toJS();
    case SET_BATCH:
      return action.payload.batch;
    default:
      return state;
  }
};

export default batch;
