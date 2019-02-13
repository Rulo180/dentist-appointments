import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
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
	isConfirmed: {
		type: Boolean,
		label: 'Is confirmed',
		defaultValue: false,
	},
	isCanceled: {
		type: Boolean,
		label: 'Is canceled',
		defaultValue: false,
	},
	createdAt: {
		type: Date,
		label: 'Created at',
	},
	createdBy: {
		type: String,
		label: 'Created by',
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
		createdAt,
		createdBy,
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
			createdAt: createdAt || new Date(),
			createdBy: createdBy || this.userId,
		});
	},
	'appointment.edit'({
		id,
		data,
	}) {
		const { date, observations, patientId } = data;
		check(id, String);
		check(date, Date);
		check(observations, String);
		check(patientId, String);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		return Appointments.update(
			id,
			{$set: {
				date: date,
				observations: observations,
				patientId: patientId,
			}}
		);
	},
	'appointment.confirm'({
		_id,
	}) {
		check(_id, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		let appointment = Appointments.findOne({ _id });
		if (appointment.isCanceled) {
			throw new Meteor.Error('Can not confirm a canceled event');
		}
		Appointments.update({
			_id
		}, {
			$set: { isConfirmed: !appointment.isConfirmed }
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
		if (appointment.isConfirmed) {
			throw new Meteor.Error('Can not cancel a confirmed event');
		}
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

Factory.define('appointment', Appointments, {
	date: () => faker.date.past(15),
	observations: () => faker.lorem.text(),
	patientId: () => (new Mongo.Collection.ObjectID)._str,
	isConfirmed: () => false,
	isCanceled: () => false,
	createdAt: () => new Date(),
	createdBy: () => (new Mongo.Collection.ObjectID)._str, 
});
Factory.define('confirmed.appointment', Appointments, {
	date: () => faker.date.past(15),
	observations: () => faker.lorem.text(),
	patientId: () => (new Mongo.Collection.ObjectID)._str,
	isConfirmed: () => true,
	isCanceled: () => false,
	createdAt: () => new Date(),
	createdBy: () => (new Mongo.Collection.ObjectID)._str, 
});
Factory.define('canceled.appointment', Appointments, {
	date: () => faker.date.past(15),
	observations: () => faker.lorem.text(),
	patientId: () => (new Mongo.Collection.ObjectID)._str,
	isConfirmed: () => false,
	isCanceled: () => true,
	createdAt: () => new Date(),
	createdBy: () => (new Mongo.Collection.ObjectID)._str, 
});

export default Appointments;
