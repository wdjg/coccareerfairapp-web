import React, { Component } from 'react';
import './EditableInfo.css';

import ErrorInput from '../components/ErrorInput';

class EditableInfo extends Component {
	render() {
		console.log(this.props)
		return (
			<div className="EditableInfo">
				{!this.props.edit && <div className="EditableInfo__text">{this.props.children}</div>}
				{this.props.edit && <ErrorInput 
					placeholder={this.props.placeholder}
					text={this.props.text}
					errorCode={this.props.errorCode}
					onChange={e => this.props.onChange(e)}/>}
			</div>
		);
	}
}

export default EditableInfo;