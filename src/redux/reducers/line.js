import { fromJS } from 'immutable';
import { UPDATE_LINE_DETAILS, SET_LINE_DETAILS } from '../actions/line';

const initialState = {
}

const batch = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case UPDATE_LINE_DETAILS:
      return immutableState.merge(action.payload.details).toJS();
    case SET_LINE_DETAILS:
      return action.payload.details;
    default:
      return state;
  }
};

export default batch;
