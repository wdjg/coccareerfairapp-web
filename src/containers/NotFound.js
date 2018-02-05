import React, { Component } from 'react';
import './NotFound.css';


class NotFound extends Component {

	render() {
		const images = ['https://i.imgur.com/8srChE2.gif', 'https://i.redd.it/uwvjph19mltz.jpg', 'https://i.imgur.com/lWAYMnS.gif'];
		return (
			<div className="NotFound">
				<h1>Not Found :/</h1>
				<div className="image">
					<img src={images[Math.floor(Math.random()*images.length)]} alt=""/>
				</div>
			</div>
		);
	}
}

export default NotFound;