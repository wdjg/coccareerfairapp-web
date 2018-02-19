import React, { Component } from 'react';
import classNames from 'classnames';

import './Button.css';

class Button extends Component {
	render() {
		return (
			<button {...this.props} className={classNames("Button", this.props.className)}>
			  {this.props.children}
			</button>
		);
	}
}

export default Button;