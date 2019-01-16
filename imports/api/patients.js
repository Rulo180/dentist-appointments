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
		label: 'Created At',
		autoValue: function() {
			return new Date();
		}
	}
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
		Patients.insert({
			name,
			tel,
			birthDate,
		});
	},
	'patient.edit'({
		id,
		data,
	}) {
		check(data.name, String);
		check(data.birthDate, Date);
		Patients.update(
			id,
			{$set: {
				name: data.name,
				tel: data.tel,
				birthDate: data.birthDate,
			}}
		);
	},
	'patient.remove'({
		_id,
	}) {
		check(_id, String);
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
});

export default Patients;
