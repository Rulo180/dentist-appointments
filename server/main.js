import { Meteor } from 'meteor/meteor';

import Patients from '../imports/api/patients';
import Appointments from '../imports/api/appointments';


Meteor.startup(() => {
	// code to run on server at startup
});

Meteor.publish('patients', () => Patients.find({}));
Meteor.publish('appointments', () => Appointments.find({}));
