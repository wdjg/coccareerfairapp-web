import { fromJS } from 'immutable';
import { SET_LINE_DETAILS } from '../actions';

const initialState = {}

const batch = (state = initialState, action) => {
  state = fromJS(state);
  switch (action.type) {
    case SET_LINE_DETAILS:
      return state.concat(action.payload.details).toJS();
    default:
      return state.toJS();
  }
};

export default batch;
