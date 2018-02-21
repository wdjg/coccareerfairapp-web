import { fromJS } from 'immutable';
import { SET_SCANNER_VISIBILITY } from '../actions/scanner';

const initialState = {}

const scanner = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case SET_SCANNER_VISIBILITY:
      return immutableState.set("visible", action.payload.visible).toJS();
    default:
      return state;
  }
};

export default scanner;
