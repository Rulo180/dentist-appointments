import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { URLS } from './constants';
import Appointments from '../api/appointments';


const AppointmentsList = () => {
	return (
		<div>
			<h1>Appointments List</h1>
			<Link to={URLS.CREATE_APPOINTMENT} className="btn btn-primary">Add</Link>
		</div>
	);
};

export default withTracker(() => {
	const appointmentsHandler = Meteor.subscribe('appointments');
	const isLoading = !appointmentsHandler.ready();

	return {
		appointments: !isLoading ? Appointments.find({}).fetch() : [], 
	};
})(AppointmentsList);
