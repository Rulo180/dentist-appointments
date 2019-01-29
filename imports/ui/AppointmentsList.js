import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { URLS } from './constants';
import Appointments from '../api/appointments';
import Patients from '../api/patients';


const AppointmentsList = ({ appointments, patients }) => {
	const _handleDelete = (id) => {
		Meteor.call('appointment.remove', { _id: id});
	};

	const _handleConfirm = (id) => {
		Meteor.call('appointment.confirm', { _id: id });
	};

	const _handleCancel = (id) => {
		Meteor.call('appointment.cancel', { _id: id});
	};
	
	_renderAppointments = () => {
		let appointmentsArray = [],
			rowNumber = 1;

		appointments.map( (appointment) => {
			const { _id, date, patientId, observations, isCanceled } = appointment;
			let name = '';
			let patient = patients.find((patient) => patient._id === patientId);
			if (patient) {
				name = patient.name;
			}
			let confirmBtn = (isConfirmed) ?
				<button onClick={() => _handleConfirm(_id)} className="btn btn-outline-success active"><i className="far fa-calendar-check"></i></button>
				:
				<button onClick={() => _handleConfirm(_id)} className="btn btn-outline-success"><i className="fas fa-calendar-check"></i></button>;

			let cancelBtn = (isCanceled) ? 
				<button onClick={() => _handleCancel(_id)} type="button" className="btn active text-white btn-outline-warning"><i className="far fa-calendar-times"></i></button>
				:
				<button onClick={() => _handleCancel(_id)} type="button" className="btn btn-outline-warning"><i className="fas fa-calendar-times"></i></button>;
				
			appointmentsArray.push(
				<tr key={_id} className={isCanceled?'table-dark':''}>
					<td className="text-center" scope="row">{confirmBtn}</td>
					<th scope="row">{rowNumber++}</th>
					<td>{date.toLocaleString('es', { hour: 'numeric', minute: 'numeric', hour12: false })} hs</td>
					<td>{name}</td>
					<td>{observations}</td>
					<td className="text-center">{cancelBtn}</td>
					<td className="text-center"><button onClick={() => _handleDelete(_id)} type="button" className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button></td>
				</tr>
			);
		});
		return appointmentsArray;
	};

	if(appointments.length == 0) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<main>
			<div className="row justify-content-center">
				<div className="col-lg-10">
					<div className="card">
						<div className="card-body">
							<div className="row no-gutters justify-content-between mb-3">
								<h3>Appointments</h3>
								<Link to={URLS.CREATE_APPOINTMENT} className="btn btn-primary"><i className="far fa-calendar-plus"></i> Add</Link>
							</div>
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Confirm</th>
										<th scope="col">#</th>
										<th scope="col">Time</th>
										<th scope="col">Patient</th>
										<th scope="col">Observations</th>
										<th className="text-center" scope="col">Is Canceled?</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{this._renderAppointments()}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
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
