import React, { Component } from 'react';
import './Interview.css';
import Button from '../../components/Button';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { recruiterSetLineStatus } from '../../redux/actions/line'



const formattedSeconds = (sec) =>
	Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)

class Interview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds_elapsed: 0,
			laps: [],
			last_cleared_incrementer: null,
			line_status: ""
		};
		this.incrementer = null;
	}

	recruiterStart() {
		this.setState({
			line_status: "start"
		})
		this.props.setStudentLineStatus(this.props.user.token, this.props.interview_student.line_id, "startrecruiter");
	}

	recruiterStop() {
		this.setState({
			line_status: "stop"
		})
		this.props.setStudentLineStatus(this.props.user.token, this.props.interview_student.line_id, "finishrecruiter");
		this.props.history.push("batch");
	}

	handleStartClick() {
		this.recruiterStart();
		this.incrementer = setInterval( () =>
			this.setState({
				seconds_elapsed: this.state.seconds_elapsed + 1
			})
		, 1000);
	}

	handleStopClick() {
		this.recruiterStop();
		clearInterval(this.incrementer);
		this.setState({
			last_cleared_incrementer: this.incrementer
		});
	}

	handleCancelClick() {
		this.props.history.push("batch");
	}

	render() {
		return (
			<div className="Interview">
				<br />
				<h1>{this.props.interview_student.name}</h1>
				<br />
				<br />
				<div className="stopwatch">
					<h1 className="stopwatch-timer">{formattedSeconds(this.state.seconds_elapsed)}</h1>
	        		{(this.state.seconds_elapsed === 0 || this.incrementer === this.state.last_cleared_incrementer
		          		? 
		          		<div>
		          			<br />
		          			<Button className="start-btn" onClick={this.handleStartClick.bind(this)}>Start Interview</Button>
		          			<Button className="cancel-btn" onClick={this.handleCancelClick.bind(this)}>Cancel Interview</Button>
		          		</div>
		          		: 
		          		<div>
		          			<br />
		          			<Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>End Interview</Button>
		          			<Button className="batch-btn" onClick={this.handleCancelClick.bind(this)}>Return To Batch</Button>
		          		</div>
		          		
	          		)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	line: state.line,
	interview_student: state.batch.interview_student
})

const mapDispatchToProps = dispatch =>
	bindActionCreators({recruiterSetLineStatus}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Interview);