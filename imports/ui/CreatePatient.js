import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class CreatePatient extends Component {
	
	handleSubmit = (event) => {
		event.preventDefault();
		const { name, tel, birthDate } = event.target;
		Meteor.call('patients.insert', {
			name: name.value,
			tel: tel.value,
			birthDate: moment(birthDate.value).toDate(),
		}, () => {
			this.props.history.push(URLS.PATIENTS_URL);
		});
	}
		
	render() { 
		return (
			<div className="row justify-content-center">
				<div className="col-9 col-md-6">
					<PatientForm onSubmit={this.handleSubmit} />
				</div>
			</div>
		);
	}
}
 
export default CreatePatient;
