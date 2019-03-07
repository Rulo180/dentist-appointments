import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';


import Appointments from '../../api/appointments';
import Patients from '../../api/patients';
import AppointmentsTable from '../components/AppointmentsTable';


const AppointmentsList = ({ appointments, patients, isLoading }) => {
	const _handleDelete = (appointmentId) => {
		Meteor.call('appointment.remove', { _id: appointmentId});
	};

	const _handleConfirm = (appointmentId) => {
		Meteor.call('appointment.confirm', { _id: appointmentId });
	};

	const _handleCancel = (appointmentId) => {
		Meteor.call('appointment.cancel', { _id: appointmentId});
	};
	
	if(isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<AppointmentsTable 
			appointments={appointments}
			patients={patients}
			onConfirm={_handleConfirm}
			onCancel={_handleCancel}
			onDelete={_handleDelete}
		/>
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
		isLoading: isLoadingAppointments || isLoadingPatients,
	};
})(AppointmentsList);
