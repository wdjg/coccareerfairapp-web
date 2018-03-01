import React, { Component } from 'react';
import './RecruiterProfile.css';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { updateUser } from '../../redux/actions/user'

import EditableInfo from '../../components/EditableInfo';
import Button from '../../components/Button';

class RecruiterProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			is_editing: false,
			edits: {},
		}
	}

	makeEdit(key, value) {
		const edits = {...this.state.edits, [key]: value};
		this.setState({ edits: edits });
	}

	cancelEdit() {
		this.setState({is_editing: false, edits: this.props.user});
	}

	//TODO should be a fetch call up to the server and update redux with the response
	saveEdits() {
		this.props.updateUser(this.state.edits);
		this.setState({is_editing: false});
	}
	componentDidMount() {
		this.setState({edits: this.props.user});
	}

	render() {
		return (
			<div className="RecruiterProfile">
				{!this.state.is_editing && <Button className="btn" onClick={() => this.setState({is_editing: true})}>Edit</Button>}
				{this.state.is_editing && <div className="edit-buttons">
					<Button className="edit-buttons__save btn" onClick={() => this.saveEdits()}>Save</Button>
					<Button className="edit-buttons__cancel btn" onClick={() => this.cancelEdit()}>Cancel</Button>
				</div>}
				<EditableInfo
					edit={this.state.is_editing}
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
					edit={this.state.is_editing}
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
	bindActionCreators({updateUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterProfile);
