import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { routes } from '../constants';
import Patients from '../../api/patients';
import { convertTimeToMilliseconds, mapAppointmentToForm, mapPatientsToOptions } from '../utils/utils';

import AppointmentForm from '../components/AppointmentForm';


class AppointmentEditContainer extends PureComponent {
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

	componentDidMount() {
		Meteor.call('appointment.find',
			{ _id: this.props.match.params.id },
			(err, res) => {
				this.setState({
					isLoading: false,
					formData: mapAppointmentToForm(res),
				});
			}
		);
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
		const { date, time, observations, patientId } = this.state.formData;
		let timestamp = new Date(date.value).getTime();	// convert date into ms
		let timemilliseconds = convertTimeToMilliseconds(time.value); // convert time into ms
		let datetime = timestamp + timemilliseconds;	// add those ms

		Meteor.call('appointment.edit', {
			id: this.props.match.params.id,
			data: {
				date: new Date(datetime),	// create a new date with the result
				observations: observations.value,
				patientId: patientId.value,
			}
		}, () => {
			this.props.history.push(routes.APPOINTMENTS);
		});
	}

	render() { 
		const { patients } = this.props;
		const { formData, isLoading } = this.state;

		if (isLoading) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}

		return (
			<AppointmentForm 
				formData={formData}
				patientsOptions={mapPatientsToOptions(patients)}
				onChange={this._handleChange}
				onSelect={this._handleSelect}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}
 
export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const isLoadingPatients = !patientsHandler.ready();

	return {
		patients: !isLoadingPatients ? Patients.find({}).fetch() : [], 
	};
})(AppointmentEditContainer);
