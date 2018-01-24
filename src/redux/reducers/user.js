import { fromJS } from 'immutable';
import { SET_USER, SET_AUTH_TOKEN } from '../actions';

const initialState = {
  
}

const user = (state = initialState, action) => {
  state = fromJS(state);
  switch (action.type) {
    case SET_USER:
      return state.merge(action.payload.user).toJS();
    case SET_AUTH_TOKEN:
      return state.set("token", action.payload.token).toJS();
    default:
      return state.toJS();
  }
};

export default user;
