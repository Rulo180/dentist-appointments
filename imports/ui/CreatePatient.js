import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class CreatePatient extends Component {
	
	handleSubmit = (event) => {
		event.preventDefault();
		const { name, tel, birthDate } = event.target;
		Meteor.call('patients.insert', {
			name: name.value,
			tel: tel.value,
			birthDate: new Date(birthDate.value),
		}, () => {
			this.props.history.push(URLS.PATIENTS_URL);
		});
	}
		
	render() { 
		return (
			<PatientForm onSubmit={this.handleSubmit} />
		);
	}
}
 
export default CreatePatient;
