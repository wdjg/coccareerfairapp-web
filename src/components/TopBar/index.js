import React, { Component } from 'react';
import './TopBar.css';
// import { Menu, Dropdown, Button, Icon } from 'antd';
import MenuIcon from '../../resources/burger-title.svg';

class TopBar extends Component {

	renderButtons(buttons) {
		return buttons.map((button, index) => (
			<div key={index} className="TopBar__button" onClick={button.onClick}>
				{button.content}
			</div>
		));
	}

	render() {
		return (
			<nav className="TopBar">
				<div className="TopBar__item left" onClick={this.props.onBurgerClick}>
					<img className="burger" src={MenuIcon} alt="menu"/>
				</div>
				<div className="TopBar__item title">{this.props.title}</div>
				<div className="TopBar__item right">
					{this.renderButtons(this.props.buttons)}
				</div>
		  </nav>
		)
	}
}

export default TopBar;