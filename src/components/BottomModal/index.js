import React, { Component } from 'react';
import classNames from 'classnames';
import './BottomModal.css';

class BottomModal extends Component {
	render() {
		return (
			<div className={classNames("BottomModal", {show: this.props.show}, this.props.className)}>
				<div className="shadow" onClick={this.props.closeModal}></div>
				<div className="content">{this.props.children}</div>
			</div>
		);
	}
}

export default BottomModal;