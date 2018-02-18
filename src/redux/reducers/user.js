import { fromJS } from 'immutable';
import { SET_USER, SET_AUTH_TOKEN, UPDATE_USER } from '../actions/user';

const initialState = {
	name: "Wiqas Nassar",
	major: "Computer Science",
	gpa: "3.5",
	interests: ["IoT", "Consulting", "UX"],
	threads: ["People", "Media"],
	graduation_date: "May 2019",
	looking_for: "",
  authorized: "yes",
  "company_name": "Floopanomics",
  "position": "Software Engineer",
}

const user = (state = initialState, action) => {
  let immutableState = fromJS(state);
  switch (action.type) {
    case SET_USER:
      return action.payload.user;
    case UPDATE_USER:
      return immutableState.merge(action.payload.user).toJS();
    case SET_AUTH_TOKEN:
      return immutableState.set("token", action.payload.token).toJS();
    default:
      return state;
  }
};

export default user;
