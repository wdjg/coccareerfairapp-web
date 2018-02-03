import React, { Component } from 'react';
import classNames from 'classnames';
import './ErrorInput.css';

import Warning from '../components/Warning';

class ErrorInput extends Component {
	render() {
		return (
			<div className="ErrorInput">
				<Warning text={this.props.errorCode} show={this.props.errorCode}/>
				<input placeholder={this.props.placeholder}
					onChange={e => this.props.onChange(e)}/>
			</div>
		);
	}
}

export default ErrorInput;