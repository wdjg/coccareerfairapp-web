import React, { Component } from 'react';
import './CompanyProfile.css';

import EditableInfo from '../../components/EditableInfo';

import { getCompany } from '../../redux/actions/companies'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


class CompanyProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			company: {},
			is_editing: false,
			edits: {},
		}
	}

	makeEdit(key, value) {
		const edits = {...this.state.edits, [key]: value};
		this.setState({ edits: edits });
	}

	cancelEdit() {
		this.setState({is_editing: false, edits: {}});
	}

	//TODO should be a fetch call up to the server and update redux with the response
	saveEdits() {
		this.setState({company: Object.assign({}, this.state.company, this.state.edits)})
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		this.props.getCompany(this.props.user.token, params.id).then(res => {
			console.log(this.props.companies);
			console.log(params.id);
			const company = this.props.companies.find(e => e._id === params.id)
			if (company)
				this.setState({company: company});
			else
				this.props.history.push(params.id + '/notfound')
		})
	}

	render() {
		return (
			<div className="CompanyProfile">
				{(!this.state.is_editing && this.props.auth === 'recruiter')
					&& <div className="btn" onClick={() => this.setState({is_editing: true})}>Edit</div>}
				{this.state.is_editing && <div className="edit-buttons">
					<div className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</div>
					<div className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</div>
				</div>}
				<EditableInfo
					edit={this.state.is_editing}
					placeholder="Company Name"
					text={this.state.company.name}
					errorCode={null}
					onChange={e => this.makeEdit('name', e)}>
					<h1 className="name">{this.state.company.name}</h1>
				</EditableInfo>
			</div>
		);
	}
}

//TODO set up company redux
const mapStateToProps = state => ({
	user: state.user,
	companies: state.companies,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getCompany }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);