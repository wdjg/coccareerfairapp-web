import React, { Component } from 'react';
import './StudentMain.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getLine } from '../../redux/actions/line';

class StudentMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showCamera: false,
			company: null,
		}
	}

	componentDidMount() {
		this.props.getLine(this.props.user.token);
	}

	renderCompany(company) {
		return company ? company : "Not in Line"
	}

	render() {
		return (
			<div className="StudentMain" onClick={() => this.setState(prev => ({showCamera: true}))}>
				<div className="line-details">
					<div className="company">
						<h2>In Line</h2>
						<div className="data">{this.renderCompany(this.props.company)}</div>
					</div>
					<div className="wait">
						<h2>Place</h2>
						<div className="data">{}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	line: state.line,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getLine }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StudentMain);