import React, { Component } from 'react';
import classNames from 'classnames';

public class Button extends Component {
	render() {
		return (
			<div className={classNames("btn", this.props.className)} onClick={this.props.onClick}>
			  {this.props.children}
			</div>
		);
	}
}