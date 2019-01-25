import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';


const Appointments = new Mongo.Collection('appointments');

Appointments.schema = new SimpleSchema({
	date: {
		type: Date,
		label: 'Date',
	},
	observations: {
		type: String,
		label: 'Observations',
		optional: true,
	},
	patientId: {
		type: String,
		label: 'Patient'
	},
	createdAt: {
		type: Date,
		label: 'Created at',
		autoValue: function() {
			return new Date();
		}
	},
	createdBy: {
		type: String,
		label: 'Created by',
		autoValue: function() {
			return this.userId;
		},
	},
});

Appointments.attachSchema(Appointments.schema);

Meteor.methods({
	'appointments.list'() {
		return Appointments.find({}).fetch;
	},
	'appointment.insert'({
		date,
		observations,
		patientId,
	}) {
		check(date, Date);
		check(observations, String);
		check(patientId, String);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		return Appointments.insert({
			date,
			observations,
			patientId,
		});
	},
});

export default Appointments;
