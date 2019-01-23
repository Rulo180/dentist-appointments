import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import Patients from '../api/patients';
import { AppointmentForm } from './components/AppointmentForm';


class AppointmentCreate extends PureComponent {

	_handleSubmit = (event) => {
		event.preventDefault();
		// Get values from target
		// Meteor call	
		// 	redirect on cb
	};

	render() {
		const { patients } = this.props;

		return (
			<div className="row justify-content-center">
				<div className="col-9 col-md-6">
					<h2>Create a new appointment</h2>
					<AppointmentForm  patients={patients} onSubmit={this._handleSubmit} />
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const loadingPatients = !patientsHandler.ready();

	return {
		patients: !loadingPatients ? Patients.find({}).fetch() : [],
	};
})(AppointmentCreate);
