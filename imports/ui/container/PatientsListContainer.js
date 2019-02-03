import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Patients from '../../api/patients';

import PatientsTable from '../components/PatientsTable';


const PatientsListContainer = ({ patients }) => {
	
	const _handleDelete = (id) => {
		Meteor.call('patient.remove', { _id: id });
	};
	
	if(patients.length == 0) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	
	return (
		<PatientsTable patients={patients} onDelete={_handleDelete} />
	);
};

export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const isLoading = !patientsHandler.ready();

	return {
		patients: !isLoading ? Patients.find({}, { sort: { name: 1 } }).fetch() : [], 
	};
})(PatientsListContainer);
