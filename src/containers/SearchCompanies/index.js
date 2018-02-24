import React, { Component } from 'react';
import './SearchCompanies.css';
import classNames from 'classnames';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { getCompanies } from '../../redux/actions/companies';
import BurgerFilter from '../../resources/burger-filter.svg'

class SearchCompanies extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	search: ''
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
					<div className={classNames("search__button clear", {active: this.state.search})} onClick={() => this.onSearchClear()}></div>
					<div className="search__button filter"><img src={BurgerFilter} alt=""/></div>
				</div>
				<div className="companies">
					{this.renderCompanies(this.props.companies, this.state.search)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	companies: state.companies,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getCompanies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchCompanies);

const Company = ({...props, index}) => (
	<div key={index} className="company">
		<h1>{props.name}</h1>
		<div className="select">></div>
	</div>
);