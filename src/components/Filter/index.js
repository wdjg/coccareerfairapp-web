import React, { Component } from 'react';
import './Filter.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { setFilter, setFilterKey } from '../../redux/actions/filter';

import { Select } from 'antd';
import 'antd/lib/select/style/index.css'
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
				key={item.key}
				handleChange={this.handleSelect.bind(this)}
				options={item.options}
				state={this.props.filter}/>
		));
	}

	render() {
		console.log(this.props.filter)
		return (
			<div className="Filter">
				{this.renderFilters()}
			</div>
		);
	}
}

const FilterSelect = ({label, key, handleChange, options, state}) => (
	<div className="entry">
		<h2 className="entry__title">{label}</h2>
		<Select
			mode="multiple"
			className="entry__select"
			placeholder={"Please select " + label.toLowerCase()}
			onChange={val => handleChange(key, val)}
			value={state[key]}>
			{options.map((item, index) => (<Option key={index}>{item}</Option>))}
		</Select>
	</div>
)

const mapStateToProps = state => ({
	filter: state.filter,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setFilter, setFilterKey }, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
