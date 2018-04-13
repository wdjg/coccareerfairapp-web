import React, { Component } from 'react';
import './SearchCompanies.css';
import classNames from 'classnames'

import { Icon } from 'antd';
import InputClear from '../../components/InputClear';
import Filter from '../../components/Filter';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getCompanies } from '../../redux/actions/companies';
import BurgerFilter from '../../resources/burger-filter.svg';

class SearchCompanies extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	search: '',
	  	showFilter: false,
	  };
	}

	componentDidMount() {
		this.props.getCompanies(this.props.user.token);
	}

	renderCompanies(companies, textFilter) {
		return companies.filter(company => {
  		let valid = company.name.toLowerCase().includes(textFilter.toLowerCase());
  		// if(this.state.day >= 0) valid &= company.day == this.state.day;
  		// valid &= this.state.floors[company.floor];
  		return valid;
  	}).sort((a, b) =>  {
      return a.name.localeCompare(b.name);  //TODO sorting
    }).map((company, index) => Company({...company, index: index}))
	}

	onSearchClear() {
		this.setState({ search: '' });
		this.searchInput.focus();
	}

	onFilterClick() {
		this.setState(prev => ({ showFilter: !prev.showFilter }));
	}

	render() {
		return (
			<div className="SearchCompanies">
				<div className="search">
					<input
						type="text"
						className="search-input"
						placeholder="Search"
						value={this.state.search}
						ref={ref => {this.searchInput = ref}}
						onChange={e => this.setState({ search: e.target.value })}/>
					<InputClear 
						className="search__button"
						active={this.state.search} onClick={this.onSearchClear.bind(this)} />
					<div
						className="search__button filter"
						onClick={this.onFilterClick.bind(this)}><img src={BurgerFilter} alt=""/></div>
				</div>
				<div className="content">
					<div className={classNames("filter", {show: this.state.showFilter})}>
						<Filter></Filter>
					</div>
					<div className="companies">
						{this.renderCompanies(this.props.companies, this.state.search)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	companies: state.companies,
	filter: state.filter,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getCompanies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchCompanies);

const Company = ({...props, index}) => (
	<Link key={index} className="company" to={"company/" + props._id}>
		<div className="company__logo"></div>
		<div className="company__content">
			<div className="company__top">
				<h1>{props.name}</h1>
			</div>
			<div className="company__bottom">
				<span className="company__line">In line: {2}</span>
			</div>
		</div>
		<div className="company__arrow"><Icon type="right" style={{ fontSize: 20}} /></div>
	</Link>
);