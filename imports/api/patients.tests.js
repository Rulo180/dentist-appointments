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

		// Find the internal implementation of the task method so we can
		// test it in isolation
		const insertPatient = Meteor.server.method_handlers['patients.insert'];
		const editPatient = Meteor.server.method_handlers['patient.edit'];
		const deletePatient = Meteor.server.method_handlers['patient.remove'];

		beforeEach(function () {
			resetDatabase();

			patient = Factory.create('patient');

			// Mock Meteor logged in userId
			userId = Accounts.createUser({username: Random.id(5)});
		});

		it('builds correctly from factory', function() {
			const patient = Factory.create('patient');
			assert.typeOf(patient, 'object');
			assert.typeOf(patient.name, 'string');
			assert.typeOf(patient.tel, 'string');
			assert.typeOf(patient.birthDate, 'date');
			assert.typeOf(patient.socialSecureId, 'string');
			assert.typeOf(patient.createdAt, 'date');
			assert.typeOf(patient.createdBy, 'string');
		});
		it('should insert a valid patient', function() {
			const options = {
				returnStubValue: true,
				throwStubExceptions: true,
			};
	
			// Run the method with `this` set to the fake invocation
			insertPatient.apply({ userId }, [{
				name: patient.name,
				tel: patient.tel,
				birthDate: patient.birthDate,
				socialSecureId: patient.socialSecureId,
			}], options);

			assert.equal(Patients.find({ _id: patient._id }).count(), 1);
		});

		it('should update patient', function() {
			const newName = 'John Doe',
				newTel = '111222333',
				newSocialSecureId = (new Mongo.Collection.ObjectID)._str;

			const data = {
				name: newName,
				tel: newTel,
				birthDate: patient.birthDate,
				socialSecureId: newSocialSecureId,
			};
			
			editPatient.apply({ userId }, [{ id: patient._id, data }]);

			const dbPatient = Patients.findOne(patient._id);
			assert.equal(dbPatient.name, newName);
			assert.equal(dbPatient.tel, newTel);
			assert.equal(dbPatient.socialSecureId, newSocialSecureId);
		});

		it('should leaves createdAt on update', function() {
			const newName = 'John Doe',
				createdAt = patient.createdAt;
			const data = {
				name: newName,
				tel: patient.tel,
				birthDate: patient.birthDate,
				socialSecureId: patient.socialSecureId,
			};
			
			editPatient.apply({ userId }, [{ id: patient._id, data }]);

			const dbPatient = Patients.findOne(patient._id);
			assert.equal(dbPatient.name, newName);
			assert.equal(dbPatient.createdAt.toString(), createdAt.toString());
		});
		it('should remove a patient', function () {
			deletePatient.apply({ userId }, [{ _id: patient._id }]);
 
			assert.equal(Patients.find({}).count(), 0);
		});
	});
}
