import React, { Component } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';

import InterviewModal from '../components/InterviewModal';

import './RecruiterMain.css';

const TEST_BATCH = [{name: "Blerg Fergusson", id: "8679305"}, {name: "Floopy Doop", id: "AAAAAAAAAARG"}]

class RecruiterMain extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modalStudent: null,
	  };
	}

	closeModal() {
		this.setState({ modalID: null });
	}

	openStudentBatchModal(student) {
		console.log("MODAL: " + student.name);
	}

	renderStudents() {
		// return this.props.batch.map((entry, index) => (
		return TEST_BATCH.map((entry, index) => (
			<li className="batch--item" key={index} onClick={() => this.openStudentBatchModal(entry)}>
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
				<div className="modal">
					{this.state.modalStudent && <InterviewModal
						name={this.state.modalStudent.name}
						id={this.state.modalStudent.id}
						closeModal={this.closeModal}/>}
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	batch: state.batch,
});

export default connect(mapStateToProps)(RecruiterMain);