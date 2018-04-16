import { fromJS } from 'immutable';
import { SET_NAV_CONTENT } from '../actions/navbar';

const initialState = null;

const navbar = (state = initialState, action) => {
	switch (action.type) {
		case SET_NAV_CONTENT:
			return action.payload.content
		default:
			return state;
	}
};

export default navbar;