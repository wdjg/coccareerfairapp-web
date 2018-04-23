import React, { Component } from 'react';
import './CompanyProfile.css';

import EditableInfo from '../../components/EditableInfo';

import { getCompany } from '../../redux/actions/companies';
import { setNavButtons } from '../../redux/actions/navbar';
import { userLogout } from '../../redux/actions/login';
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

	startEdit() {
		this.setState({ is_editing: true });
		this.props.setNavButtons([
			{ onClick: () => this.props.userLogout(), content: "Login" },
			{ onClick: () => this.makeEdit(), content: "Save" },
			{ onClick: () => this.cancelEdit(), content: "Cancel" },
			// {onClick: () => this.setState({ is_editing: true }), icon: "icon-edit"},
		]);
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
		if (this.props.user.user_type === 'recruiter')
			this.props.setNavButtons([
				{onClick: () => this.props.userLogout(), content: "Login"},
				{onClick: () => this.startEdit(), content: "Edit"},
				// {onClick: () => this.setState({ is_editing: true }), icon: "icon-edit"},
			]);
		const { match: { params } } = this.props;
		this.props.getCompany(this.props.user.token, params.id).then(res => {
			const company = this.props.companies.find(e => e._id === params.id)
			if (company)
				this.setState({company: company});
			else
				this.props.history.push(params.id + '/notfound')
		})
	}

	componentWillUnmount() {
		if (this.props.user.user_type === 'recruiter')
			this.props.setNavButtons([
				{onClick: () => this.props.userLogout(), content: "Login"},
			])
	}

	render() {
		return (
			<div className="CompanyProfile">
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
	bindActionCreators({ getCompany, setNavButtons, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);