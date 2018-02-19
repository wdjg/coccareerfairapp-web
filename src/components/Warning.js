import React, { Component } from 'react';
import './Warning.css';

import {FaExclamationCircle} from 'react-icons/lib/fa';
import SmoothCollapse from 'react-smooth-collapse';

class Warning extends Component {
	render() {
		return (
			<SmoothCollapse expanded={this.props.expanded}>
				<div className="Warning">
					<FaExclamationCircle className="error-icon"/>
	        <span className="warning__text"> {this.props.text}</span>
				</div>
			</SmoothCollapse>
		);
	}
}

export default Warning;