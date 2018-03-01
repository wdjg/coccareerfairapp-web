import React, { Component } from 'react';
import './NotFound.css';


class NotFound extends Component {
	constructor(props) {
		super(props);
		this.images = ['https://i.imgur.com/8srChE2.gif', 'https://i.redd.it/uwvjph19mltz.jpg', 'https://i.imgur.com/lWAYMnS.gif'];
		this.rand_image = this.images[Math.floor(Math.random()*this.images.length)];
	}
	componentDidMount() {
		// this.randImage = this.images[Math.floor(Math.random()*this.images.length)];
	}
	render() {
		console.log(this.images);
		return (
			<div className="NotFound">
				<h2>The page that you're looking for doesn't exist ;__;</h2>
				<div className="image">
					<img src={this.rand_image} alt=""/>
				</div>
			</div>
		);
	}
}

export default NotFound;