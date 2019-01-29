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
	}) {
		check(name, String);
		check(birthDate, Date);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Patients.insert({
			name,
			tel,
			birthDate,
			createdBy: this.userId,
			createdAt: new Date(),
		});
	},
	'patient.edit'({
		id,
		data,
	}) {
		const { name, birthDate, tel } = data;
		check(id, String);
		check(name, String);
		check(birthDate, Date);
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Patients.update(
			id,
			{$set: {
				name: name,
				tel: tel,
				birthDate: birthDate,
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

// Patients.allow({
// 	insert: function(userId) {
// 		return !!userId;
// 	}
// });

Factory.define('patient', Patients, {
	name: () => faker.name.findName(),
	tel: () => faker.phone.phoneNumber(),
	birthDate: () => faker.date.past(15),
	createdAt: () => new Date(),
	createdBy: () => (new Mongo.Collection.ObjectID)._str, 
});

export default Patients;
