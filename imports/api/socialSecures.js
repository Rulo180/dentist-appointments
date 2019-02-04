import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

const SocialSecures = new Mongo.Collection('socialSecures');

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

SocialSecures.schema = new SimpleSchema({
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

SocialSecures.attachSchema(SocialSecures.schema);

Meteor.methods({
	'socialSecures.list'() {
		return SocialSecures.find({}).fetch;
	},
	'socialSecure.find'({
		_id,
	}) {
		check(_id, String);
		if (_id) {
			return SocialSecures.findOne({ _id });
		}
	},
	'socialSecure.insert'({
		name,
		code,
		services
	}) {
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		check(name, String);
		check(code, String);
		check(services, Array);
		return SocialSecures.insert({
			name,
			code,
			services,
		});
	},
	'socialSecure.remove'({
		_id,
	}) {
		check(_id, String);
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		SocialSecures.remove({ _id });
	},
});

export default SocialSecures;
