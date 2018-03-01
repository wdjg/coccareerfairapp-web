import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import InterviewModal from '../../components/InterviewModal';

import './RecruiterBatch.css';

const TEST_BATCH = [
{name: "Valdimar Haraldsson", id: "9532016"},
{name: "Floopy Doop", id: "AAAAAAAAAARG"},
{name: "Hermann Jung-Olsen", id: "45634516"},
{name: "Gudrun Gjukadóttir", id: "67824594"},
{name: "Blerg Fergusson", id: "8679305"},]

class RecruiterBatch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal_student: null,
			show_modal: false
	  };
	}

	componentDidMount() {
		
	}

	closeModal() {
		this.setState({ show_modal: false });
	}

	openStudentBatchModal(student) {
		console.log("MODAL: " + student.name + " id: " + student.id);
		this.setState({modal_student: student, show_modal: true})
	}

	renderStudents() {
		// return this.props.batch.map((entry, index) => (
		return this.props.batch.map((entry, index) => (
			<li className="batch__item" key={index} onClick={() => this.openStudentBatchModal(entry)}>
				{entry.name}
			</li>
		));
	}

	renderInterviewTime(time) {
		return Math.round(time);
	}

	render() {
		return (
			<div className="RecruiterBatch">
				<div className="stats">
					<div className="stat__entry interview-time">
						<h2>Average Interview Length</h2>
						<div className="data">{this.renderInterviewTime(this.props.interviewTime)}min</div>
					</div>
				</div>
				<h2>Batch</h2>
				<ul className="batch">
					{this.renderStudents()}
				</ul>
				<div className={classNames("modal", {show: this.state.show_modal})}>
					<div className="shadow" onClick={() => this.closeModal()}></div>
					<div className="content">
						{this.state.modal_student && <InterviewModal
							name={this.state.modal_student.name}
							id={this.state.modal_student.id}
							closeModal={() => this.closeModal()}/>}
					</div>
				</div>
			</div>
		);
	}
}


				// <Link className="qr-link btn" to="/qr">
				// 	Tap to show company QR Code
				// </Link>

// TODO
const mapStateToProps = state => ({
	batch: state.batch.batch,
	line: {
		students: 20
	},
	interviewTime: 5.34,
});

export default connect(mapStateToProps)(RecruiterBatch);
