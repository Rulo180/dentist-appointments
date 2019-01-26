import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import { URLS } from './constants';
import { convertTimeToMilliseconds } from './utils/utils';

import Patients from '../api/patients';
import { AppointmentForm } from './components/AppointmentForm';


class AppointmentCreate extends PureComponent {

	_handleSubmit = (data) => {
		const { time, date, observations, patientId } = data;
		let timestamp = new Date(date).getTime();	// convert date into ms
		let timemilliseconds = convertTimeToMilliseconds(time); // convert time into ms
		let datetime = timestamp + timemilliseconds;	// add those ms
		Meteor.call('appointment.insert', {
			date: new Date(datetime),	// create a new date with the result
			observations: observations,
			patientId: patientId,
		}, () => {
			this.props.history.push(URLS.APPOINTMENTS);
		});
	};

	render() {
		const { patients } = this.props;

		return (
			<div className="row justify-content-center">
				<div className="col-10 col-md-8 col-lg-6">
					<div className="card">
						<div className="card-body">
							<h2>Create a new appointment</h2>
							<AppointmentForm  patients={patients} onSubmit={this._handleSubmit} />
						</div>
					</div>
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
