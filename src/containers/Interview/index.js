import React, { Component } from 'react';
import classNames from 'classnames';
import './Interview.css';
import Button from '../../components/Button';


const formattedSeconds = (sec) =>
	Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)

class Interview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondsElapsed: 0,
			laps: [],
			lastClearedIncrementer: null
		};
		this.incrementer = null;
	}

	handleStartClick() {
		this.incrementer = setInterval( () =>
			this.setState({
				secondsElapsed: this.state.secondsElapsed + 1
			})
		, 1000);
	}

	handleStopClick() {
		clearInterval(this.incrementer);
		this.setState({
			lastClearedIncrementer: this.incrementer
		});
	}

	handleResetClick() {
		clearInterval(this.incrementer);
		this.setState({
			secondsElapsed: 0,
			laps: []
		});
	}

	render() {
		return (
			<div className="interview">
				<br />
				<h1>Wiqas Nassar</h1>
				<br />
				<br />
				<div className="stopwatch">
					<h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
	        		{(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer
		          		? 
		          		<div>
		          			<br />
		          			<Button className="start-btn" onClick={this.handleStartClick.bind(this)}>Start Interview</Button>
		          			<Button className="cancel-btn" onClick={this.handleResetClick.bind(this)}>Cancel Interview</Button>
		          		</div>
		          		: 
		          		<div>
		          			<br />
		          			<Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>End Interview</Button>
		          		</div>
		          		
	          		)}

	        		{(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer
	          			? 
						<div>
							<br />
	          				<Button className="reset-btn" onClick={this.handleResetClick.bind(this)}>RESET</Button>
	          			</div>
	          			: null
	        		)}
				</div>
			</div>
		);
	}
}

export default Interview;