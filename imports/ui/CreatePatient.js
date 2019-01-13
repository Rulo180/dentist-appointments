import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class CreatePatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toPatientList: false,
		};
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
        const { name, tel, birthDate } = event.target;
        Meteor.call('patients.insert', {
            name: name.value,
            tel: tel.value,
            birthDate: birthDate.value,
		}, () => {
			this.setState({ toPatientList: true })
		});
	}
		
	render() { 
		const { toPatientList } = this.state;

		// TODO: refactor this
		const patient = { name: "", tel: "", birthDate: "" }
		if (toPatientList === true) {
			return <Redirect to={ URLS.PATIENTS_URL } />
		}
		return (
			<PatientForm onSubmit={this.handleSubmit} patient={patient} />
		);
	}
}
 
export default CreatePatient;
