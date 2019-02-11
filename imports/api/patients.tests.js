import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import {Random} from 'meteor/random';

import Patients from './patients';


if (Meteor.isServer) {
	describe('Patients', function() {
		let patient;
		let userId;

		beforeEach(function () {
			resetDatabase();

			patient = Factory.create('patient');

			// Mock Meteor logged in userId
			userId = Accounts.createUser({username: Random.id(5)});
		});

		it('builds correctly from factory', function() {
			const patient = Factory.create('patient');
			assert.typeOf(patient, 'object');
			assert.typeOf(patient.birthDate, 'date');
			assert.typeOf(patient.createdAt, 'date');
		});
		it('can insert a patient', function() {
			let name = faker.name.findName(),
				tel = faker.phone.phoneNumber(),
				birthDate = faker.date.past(15),
				socialSecureId = (new Mongo.Collection.ObjectID)._str;
			
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertPatient = Meteor.server.method_handlers['patients.insert'];
	
			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };

			const options = {
				returnStubValue: true,
				throwStubExceptions: true,
			};
	
			// Run the method with `this` set to the fake invocation
			insertPatient.apply(invocation, [{
				name,
				tel,
				birthDate,
				socialSecureId,
			}], options);

			assert.equal(Patients.find({ name }).count(), 1);
		});
		it('leaves createdAt on update', function() {
			const createdAt = new Date(new Date() - 1000);
			patient = Factory.create('patient', { createdAt });

			const newName = 'John Doe';
			const data = {
				name: newName,
				tel: patient.tel,
				birthDate: patient.birthDate,
				socialSecureId: patient.socialSecureId,
			};
			
			const editPatient = Meteor.server.method_handlers['patient.edit'];
			editPatient.apply({ userId }, [{ id: patient._id, data }]);

			const dbPatient = Patients.findOne(patient._id);
			assert.equal(dbPatient.name, newName);
			assert.equal(dbPatient.createdAt.getDate(), createdAt.getDate());
		});
		it('can remove a patient', function () {
			const deletePatient = Meteor.server.method_handlers['patient.remove'];
			deletePatient.apply({ userId }, [{ _id: patient._id }]);
 
			assert.equal(Patients.find({}).count(), 0);
		});
	});
}
