import { fromJS } from 'immutable';
import { SET_USER, SET_AUTH_TOKEN } from '../actions';

const initialState = {
	name: "Floopy",
	major: "Doopanomics",
	gpa: 3.5,
	year: "Freshman",
	interests: ["Blarg", "Honk", "Floop"],
	threads: ['Schnops', 'Blip'],
	graduation_date: "2",
	looking_for: "Internship",
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
