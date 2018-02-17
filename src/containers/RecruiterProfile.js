import React, { Component } from 'react';
import './RecruiterProfile.css';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { setUser } from '../redux/actions/user'

import EditableInfo from '../components/EditableInfo';
import Button from '../components/Button';

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

	render() {
		return (
			<div className="RecruiterProfile">
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
				<h2>Company:</h2>
				{this.props.user.company_name}
				<h2>Position:</h2>
				<EditableInfo
					edit={this.state.isEditing}
					placeholder="Position"
					text={this.state.edits.position}
					errorCode={null}
					onChange={e => this.makeEdit('position', e)} >
					{this.props.user.position}
				</EditableInfo>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({setUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterProfile);
