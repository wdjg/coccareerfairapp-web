import React, { Component } from 'react';
import './StudentProfile.css';

import ErrorInput from '../components/ErrorInput';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../redux/actions';

import EditableInfo from '../components/EditableInfo';

class StudentProfile extends Component {

	constructor() {
		super()
		this.state = {
			isEditing: false,
			edits: {},
		}
	}

	componentDidMount() {
		this.setState({edits: this.props.user});
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

	handleChange(key, tags) {
		const edits = {...this.state.edits, [key]: tags};
		this.setState({ edits: edits });
	}

	isCSMajor(user) {
		return user.major === "Computer Science";
	}

	renderInterests(interests) {
		return interests.map((entry, index) => {
			return (<div key={index} className="interest">{entry}</div>)
		})
	}

	renderThreads(threads) {
		return threads.map((entry, index) => {
			return (<div key={index} className="thread">{entry}</div>)
		})
	}

	hasItem(user, key) {
		return user[key] && user[key] !== '';
	}

	isAuthorizedUser(user) {
		return user.authorized == "yes";
	}

	render() {
		return (
			<div className="Student">
				{!this.state.isEditing && <div className="btn" onClick={() => this.setState({isEditing: true})}>Edit</div>}
				{this.state.isEditing && <div className="edit-buttons">
					<div className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</div>
					<div className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</div>
				</div>}
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Name"
					text={this.state.edits.name}
					errorCode={null}
					onChange={e => this.makeEdit('name', e)}>
					<h1 className="name">{this.props.user.name}</h1>
				</EditableInfo>

				<h1>Major: </h1>
				<div className="entry">{this.props.user.major}</div>
				
				<h1>Threads: </h1>
				{this.isCSMajor(this.props.user) && 
					<div className="threads">{this.renderThreads(this.props.user.threads)}</div>}
				{this.isAuthorizedUser(this.props.user) &&
					<div>
						{this.hasItem(this.props.user, 'gpa') && <h1>GPA: </h1>}
						<EditableInfo
							edit={this.state.isEditing}
							placeholder="GPA"
							text={this.state.edits.gpa}
							errorCode={null}
							onChange={e => this.makeEdit('gpa', e)} >
							<div className="entry">{this.props.user.gpa}</div>
						</EditableInfo>
						
						{this.hasItem(this.props.user, 'graduation_date') && <h1>Expected Graduation Date: </h1>}
						<EditableInfo
							edit={this.state.isEditing}
							placeholder="Graduation Date"
							text={this.state.edits.graduation_date}
							errorCode={null}
							onChange={e => this.makeEdit('graduation_date', e)} >
							<div className="entry">{this.props.user.graduation_date}</div>
						</EditableInfo>

						{this.hasItem(this.props.user, 'looking_for') && <h1>Looking For: </h1>}
						<EditableInfo
							edit={this.state.isEditing}
							placeholder="Looking For"
							text={this.state.edits.looking_for}
							errorCode={null}
							onChange={e => this.makeEdit('looking_for', e)} >
							<div className="entry">{this.props.user.looking_for}</div>
						</EditableInfo>

						{this.hasItem(this.props.user, 'interests') && <h1>Interests: </h1>}
						<div>
							{!this.state.isEditing && <div className="interests">{this.renderInterests(this.props.user.interests)}</div>} 
							{this.state.isEditing && <TagsInput className="entry" value={this.state.edits.interests} onChange={e => this.handleChange('interests', e)}/>}
						</div>
					</div>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);