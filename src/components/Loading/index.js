import React, { Component } from 'react';
import classNames from 'classnames';

import './Loading.css';

class Loading extends Component {
	render() {
		return (
			<div {...this.props} className={classNames("Loading", this.props.className)}>
		    <div className="double-bounce1"></div>
		    <div className="double-bounce2"></div>
			</div>
		);
	}
}

export default Loading;