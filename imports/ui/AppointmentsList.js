import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { URLS } from './constants';
import Appointments from '../api/appointments';
import Patients from '../api/patients';


const AppointmentsList = ({ appointments, patients }) => {
	_renderAppointments = () => {
		let appointmentsArray = [],
			rowNumber = 0;

		appointments.map( (appointment) => {
			const { _id, date, patientId, observations } = appointment;
			let name = '';
			let patient = patients.find((patient) => patient._id === patientId);
			if (patient) {
				name = patient.name;
			}
			appointmentsArray.push(
				<tr key={_id}>
					<th scope="row">{rowNumber++}</th>
					<td>{date.toLocaleString('es', { hour: 'numeric', minute: 'numeric', hour12: false })} hs</td>
					<td>{name}</td>
					<td>{observations}</td>
				</tr>
			);
		});
		return appointmentsArray;
	};

	return (
		<main>
			<div className="row no-gutters justify-content-between mb-3">
				<h3>Appointments</h3>
				<Link to={URLS.CREATE_APPOINTMENT} className="btn btn-primary">Add</Link>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Time</th>
						<th scope="col">Patient</th>
						<th scope="col">Observations</th>
					</tr>
				</thead>
				<tbody>
					{this._renderAppointments()}
				</tbody>
			</table>
		</main>
	);
};

export default withTracker(() => {
	const appointmentsHandler = Meteor.subscribe('appointments');
	const isLoadingAppointments = !appointmentsHandler.ready();
	const patientsHandler = Meteor.subscribe('patients');
	const isLoadingPatients = !patientsHandler.ready();

	return {
		appointments: !isLoadingAppointments ? Appointments.find({}).fetch() : [], 
		patients: !isLoadingPatients ? Patients.find({}).fetch() : [], 
	};
})(AppointmentsList);
