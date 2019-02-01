import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import PatientForm from '../components/PatientForm';


class PatientCreateContainer extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			formData: {
				name: {
					value: '',
					valid: true,
				},
				tel: {
					value: '',
					valid: true,
				},
				birthDate: {
					value: '',
					valid: true,
				},
			}
		};
	}
	
	_handleChange = (event) => {
		const { name, value } = event.target;
		let newFormData = {
			...this.state.formData,
			[name]: {
				value,
				valid: true,
			},
		};
		this.setState({
			formData: newFormData,
		});
	}
	
	_handleSubmit = (event) => {
		event.preventDefault();
		const { name, tel, birthDate } = this.state.formData;
		Meteor.call('patients.insert', {
			name: name.value,
			tel: tel.value,
			birthDate: moment(birthDate.value).toDate(),
		}, (error) => {
			if (error) {
				console.error(error);
			}
			this.props.history.goBack();
		});
	}
		
	render() { 
		const { formData } = this.state;

		return (
			<PatientForm
				formData={formData}
				onChange={this._handleChange}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}
 
export default PatientCreateContainer;
