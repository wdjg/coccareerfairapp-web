import React from 'react';
import classNames from 'classnames';

import SmoothCollapse from 'react-smooth-collapse';

import './Modal.css'

export default class Modal extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	gone: true,
	  	show: false,
	  }
	  this.timeout = null
	}

	componentDidMount() {
	  if (this.props.show)
	    this.timeout = setTimeout(() => this.setState({ show: true }), 500);
	}

	componentWillReceiveProps(next) {
		if (next.show) {
			if (next.show !== this.props.show) {
				clearTimeout(this.timeout);
				this.setState({ gone: false, show: false });
				this.timeout = setTimeout(() => this.setState({ show: true }), 100);
			} else {
				this.setState({ gone: false });
				this.timeout = setTimeout(() => this.setState({ show: true }), 100);
			}
		} else if (next.show !== this.props.show) {
			clearTimeout(this.timeout);
	    this.setState({ show: false, gone: false });
			this.timeout = setTimeout(() => this.setState({ gone: true }), 500);
		}
	}

	render() {
		const speed = this.props.speed ? this.props.speed : '0.5s';
		const ease = this.props.ease ? this.props.ease : 'cubic-bezier(.6,.05,.19,.97)';
		return this.state.gone ? null : (
			<div
				className={classNames("Modal", this.props.className, {show: this.state.show})}
				style={{transition: 'opacity ' + speed + ' ' + ease}}>
				{this.props.shade && <div className="Modal__shade" onClick={this.props.closeModal}></div>}
				<SmoothCollapse
					expanded={this.state.show}
					heightTransition="0.3s cubic-bezier(.46,.02,.04,.99)"
					className="Modal__content">
					{this.props.children}
				</SmoothCollapse>	
			</div>);
	}
}