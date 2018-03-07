import * as QRAPI from '../../api/qr';
import * as CompaniesAPI from '../../api/companies';
import { updateCompany } from './companies';

export function getCompanyFromQR(token, qr_data) {
	return dispatch => {
		QRAPI.getCompanyFromQR(token, qr_data).then(res => {
			return CompaniesAPI.getCompany(token, res.data.employer_id).then(res => {
				dispatch(updateCompany(res.data));
				return Promise.resolve(res);
			});
		}).catch(err => {
			console.log(err);
		});
	}
}