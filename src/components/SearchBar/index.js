import React, { Component } from 'react';
import './SearchBar.css';
import classNames from 'classnames'

import InputClear from '../../components/InputClear';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setFilterKey } from '../../redux/actions/searchfilter'

class SearchBar extends Component {
	onSearchClear() {
		this.props.setFilterKey('search','')
		this.searchInput.focus();
	}
	render() {
		return (
			<div className={classNames("SearchBar", {topbar: this.props.topbar})}>
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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	filter: state.searchfilter,
	browser: state.browser
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ setFilterKey }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);