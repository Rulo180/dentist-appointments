import { Meteor } from 'meteor/meteor';

import Patients from '../imports/api/patients';
import Appointments from '../imports/api/appointments';
import SocialSecure from '../imports/api/socialSecure';


Meteor.startup(() => {
	// code to run on server at startup
});

Meteor.publish('patients', () => Patients.find({}));
Meteor.publish('appointments', () => Appointments.find({}));
Meteor.publish('socialSecures', () => SocialSecure.find({}));
