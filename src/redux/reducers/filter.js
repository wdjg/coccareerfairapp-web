import { fromJS } from 'immutable';
import { SET_FILTER_KEY, SET_FILTER } from '../actions/filter';

const initialState = {}

const filter = (state = initialState, action) => {
	let immutableState = fromJS(state);
	switch (action.type) {
		case SET_FILTER_KEY:
			return immutableState.set(action.payload.key, action.payload.value).toJS()
		case SET_FILTER:
			return fromJS(action.payload.filter);
		default:
			return state;
	}
};

export default filter;