import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';


const Patients = new Mongo.Collection('patients');

Patients.schema = new SimpleSchema({
    name: { 
		type: String,
		label: "Name",
		required: true
	},
    tel: {
		type: SimpleSchema.Integer,
		label: "Telephone"
	},
    birthDate: {
		type: Date,
		label: "Birth Date",
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date();
		}
	}
});

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
		check(birthDate, String);
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
		Patients.update(
			id,
			{$set: {
				name: data.name,
				tel: data.tel,
				birthDate: data.birthDate,
			}
		});
	},
	'patient.remove'({
		_id,
	}) {
		check(_id, String);
		Patients.remove({
			_id
		});
	}
});

// Patients.allow({
// 	insert: function(userId) {
// 		return !!userId;
// 	}
// });

export default Patients;
