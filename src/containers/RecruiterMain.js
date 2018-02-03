import React, { Component } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';

import InterviewModal from '../components/InterviewModal';

import './RecruiterMain.css';

const TEST_BATCH = [
{name: "Blerg Fergusson", id: "8679305"},
{name: "Floopy Doop", id: "AAAAAAAAAARG"},
{name: "Valdimar Haraldsson", id: "9532016"},
{name: "Hermann Jung-Olsen", id: "45634516"},
{name: "Gudrun Gjukadóttir", id: "67824594"},]

class RecruiterMain extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modalStudent: null,
	  };
	}

	closeModal() {
		this.setState({ modalStudent: null });
	}

	openStudentBatchModal(student) {
		console.log("MODAL: " + student.name + " id: " + student.id);
		this.setState({modalStudent: student})
	}

	renderStudents() {
		// return this.props.batch.map((entry, index) => (
		return TEST_BATCH.map((entry, index) => (
			<li className="batch__item" key={index} onClick={() => this.openStudentBatchModal(entry)}>
				{entry.name}
			</li>
		));
	}

	render() {
		return (
			<div className="RecruiterMain">
				<ul className="batch">
					{this.renderStudents()}
				</ul>
				<div className={classNames("modal", {show: this.state.modalStudent})}>
					<div className="shadow" onClick={() => this.closeModal()}></div>
					<div className="content">
						{this.state.modalStudent && <InterviewModal
							name={this.state.modalStudent.name}
							id={this.state.modalStudent.id}
							closeModal={() => this.closeModal()}/>}
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	batch: state.batch,
});

export default connect(mapStateToProps)(RecruiterMain);