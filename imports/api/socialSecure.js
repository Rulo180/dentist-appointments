import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

const SocialSecure = new Mongo.Collection('socialSecures');

let Service = new SimpleSchema({
	code: {
		type: String,
		label: 'Code',
	},
	name: {
		type: String,
		label: 'Name',
	}
});

SocialSecure.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
	},
	code: {
		type: String,
		label: 'Code',
	},
	services: {
		type: Array,
		label: 'services',
	},
	'services.$': Service,
});

SocialSecure.attachSchema(SocialSecure.schema);

Meteor.methods({
	'socialSecure.insert'({
		name,
		code,
		services
	}) {
		return SocialSecure.insert({
			name,
			code,
			services,
		});
	},
});

export default SocialSecure;
