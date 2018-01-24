import { fromJS } from 'immutable';
import { PUSH_STUDENTS_TO_BATCH, REMOVE_STUDENTS_FROM_BATCH, SET_BATCH } from '../actions';

const initialState = []

const batch = (state = initialState, action) => {
  state = fromJS(state);
  switch (action.type) {
    case PUSH_STUDENTS_TO_BATCH:
      return state.concat(action.payload.students).toJS();
    case REMOVE_STUDENTS_FROM_BATCH:
      action.payload.students.forEach(student => {
        state = state.remove(state.indexOf(student));
      });
      return state.toJS();
    case SET_BATCH:
      return action.payload.batch;
    default:
      return state.toJS();
  }
};

export default batch;
