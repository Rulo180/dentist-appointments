import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import PatientForm from './PatientForm';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
	describe('PatientForm', function() {
		it('should render', function() {
			const patient = Factory.create('patient');
			const form = shallow(<PatientForm />);
			assert.equal(form.hasClass('form-group'));
		});
	});
}
