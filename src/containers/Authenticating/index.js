import React, { Component } from 'react';
import './Authenticating.css';
import Loading from '../../components/Loading';

class Authenticating extends Component {

	render() {
		return (
			<div className="Authenticating">
				<Loading/>
			</div>
		);
	}
}

export default Authenticating;