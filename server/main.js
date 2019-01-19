import { Meteor } from 'meteor/meteor';

import Patients from '../imports/api/patients';


Meteor.startup(() => {
	// code to run on server at startup
});

Meteor.publish('patients', () => Patients.find({}));
