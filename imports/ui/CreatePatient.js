import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class CreatePatient extends PureComponent {
	
	handleSubmit = (event) => {
		event.preventDefault();
		const { name, tel, birthDate } = event.target;
		Meteor.call('patients.insert', {
			name: name.value,
			tel: tel.value,
			birthDate: moment(birthDate.value).toDate(),
		}, () => {
			this.props.history.goBack();
		});
	}
		
	render() { 
		return (
			<div className="row justify-content-center">
				<div className="col-10 col-md-8 col-lg-6">
					<div className="card">
						<div className="card-body">
							<PatientForm onSubmit={this.handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default CreatePatient;
