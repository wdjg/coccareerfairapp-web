import React, { Component } from 'react';
import './SearchCompanies.css';
import classNames from 'classnames'

import InputClear from '../../components/InputClear';
import Filter from '../../components/Filter';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getCompanies } from '../../redux/actions/companies';
import { setNavContent } from '../../redux/actions/navbar';
import { setFilterKey } from '../../redux/actions/searchfilter'
import BurgerFilter from '../../resources/burger-filter.svg';

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
					<div className={classNames("filter", {
						show: this.props.browser.greaterThan.extraSmall || this.state.show_filter})}>
						<Filter></Filter>
					</div>
				</div>
			</div>
		);
	}
}

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
				<div className="company__line">In line: {2}</div>
			</div>
		</div>
		<div className="company__arrow"></div>
	</div>
);


class SearchBar extends Component {
	onSearchClear() {
		this.props.setFilterKey('search','')
		this.searchInput.focus();
	}
	render() {
		return (
			<div className={classNames("search", {topbar: this.props.topbar})}>
				<input
					type="text"
					className="search-input"
					placeholder="Search Companies"
					value={this.props.filter.search}
					ref={ref => {this.searchInput = ref}}
					onChange={e => this.props.setFilterKey('search', e.target.value)}/>
				<InputClear 
					className="search__button"
					active={this.props.filter.search} onClick={this.onSearchClear.bind(this)} />
				{this.props.browser.is.extraSmall && <div
					className="search__button filter"
					onClick={this.props.onFilterClick}><img src={BurgerFilter} alt=""/></div>}
			</div>
		);
	}
}

SearchBar = connect(state => ({ filter: state.searchfilter, browser: state.browser }), 
	dispatch => bindActionCreators({ setFilterKey }, dispatch))(SearchBar)