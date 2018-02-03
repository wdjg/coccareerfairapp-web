import React, { Component } from 'react';
import classNames from 'classnames';
import './Warning.css';

import {MdError} from 'react-icons/lib/md';

class Warning extends Component {
	render() {
		return (
			<div className={classNames("Warning", {show: this.props.show})}>
				<MdError className="error-icon"/>
        <span className="warning__text"> {this.props.text}</span>
			</div>
		);
	}
}

export default Warning;