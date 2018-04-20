import React from 'react';
import classNames from 'classnames';

import SmoothCollapse from 'react-smooth-collapse';

import './Modal.css'

export default class Modal extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	gone: Boolean(!this.props.startVisisble),
	    show: false,
	  }
	}

	componentDidMount() {
	  if (this.props.show)
	    setTimeout(() => this.setState({ show: true }), 300);
	}

	componentWillReceiveProps(next) {
		if (next.show) {
			this.setState({ gone: false });
	    setTimeout(() => this.setState({ show: true }), 300);
		} else if (next.show !== this.props.show) {
	    this.setState({ show: false });
			setTimeout(() => this.setState({ gone: true }), 2000);
		}
	}

	render() {
    const speed = this.props.speed ? this.props.speed : '0.75s'
    const ease = this.props.ease ? this.props.ease : 'cubic-bezier(.6,.05,.19,.97)'
		return this.state.gone ? null :
			(<div
					className={classNames("Modal", this.props.className, {show: this.state.show})}
					style={{transition: 'opacity ' + speed + ' ' + ease}}>
				{this.props.shade && <div className="Modal__shade" onClick={this.props.closeModal}></div>}
				<SmoothCollapse className="Modal__content" expanded={this.state.show}>
					{this.props.children}
				</SmoothCollapse>	
 			</div>);
	}
}