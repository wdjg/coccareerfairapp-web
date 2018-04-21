import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBatch, setInterviewStudent } from '../../redux/actions/batch';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import './RecruiterBatch.css';

// const TEST_BATCH = [
// {name: "Valdimar Haraldsson", id: "9532016"},
// {name: "Floopy Doop", id: "AAAAAAAAAARG"},
// {name: "Hermann Jung-Olsen", id: "45634516"},
// {name: "Gudrun Gjukadóttir", id: "67824594"},
// {name: "Blerg Fergusson", id: "8679305"},]

class RecruiterBatch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal_student: null,
			show_modal: false,
	  };
	}

	componentDidMount() {
		console.log("BATCH MOUNT")
		this.props.getBatch(this.props.user.token);
	}

	beginInterview(student) {
		this.props.setInterviewStudent(student);
		this.props.history.push("interview");
	}

	closeModal() {
		this.setState({ show_modal: false });
	}

	openStudentBatchModal(student) {
		console.log("MODAL: " + student.name + " id: " + student._id);
		this.setState({modal_student: student, show_modal: true})
	}

	renderStudents() {
		if (this.props.batch.length < 1)
			return <Loading/>
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
					{/*<div className="stat__entry interview-time">
						<h2>Average Interview Length</h2>
						<div className="data">{this.renderInterviewTime(this.props.interviewTime)}min</div>
					</div>*/}
				</div>
				<h3>Select a student to interview</h3>
				<h2>Students on Deck</h2>
				<ul className="batch">
					{this.renderStudents()}
				</ul>
				<Modal shade show={this.state.show_modal} closeModal={() => this.closeModal()}>
					{this.state.modal_student && <div>
						<h2 className="interview-title">Interview With:</h2>
						<h1 className="name">{this.state.modal_student.name}</h1>
						<div className="buttons">
							<Button 
								className="btn begin green"
								onClick={() => this.beginInterview(this.state.modal_student)}>
								Begin
							</Button>
							<Button
								className="btn cancel red"
								onClick={this.closeModal.bind(this)}>
								Cancel
							</Button>
						</div>
					</div>}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	batch: state.batch.students,
	interviewTime: 5.34,
	interview_student: state.batch.interview_student,
});

const mapDispatchToProps = dispatch => 
	bindActionCreators({ getBatch, setInterviewStudent }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterBatch);
