import React, { Component } from 'react';
import './Filter.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { setFilterKey } from '../../redux/actions/searchfilter';

import { Select } from 'antd';
const Option = Select.Option;


const filters = [
	{
		label: 'Position Types',
		key: 'position_types',
		options: [
			'Professional Full Time',
			'Internship',
			'Co-op',
			'Masters, PhD, & MBA Internship/Co-op',
			'Global Internship',
			'Undergraduate Research',
			'Professional Part Time Only',
			'Non-Professional Part-Time/Seasonal Only',
		]
	},
	{
		label: 'Work Authorization Desired',
		key: 'work_auth',
		options: [
			'US Citizen',
			'Permanent Resident (U.S.)',
			'EAD - Employment Authorization',
			'Student (F-1) Visa',
			'Employment (H-1) Visa',
			'J-1 Visa',
		]
	},
	{
		label: 'Degree Levels Recruited',
		key: 'degree_recruited',
		options: [
			'Bachelors',
			'Masters',
			'Doctorate',
			'Post-Doc',
			'Special',
			'Non-Degree',
		]
	},
];

class Filter extends Component {

	handleSelect(key, value) {
		// this.setState({[key]: value});
		this.props.setFilterKey(key, value);
	}

	renderFilters() {
		return filters.map((item, index) => (
			<FilterSelect
				label={item.label}
				name={item.key}
				handleChange={this.handleSelect.bind(this)}
				options={item.options}
				key={index}
				state={this.props.filter}/>
		));
	}

	render() {
		return (
			<div className="Filter">
				{this.renderFilters()}
			</div>
		);
	}
}

const FilterSelect = ({label, name, handleChange, options, state}) => (
	<div className="entry">
		<h2 className="entry__title">{label}</h2>
		<Select
			mode="multiple"
			className="entry__select"
			placeholder={"Please select " + label.toLowerCase()}
			onChange={val => handleChange(name, val)}
			value={state[name]}>
			{options.map((item, index) => (<Option key={index}>{item}</Option>))}
		</Select>
	</div>
)

const mapStateToProps = state => ({
	filter: state.searchfilter,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setFilterKey }, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
