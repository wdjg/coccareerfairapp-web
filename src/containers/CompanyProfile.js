import React, { Component } from 'react';
import classNames from 'classnames';
import './CompanyProfile.css';

import EditableInfo from '../components/EditableInfo';

import { connect } from 'react-redux'


class CompanyProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			company: {},
			isEditing: false,
			edits: {},
		}
	}

	makeEdit(key, value) {
		const edits = {...this.state.edits, [key]: value};
		this.setState({ edits: edits });
	}

	cancelEdit() {
		this.setState({isEditing: false, edits: {}});
	}

	//TODO should be a fetch call up to the server and update redux with the response
	saveEdits() {

	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const company = this.props.companies.find(e => e.url === params.id)
		if (company)
			this.setState({company: company});
		else
			this.props.history.push('notfound')
	}

	render() {
		return (
			<div className="CompanyProfile">
				{!this.state.isEditing && <div className="btn" onClick={() => this.setState({isEditing: true})}>Edit</div>}
				{this.state.isEditing && <div className="edit-buttons">
					<div className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</div>
					<div className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</div>
				</div>}
				<EditableInfo
					edit={this.state.isEditing}
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

export default connect(mapStateToProps)(CompanyProfile);