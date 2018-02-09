import React, { Component } from 'react';
import './ErrorInput.css';

import Warning from '../components/Warning';

class ErrorInput extends Component {
	render() {
		return (
			<div className="ErrorInput">
				<Warning text={this.props.errorCode} show={this.props.errorCode}/>
				<input 
					placeholder={this.props.placeholder}
					value={this.props.text}
					onChange={e => this.props.onChange(e.target.value)}/>
			</div>
		);
	}
}

export default ErrorInput;