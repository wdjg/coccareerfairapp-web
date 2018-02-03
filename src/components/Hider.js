import React, { Component } from 'react';
import classNames from 'classnames';
import './Hider.css';


class Hider extends Component {

	render() {
		const hiderStyle = {
			'maxHeight': this.props.hide ? 0 : this.props.height,
			opacity: this.props.hide ? 0 : 1,
		}
		return (
			<div className="Hider" style={hiderStyle}>
				{this.props.children}
			</div>
		);
	}
}

export default Hider;