import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Patients = new Mongo.Collection('patients');

Patients.schema = new SimpleSchema({
    name: { type: String, required: true },
    tel: { type: SimpleSchema.Integer },
    birthDate: { type: Date}
});

Meteor.methods({
    'patients.insert'({
        name,
        tel,
        birthDate,
    }) {
        Patients.insert({
            name,
            tel,
            birthDate,
        });
    }
});

export default Patients;
