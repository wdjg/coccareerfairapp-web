import React, { Component } from 'react';
import './SearchCompanies.css';
import classNames from 'classnames'

// import Filter from '../../components/Filter'
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getCompanies } from '../../redux/actions/companies';
import { setNavContent } from '../../redux/actions/navbar';
import { setFilterKey } from '../../redux/actions/searchfilter'

class SearchCompanies extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	show_filter: false,
	  	hovered_company: undefined,
	  };
	}

	componentDidMount() {
		this.props.getCompanies(this.props.user.token);
		this.props.setNavContent(<SearchBar topbar onFilterClick={this.onFilterClick.bind(this)}/>);
	}

	componentWillUnmount() {
		this.props.setNavContent(null);
	}

	renderCompanies(companies, textFilter) {
		if (companies.length < 1)
			return <Loading/>
		return companies.filter(company => {
  		let valid = company.name.toLowerCase().includes(textFilter.toLowerCase());
  		// if(this.state.day >= 0) valid &= company.day == this.state.day;
  		// valid &= this.state.floors[company.floor];
  		return valid;
  	}).sort((a, b) =>  {
      return a.name.localeCompare(b.name);  //TODO sorting
    }).map((company, index) => Company({
    	...company, 
    	index: index, 
    	setCompanyHover: this.setCompanyHover.bind(this), 
    	hoverState: this.state.hovered_company}))
	}

	onFilterClick() {
		this.setState(prev => ({ show_filter: !prev.show_filter }));
	}

	setCompanyHover(val) {
		this.setState({ hovered_company: val })
	}

	render() {
		return (
			<div className="SearchCompanies">
				<div className="content">
					<div className="companies">
						{this.renderCompanies(this.props.companies, this.props.filter.search)}
					</div>
				</div>
			</div>
		);
	}
}
// <Filter></Filter>
const mapStateToProps = state => ({
	user: state.user,
	companies: state.companies,
	filter: state.searchfilter,
	browser: state.browser,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getCompanies, setNavContent, setFilterKey }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchCompanies);

const Company = ({...props, index, setCompanyHover, hoverState}) => (
	<div key={index} className={classNames("company", {hovered: hoverState === props._id})}>
		<Link
			className="company__logo"
			style={{background: props.color}}
			to={"company/" + props._id}
			onMouseEnter={() => setCompanyHover(props._id)}
			onMouseLeave={() => setCompanyHover(null)}>
			<div className="logo__inspect"><i className="icon-search"></i></div>
		</Link>
		<div className="company__content">
			<Link 
				className="company__top"
				to={"company/" + props._id}
				onMouseEnter={() => setCompanyHover(props._id)}
				onMouseLeave={() => setCompanyHover(null)}>
				<h1>{props.name}</h1>
			</Link>
			<div className="company__bottom">
				<div className="company__type">Type</div>
				{props.line_stats && <div className="company__line">Virtual Line: {props.line_stats.size}</div>}
			</div>
		</div>
		<div className="company__arrow"></div>
	</div>
);