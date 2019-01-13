import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PatientForm from './components/PatientForm';


class CreatePatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			toPatientList: false,
		};
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
        const { nameInput, telInput, birthInput } = event.target;
        Meteor.call('patients.insert', {
            name: nameInput.value,
            tel: telInput.value,
            birthDate: birthInput.value,
		}, () => {
			this.setState({ toPatientList: true })
		});
	}
		
	render() { 
		if (isLoading) {
			return (
				<div>
					Is loading...
				</div>
			);
		}
		if (this.state.toPatientList === true) {
			return <Redirect to='/patients' />
		}
		return (
			<PatientForm onSubmit={this.handleSubmit} />
		);
	}
}
 
export default CreatePatient;
