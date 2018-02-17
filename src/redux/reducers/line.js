import { fromJS } from 'immutable';
import { SET_LINE_DETAILS } from '../actions';

const initialState = {}

const batch = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case SET_LINE_DETAILS:
      return immutableState.merge(action.payload.details).toJS();
    default:
      return state;
  }
};

export default batch;
