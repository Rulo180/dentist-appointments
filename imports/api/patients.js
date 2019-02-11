import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import SimpleSchema from 'simpl-schema';


const Patients = new Mongo.Collection('patients');

Patients.schema = new SimpleSchema({
	name: { 
		type: String,
		label: 'Name',
	},
	tel: {
		type: String,
		label: 'Telephone',
		optional: true,
	},
	birthDate: {
		type: Date,
		label: 'Birth Date',
	},
	socialSecureId: {
		type: String,
		label: 'Social secure',
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

Patients.attachSchema(Patients.schema);

Meteor.methods({
	'patient.find'({
		id
	}) {
		check(id, String);
		if (id) {
			return Patients.findOne({ _id: id });
		}
	},
	'patients.insert'({
		name,
		tel,
		birthDate,
		socialSecureId,
	}) {
		check(name, String);
		check(birthDate, Date);
		check(socialSecureId, String);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Patients.insert({
			name,
			tel,
			birthDate,
			socialSecureId,
			createdAt: new Date(),
			createdBy: this.userId,
		});
	},
	'patient.edit'({
		id,
		data,
	}) {
		const { name, birthDate, tel, socialSecureId } = data;
		check(name, String);
		check(birthDate, Date);
		check(socialSecureId, String);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		return Patients.update(
			id,
			{$set: {
				name,
				birthDate,
				tel,
				socialSecureId,
			}}
		);
	},
	'patient.remove'({
		_id,
	}) {
		check(_id, String);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Patients.remove({ _id });
	}
});

Factory.define('patient', Patients, {
	name: () => faker.name.findName(),
	tel: () => faker.phone.phoneNumber(),
	birthDate: () => faker.date.past(15),
	socialSecureId: () => (new Mongo.Collection.ObjectID)._str,
	createdAt: () => new Date(),
	createdBy: () => (new Mongo.Collection.ObjectID)._str, 
});

export default Patients;
