import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import Patients from './patients';


if (Meteor.isServer) {
	describe('Patients', function() {
		let patient;

		beforeEach(function () {
			resetDatabase();

			patient = Factory.create('patient');
		});

		it('builds correctly from factory', function() {
			const patient = Factory.create('patient');
			assert.typeOf(patient, 'object');
			assert.typeOf(patient.birthDate, 'date');
			assert.typeOf(patient.createdAt, 'date');
		});
		// it('leaves createdAt on update', function() {
		//     const createdAt = new Date(new Date() - 1000);
		//     let patient = Factory.create('patient', { createdAt });

		//     const name = 'John Doe';
		//     Patients.update(patient, { $set: { name }});

		//     patient = Patients.findOne(patient._id);
		//     assert.equal(patient.name, name);
		//     assert.equal(patient.createdAt.getTime(), createdAt.getTime());
		// });
		it('can insert a patient', function() {
			let name = faker.name.findName(),
				tel = faker.phone.phoneNumber(),
				birthDate = faker.date.past(15);

			Meteor.call('patients.insert', {
				name,
				tel,
				birthDate,
			});
			assert.equal(Patients.find({}).count(), 2);
		});
		it('can remove a patient', function () {
			Meteor.call('patient.remove', {
				_id: patient._id,
			});

			assert.equal(Patients.find({}).count(), 0);
		});
	});

}
