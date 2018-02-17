import { fromJS } from 'immutable';
import { SET_USER, SET_AUTH_TOKEN } from '../actions/user';

const initialState = {
	name: "Wiqas Nassar",
	major: "Computer Science",
	gpa: "3.5",
	year: "Freshman",
	interests: ["IoT", "Consulting", "UX"],
	threads: ["People", "Media"],
	graduation_date: null,
	looking_for: "Internship",
  authorized: "no",
}

const user = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case SET_USER:
      return immutableState.merge(action.payload.user).toJS();
    case SET_AUTH_TOKEN:
      return immutableState.set("token", action.payload.token).toJS();
    default:
      return state;
  }
};

export default user;
