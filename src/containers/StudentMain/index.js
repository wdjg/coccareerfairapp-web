import React, { Component } from 'react';
import './StudentMain.css';

import SearchCompanies from '../SearchCompanies'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLine } from '../../redux/actions/line';

const ordinal = i => {
	var j = i % 10,
		k = i % 100;
	if (j === 1 && k !== 11) {
		return "st";
	}
	if (j === 2 && k !== 12) {
		return "nd";
	}
	if (j === 3 && k !== 13) {
		return "rd";
	}
	return "th";
}

class StudentMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show_camera: false,
			company: {},
		}
	}

	componentDidMount() {
		if (this.props.line) {
			const company = this.props.companies.find(e => e._id === this.props.line.employer_id)
			if (company)
				this.setState({company: company});
		}
	}

	renderCompany(company) {
		return company ? company : "Not in Line"
	}

	renderPlace(place) {
		return place > -1 ? (<span><span>{place}</span><span className="num-after">{ordinal(place)}</span></span>) : "N/A"
	}

	render() {
		return (
			<div className="StudentMain" onClick={() => this.setState(prev => ({show_camera: true}))}>
				<div className="line-details">
					<div className="company">
						<h2>In Line</h2>
						<div className="data">{this.renderCompany(this.state.company.name)}</div>
					</div>
					<div className="wait">
						<h2>Place</h2>
						<div className="data place">{this.renderPlace(this.props.line.myPlace)}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	line: state.line,
	companies: state.companies,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getLine }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudentMain);