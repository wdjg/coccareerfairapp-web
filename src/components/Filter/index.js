import React, { Component } from 'react';
import './Filter.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Filter extends Component {
	render() {
		return (
			<div className="Filter">
				
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({}, dispatch) 

export default connect(null, mapDispatchToProps)(Filter);


class CheckboxOption extends Component {
  render() {
    const { value, isChecked, children } = this.props
    return (
      <Option className="select-option" value={value}>
        <input
          type="checkbox"
          className="select-option__checkbox"
          defaultValue={null}
          checked={isChecked}
        />
        <div className="select-option__label">
          {children}
        </div>
      </Option>
    )
  }
}

class CheckboxMultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: 'Select a color',
      currentValues: []
    }
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(value) {
    this.setState({
      currentValues: getToggledOptions(this.state.currentValues, value)
    })
  }

  render() {
    const { defaultValue, currentValues } = this.state

    return (
      <Select
        classPrefix="select"
        multiple
        onChange={this._handleChange}
      >
        <button className="select-trigger">
          { currentValues.length > 0
            ? currentValues.join(', ')
            : defaultValue
          }
        </button>
        <div className="select-menu">
          <ul className="select-options">
            <CheckboxOption value="red" isChecked={currentValues.indexOf('red') > -1}>
              Red
            </CheckboxOption>
            <CheckboxOption value="green" isChecked={currentValues.indexOf('green') > -1}>
              Green
            </CheckboxOption>
            <CheckboxOption value="blue" isChecked={currentValues.indexOf('blue') > -1}>
              Blue
            </CheckboxOption>
          </ul>
        </div>
      </Select>
    )
  }
}