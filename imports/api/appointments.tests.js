import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import {Random} from 'meteor/random';

import Appointments from './appointments';

describe('Appointments', function() {
	let appointment,
		patient,
		userId;
	
	// Find the internal implementation of the task method so we can
	// test it in isolation
	const insertAppointment = Meteor.server.method_handlers['appointment.insert'];
	const editAppointment = Meteor.server.method_handlers['appointment.edit'];
	const deleteAppointment = Meteor.server.method_handlers['appointment.remove'];
	const confirmAppointment = Meteor.server.method_handlers['appointment.confirm'];
	const cancelAppointment = Meteor.server.method_handlers['appointment.cancel'];

	beforeEach(function () {
		resetDatabase();

		appointment = Factory.create('appointment');
		patient = Factory.create('patient');

		userId = Accounts.createUser({username: Random.id(5)});
	});

	it('builds correctly from factory', function() {
		const appointment = Factory.create('appointment');
		assert.typeOf(appointment, 'object');
		assert.typeOf(appointment.date, 'date');
		assert.typeOf(appointment.observations, 'string');
		assert.typeOf(appointment.patientId, 'string');
		assert.typeOf(appointment.isConfirmed, 'boolean');
		assert.typeOf(appointment.isCanceled, 'boolean');
		assert.typeOf(appointment.createdAt, 'date');
		assert.typeOf(appointment.createdBy, 'string');
	});

	it('should insert a valid appointment', function() {
		// Run the method with `this` set to the fake invocation
		insertAppointment.apply({ userId }, [{
			date: appointment.date,
			patientId: patient._id,
			observations: appointment.observations,
			isConfirmed: appointment.isConfirmed,
			isCanceled: appointment.isCanceled,
		}]);

		assert.equal(Appointments.find({ _id: appointment._id }).count(), 1);
	});

	it('should not insert a invalid appointment', function() {
		assert.throws(function() {
			insertAppointment.apply( { userId }, [{
				date: appointment.date,
				patientId: null,
				observations: appointment.observations,
				isConfirmed: appointment.isConfirmed,
				isCanceled: appointment.isCanceled,
			}])
		}, 'Match error: Expected string, got null');
	});

	it('should update an appointment', function() {
		const newDateTime = new Date('2000-01-01 15:45:17'),
			newPatientId = (new Mongo.Collection.ObjectID)._str,
			newObservation = 'New observation';
		
		const newData = {
			date: newDateTime,
			patientId: newPatientId,
			observations: newObservation,
		};
		editAppointment.apply({ userId }, [{ id: appointment._id, data: newData }]);

		const dbAppointment = Appointments.findOne({ _id: appointment._id });
		assert.equal(dbAppointment.patientId, newPatientId);
		assert.equal(dbAppointment.observations, newObservation);
	});

	it('should leaves createdAt on update', function() {
		const createdAt = appointment.createdAt;

		const newData = {
			date: appointment.date,
			patientId: (new Mongo.Collection.ObjectID)._str,
			observations: appointment.observations,
		};
		
		editAppointment.apply({ userId }, [{ id: appointment._id, data: newData }]);

		const dbAppointment = Appointments.findOne({ _id: appointment._id });
		assert.equal(dbAppointment.createdAt.toString(), createdAt.toString());
	});

	it('should remove an appointment', function() {
		deleteAppointment.apply({ userId }, [{ _id: appointment._id }]);

		assert.equal(Appointments.find({}).count(), 0);
	});

	it('should confirm an appointment', function() {
		confirmAppointment.apply({ userId }, [{ _id: appointment._id }]);

		const dbAppointment = Appointments.findOne({ _id: appointment._id });

		assert.isTrue(dbAppointment.isConfirmed);
	});

	it('should unconfirm an appointment', function() {
		const confirmedAppointment = Factory.create('appointment', { isConfirmed: true });
		
		const confirmAppointment = Meteor.server.method_handlers['appointment.confirm'];
		confirmAppointment.apply({ userId }, [{ _id: confirmedAppointment._id }]);

		const dbAppointment = Appointments.findOne({ _id: confirmedAppointment._id });

		assert.isFalse(dbAppointment.isConfirmed);
	});

	it('should cancel an appointment', function() {
		cancelAppointment.apply({ userId }, [{ _id: appointment._id }]);

		const dbAppointment = Appointments.findOne({ _id: appointment._id });

		assert.isTrue(dbAppointment.isCanceled);
	});

	it('should uncancel an appointment', function() {
		const canceledAppointment = Factory.create('appointment', { isCanceled: true });
		cancelAppointment.apply({ userId }, [{ _id: canceledAppointment._id }]);

		const dbAppointment = Appointments.findOne({ _id: canceledAppointment._id });

		assert.isFalse(dbAppointment.isCanceled);

	});

	it('should not confirm a canceled appointment', function() {
		const canceledAppointment = Factory.create('appointment', { isCanceled: true });
		
		assert.throws(function() {
			confirmAppointment.apply({ userId }, [{ _id: canceledAppointment._id }]);
		}, 'Can not confirm a canceled event');
	});

	it('should not cancel a confirmed appointment', function() {
		const confirmedAppointment = Factory.create('appointment', { isConfirmed: true });
		
		assert.throws(function() {
			cancelAppointment.apply({ userId }, [{ _id: confirmedAppointment._id }]);
		}, 'Can not cancel a confirmed event');
	});
});
