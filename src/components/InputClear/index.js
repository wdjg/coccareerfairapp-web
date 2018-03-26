import React from 'react';
import './InputClear.css';
import classNames from 'classnames';

const InputClear = ({active, onClick, className}) => (<div 
		className={classNames("input-clear", {active: active}, className)}
		onClick={onClick}>
	</div>);

export default InputClear;