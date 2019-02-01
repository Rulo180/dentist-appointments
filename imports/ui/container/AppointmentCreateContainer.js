import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { URLS } from '../constants';
import { convertTimeToMilliseconds } from '../utils/utils';

import Patients from '../../api/patients';
import AppointmentForm from '../components/AppointmentForm';


class AppointmentCreateContainer extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			formData: {
				patientId: {
					value: '',
					valid: true,
				},
				time: {
					value: '',
					valid: true,
				},
				date: {
					value: '',
					valid: true,
				},
				observations: {
					value: '',
					valid: true,
				},
			},
			isLoading: true,
		};
	}

	_handleChange = (event) => {
		const { name, value } = event.target;
		
		let newAppointment = {
			...this.state.formData,
			[name]: {
				value,
				valid: true,
			},
		};
		this.setState({
			formData: newAppointment,
		});
	}

	_handleSelect = (selectedOption) => {
		let newAppointment = {
			...this.state.formData,
			patientId: {
				value: selectedOption.value,
				valid: true,
			},
		};
		this.setState({
			formData: newAppointment,
		});
	}
	
	_handleSubmit = (event) => {
		event.preventDefault();
		const { time, date, observations, patientId } = this.state.formData;
		let timestamp = new Date(date.value).getTime();	// convert date into ms
		let timemilliseconds = convertTimeToMilliseconds(time.value); // convert time into ms
		let datetime = timestamp + timemilliseconds;	// add those ms
		Meteor.call('appointment.insert', {
			date: new Date(datetime),	// create a new date with the result
			observations: observations.value,
			patientId: patientId.value,
		}, (error) => {
			if (error) {
				console.error(error);
			}
			this.props.history.push(URLS.APPOINTMENTS);
		});
	};

	render() {
		const { patients } = this.props;
		const { formData } = this.state;

		return (
			<AppointmentForm 
				formData={formData}
				patients={patients}
				onChange={this._handleChange}
				onSelect={this._handleSelect}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}

export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const loadingPatients = !patientsHandler.ready();

	return {
		patients: !loadingPatients ? Patients.find({}).fetch() : [],
	};
})(AppointmentCreateContainer);
