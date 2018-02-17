import React, { Component } from 'react';
import classNames from 'classnames';
import './RecruiterProfile.css';

import ErrorInput from '../components/ErrorInput';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import {setUser} from '../redux/actions'
import EditableInfo from '../components/EditableInfo'

class RecruiterProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			edits: {},
		}
	}

	makeEdit(key, value) {
		const edits = {...this.state.edits, [key]: value};
		this.setState({ edits: edits });
	}

	cancelEdit() {
		this.setState({isEditing: false, edits: this.props.user});
	}

	//TODO should be a fetch call up to the server and update redux with the response
	saveEdits() {
		this.props.setUser(this.state.edits);
		this.setState({isEditing: false});
	}
	componentDidMount() {

		this.setState({edits: this.props.user});

	}

	renderInterests(interests) {
		return interests.map((entry, index) =>
			(<div className="interest" key={index}>{entry}</div>)
		);
	}

	renderStudentInfo(user) {
		return null;
	}

	render() {
		return (
			<div className="RecruiterProfile">
				{!this.state.isEditing && <div className="btn" onClick={() => this.setState({isEditing: true})}>Edit</div>}
				{this.state.isEditing && <div className="edit-buttons">
					<div className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</div>
					<div className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</div>
				</div>}
				Name:
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Name"
					text={this.state.edits.name}
					errorCode={null}
					onChange={e => this.makeEdit('name', e)}>
					<h1 className="name">{this.props.user.name}</h1>
				</EditableInfo>
				Company:
				<EditableInfo
						edit={this.state.isEditing}
						placeholder="Company Name"
						text={this.state.edits.company_name}
						errorCode={null}
						onChange={e => this.makeEdit('company_name', e)} >
						<h1 className="entry">{this.props.user.company_name}</h1>
					</EditableInfo>
				Position:
				<EditableInfo
						edit={this.state.isEditing}
						placeholder="Position"
						text={this.state.edits.company_position}
						errorCode={null}
						onChange={e => this.makeEdit('position', e)} >
						<h1 className="entry">{this.props.user.position}</h1>
				</EditableInfo>
			</div>
		);
	}
}


	// <h1 className="name">{this.props.user.name}</h1>
	// <div className="entry">Major: {this.props.user.major}</div>
	// <div className="entry">{this.props.user.gpa}</div>
	// <div className="entry">{this.props.user.year}</div>
	// <div className="entry">{this.renderInterests(this.props.user.interests)}</div>
	// <div className={classNames("foo", {bar: this.state.bool})}>AAAAAAAAAARG</div>
	// <ErrorInput text="hello" show={this.state.bool}/>
				// {this.state.bool && <div className="baz">Hello</div>}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({setUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterProfile);
