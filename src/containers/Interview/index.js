import React, { Component } from 'react';
import './Interview.css';
import Button from '../../components/Button';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { setStudentLineStatus } from '../../redux/actions/batch'


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

	componentDidMount() {
		var noStudent =  Object.keys(this.props.interview_student).length === 0 && 
			this.props.interview_student.constructor === Object;
		if (noStudent) {
			this.props.history.goBack();
		}
	}

	componentWillUnmount() {
		if (this.state.line_status !== "stop" && this.state.line_status !== "")
			this.props.setStudentLineStatus(this.props.user.token, this.props.interview_student.line_id, "finishrecruiter");
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
		this.props.history.push("/");
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
		this.props.history.push("/");
	}

	render() {
		return (
			<div className="Interview">
				<h1>{this.props.interview_student.name}</h1>
				<div className="stopwatch">
					<h2>Interview Time</h2>
					<h1 className="stopwatch-timer">{formattedSeconds(this.state.seconds_elapsed)}</h1>
	        		{(this.state.seconds_elapsed === 0 || this.incrementer === this.state.last_cleared_incrementer
		          		? 
		          		<div className="buttons">
		          			<Button className="start-btn green" onClick={this.handleStartClick.bind(this)}>Start Interview</Button>
		          			<Button className="cancel-btn red" onClick={this.handleCancelClick.bind(this)}>Return to Batch</Button>
		          		</div>
		          		: 
		          		<div className="buttons">
		          			<Button className="stop-btn red" onClick={this.handleStopClick.bind(this)}>End Interview</Button>
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
	bindActionCreators({setStudentLineStatus}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Interview);