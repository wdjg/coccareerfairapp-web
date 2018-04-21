import React, { Component } from 'react';
import './Info.css';


class Info extends Component {

	render() {
		return (
			<div className="Info">
				<h1>Frequently Asked Questions</h1>
				<p>Thank you for participating in the new Virtual line system! Below you will find some explanations and answers to common questions about the virtual line system.</p>
				<div className="faq-entry">
					<h2 className="question">What is Virtual Line?</h2>
					<div className="answer">Virtual Line is a new, fast, fun system for talking to your favorite companies and recruiters. Virtual Line eliminates the need for you to stand in line when waiting to talk to a recruiter.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">What do I need to use Virtual Line?</h2>
					<div className="answer">In order to use Virtual Line, you will need a smartphone running a modern, popular operating system (iOS/Android) or another device capable of accessing the Web with a modern browser. Using this device, you will need to install the Career Fair app or access the web app. You are required to sign into the Career Fair and obtain a wristlet before you will be able to use Virtual Line each day.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">How does Virtual Line work?</h2>
					<div className="answer">Virtual Line works by having you sign up at a company&rsquo;s booth. By doing this you are entered into a digital list of people (aka a virtual line) who are waiting to talk to that company. Normally you would need to stand in line for 1-2 or more hours to talk to a big company. But with the virtual line, once you are registered, your place is moved forward automatically. While it may take you the same amount of time to talk to a company, you won't feel like you're waiting because you will be able to talk to other companies while in a virtual line.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">How do I join a virtual line?</h2>
					<div className="answer">You will need to go to the company booth with the Career Fair app open. Using the camera tool, you need to scan the QR code posted at the company. This will add you to the virtual line.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">Do I need to physically be at the career fair to join a virtual line?</h2>
					<div className="answer">Yes, in order to join a line you will need to be at the Career Fair. However, once you join a line you are free to leave, but make sure not to wander too far in case you get pinged with a notification.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">How will I know when it is my turn?</h2>
					<div className="answer">You will receive an email sent from the line service. In the future, you will receive a push notification directly from the app, like a check-in reminder from an airline.&nbsp;</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">What if I am talking to a company when I get a notification?</h2>
					<div className="answer">We understand that you may be talking to another company when you get a notification. For this reason, there is a 5 minute window you have to report back to the company&rsquo;s booth.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">What if I get a notification and I can&rsquo;t make the appointment?</h2>
					<div className="answer">If you can&rsquo;t make your appointment, you can open the app and cancel it from there. Please be advised that making too many appointments and cancelling or missing them may temporarily block you from joining any new virtual lines.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">What do I do once I arrive at the company booth?</h2>
					<div className="answer">Once you arrive at the company booth, you will need to scan the QR code a second time. If you have received a notification, scanning will check you in, otherwise you will not be on the recruiter&rsquo;s list.&nbsp;</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">Why do I need to check in a second time?</h2>
					<div className="answer">Checking in confirms that you have made it back to the company&rsquo;s booth in time.</div>
				</div>
				<div className="faq-entry">
					<h2 className="question">Which line do I join when I return to the company?</h2>
					<div className="answer">If you have received a notification, you can join the fast line instead of the regular line.</div>
				</div>
			</div>
		);
	}
}


export default Info;
