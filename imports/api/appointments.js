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
	isCanceled: {
		type: Boolean,
		label: 'Is canceled',
		defaultValue: false,
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
	'appointment.find'({
		_id,
	}) {
		check(_id, String);
		if (_id) {
			return Appointments.findOne({ _id });
		}
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
	'appointment.cancel'({
		_id,
	}) {
		check(_id, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		let appointment = Appointments.findOne({ _id });
		Appointments.update({
			_id
		}, {
			$set: { isCanceled: !appointment.isCanceled }
		});
	},
	'appointment.remove'({
		_id,
	}) {
		check(_id, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Appointments.remove({ _id });
	},
});

export default Appointments;
