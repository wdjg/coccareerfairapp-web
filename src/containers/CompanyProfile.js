import React, { Component } from 'react';
import classNames from 'classnames';
import './CompanyProfile.css';

import ErrorInput from '../components/ErrorInput';

import { connect } from 'react-redux'


class CompanyProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const company = this.props.companies.find(e => e.url === params.id)
		if (company)
			this.setState({...company});
		else
			this.props.history.push('notfound')
	}

	render() {
		console.log(this.state);
		return (
			<div className="CompanyProfile">
				<h1 className="name">{this.state.name}</h1>
			</div>
		);
	}
}

//TODO set up company redux
const mapStateToProps = state => ({
	user: state.user,
	companies: [{
		url: 'microsoft',
		id: '8675309RICK',
		name: 'Microsoft',
	}]
});

export default connect(mapStateToProps)(CompanyProfile);