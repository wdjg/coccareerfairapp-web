import { fromJS } from 'immutable';
import { SET_NAV_CONTENT, SET_NAV_BUTTONS } from '../actions/navbar';

const initialState = {buttons: []};

const navbar = (state = initialState, action) => {
	let immutableState = fromJS(state)
	switch (action.type) {
		case SET_NAV_CONTENT:
			return immutableState.set("content", action.payload.content).toJS();
		case SET_NAV_BUTTONS:
			return immutableState.set("buttons", action.payload.buttons).toJS();
		default:
			return state;
	}
};

export default navbar;