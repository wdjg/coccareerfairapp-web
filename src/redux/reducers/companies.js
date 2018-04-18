import { fromJS } from 'immutable';
import { SET_COMPANIES, UPDATE_COMPANY } from '../actions/companies';

const initialState = []

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function get_random_color() {
    var h = rand(1, 360);
    var s = rand(70, 90);
    var l = rand(60, 80);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

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
			return action.payload.companies.map(company => ({...company, color: get_random_color()}));
		default:
			return state;
	}
};

export default companies;
