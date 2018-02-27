import { fromJS } from 'immutable';
import { SET_COMPANIES, UPDATE_COMPANY } from '../actions/companies';

const initialState = [{
	url: 'microsoft',
	id: '8675309RICK',
	name: 'Microsoft',
},
{
	url: 'floopametrics',
	id: '31415926535',
	name: 'Floopametrics',
}]

const companies = (state = initialState, action) => {
	let immutableState = fromJS(state);
	switch (action.type) {
		case UPDATE_COMPANY:
			const index = immutableState.findIndex(company => company.id === action.payload.company.id)
			if (index >= 0)
				return immutableState.update(index, company => company.merge(action.payload.company)).toJS();
			else
				return immutableState.push(action.payload.company).toJS();
		case SET_COMPANIES:
			return action.payload.companies;
		default:
			return state;
	}
};

export default companies;
