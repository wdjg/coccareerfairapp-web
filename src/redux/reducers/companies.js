import { fromJS } from 'immutable';
import { SET_COMPANIES, UPDATE_COMPANY } from '../actions';

const initialState = [{
	url: 'microsoft',
	id: '8675309RICK',
	name: 'Microsoft',
}]

const companies = (state = initialState, action) => {
	let immutableState = fromJS(state);
	switch (action.type) {
		case UPDATE_COMPANY:
			return immutableState.update(immutableState.findIndex(company => company.id === action.payload.company.id), company => company.merge(action.payload.company)).toJS();
		case SET_COMPANIES:
			return action.payload.companies;
		default:
			return state;
	}
};

export default companies;
