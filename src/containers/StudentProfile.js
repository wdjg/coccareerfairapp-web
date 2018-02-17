import React, { Component } from 'react';
import './StudentProfile.css';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../redux/actions/user';

import EditableInfo from '../components/EditableInfo';
import Button from '../components/Button';

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
		return user.authorized === "yes";
	}

	render() {
		return (
			<div className="Student">
				{!this.state.isEditing && <Button className="btn" onClick={() => this.setState({isEditing: true})}>Edit</Button>}
				{this.state.isEditing && <div className="edit-buttons">
					<Button className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</Button>
					<Button className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</Button>
				</div>}
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Name"
					text={this.state.edits.name}
					errorCode={null}
					onChange={e => this.makeEdit('name', e)}>
					<h1 className="name">{this.props.user.name}</h1>
				</EditableInfo>

				<h2>Major: </h2>
				<div className="entry">{this.props.user.major}</div>
				
				<h2>Threads: </h2>
				{this.isCSMajor(this.props.user) && 
					<div className="threads">{this.renderThreads(this.props.user.threads)}</div>}
				{(this.hasItem(this.props.user, 'gpa') || this.isAuthorizedUser(this.props.user)) && <h2>GPA: </h2>}
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="GPA"
					text={this.state.edits.gpa}
					errorCode={null}
					onChange={e => this.makeEdit('gpa', e)} >
					<div className="entry">{this.props.user.gpa}</div>
				</EditableInfo>
				
				{(this.hasItem(this.props.user, 'graduation_date') || this.isAuthorizedUser(this.props.user) )&& <h2>Expected Graduation Date: </h2>}
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Graduation Date"
					text={this.state.edits.graduation_date}
					errorCode={null}
					onChange={e => this.makeEdit('graduation_date', e)} >
					<div className="entry">{this.props.user.graduation_date}</div>
				</EditableInfo>

				{(this.hasItem(this.props.user, 'looking_for') || this.isAuthorizedUser(this.props.user)) && <h2>Looking For: </h2>}
				{(!this.hasItem(this.props.user, 'looking_for') && this.isAuthorizedUser(this.props.user))
					&& <div className="placeholder">Not Provided</div>}
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Looking For"
					text={this.state.edits.looking_for}
					errorCode={null}
					onChange={e => this.makeEdit('looking_for', e)} >
					<div className="entry">{this.props.user.looking_for}</div>
				</EditableInfo>

				{(this.hasItem(this.props.user, 'interests') || this.isAuthorizedUser(this.props.user)) && <h2>Interests: </h2>}
				<div>
					{!this.state.isEditing && <div className="interests">{this.renderInterests(this.props.user.interests)}</div>} 
					{this.state.isEditing && <TagsInput className="entry" value={this.state.edits.interests} onChange={e => this.handleChange('interests', e)}/>}
				</div>
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