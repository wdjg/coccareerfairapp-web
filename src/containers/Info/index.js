import React, { Component } from 'react';
import './Info.css';


import { setNavButtons } from '../../redux/actions/navbar';
import { userLogout } from '../../redux/actions/login';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


class Info extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { match: { params } } = this.props;
	}


	render() {
		return (
			<div className="Info">
			<p><strong>Frequently Asked Questions:</strong></p>
			<p>Thank you for participating in the new Virtual line system! Below you will find some explanations and answers to common questions about the virtual line system.</p>
			<p>What is Virtual Line?&nbsp;</p>
			<p>Virtual Line is a new, fast, fun system for talking to your favorite companies and recruiters. Virtual Line eliminates the need for you to stand in line when waiting to talk to a recruiter.&nbsp;</p>
			<p>What do I need to use Virtual Line?</p>
			<p>In order to use Virtual Line, you will need a smartphone running a modern, popular operating system (iOS/Android) or another device capable of accessing the Web with a modern browser. Using this device, you will need to install the Career Fair app or access the web app. You are required to sign into the Career Fair and obtain a wristlet before you will be able to use Virtual Line each day.</p>
			<p>How does Virtual Line work?</p>
			<p>Virtual Line works by having you sign up at a company&rsquo;s booth. By doing this you are entered into a digital list of people (aka a virtual line) who are waiting to talk to that company. Normally you would need to stand in line for 1-2 or more hours to talk to a big company. But with the virtual line, once you are registered, your place is moved forward automatically. While it may take you the same amount of time to talk to a company, you won&rsquo;t feel like you&rsquo;re waiting because you will be able to talk to other companies while in a virtual line.</p>
			<p>How do I join a virtual line?<br /> You will need to go to the company booth with the Career Fair app open. Using the camera tool, you need to scan the QR code posted at the company. This will add you to the virtual line.</p>
			<p>Do I need to physically be at the career fair to join a virtual line?</p>
			<p>Yes, in order to join a line you will need to be at the Career Fair. However, once you join a line you are free to leave, but make sure not to wander too far in case you get pinged with a notification.</p>
			<p>How will I know when it is my turn?</p>
			<p>You will receive an email sent from the line service. In the future, you will receive a push notification directly from the app, like a check-in reminder from an airline.&nbsp;</p>
			<p>What if I am talking to a company when I get a notification?</p>
			<p>We understand that you may be talking to another company when you get a notification. For this reason, there is a 5 minute window you have to report back to the company&rsquo;s booth.</p>
			<p>What if I get a notification and I can&rsquo;t make the appointment?</p>
			<p>If you can&rsquo;t make your appointment, you can open the app and cancel it from there. Please be advised that making too many appointments and cancelling or missing them may temporarily block you from joining any new virtual lines.</p>
			<p>What do I do once I arrive at the company booth?</p>
			<p>Once you arrive at the company booth, you will need to scan the QR code a second time. If you have received a notification, scanning will check you in, otherwise you will not be on the recruiter&rsquo;s list.&nbsp;</p>
			<p>Why do I need to check in a second time?</p>
			<p>Checking in confirms that you have made it back to the company&rsquo;s booth in time.</p>
			<p>Which line do I join when I return to the company?&nbsp;</p>
			<p>If you have received a notification, you can join the fast line instead of the regular line.</p>
			<h1 className="name">{}</h1>
			</div>
		);
	}
}


export default Info;
