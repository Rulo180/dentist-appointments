import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import { mapSocialSecuresToOptions } from '../utils/utils';

import SocialSecures from '../../api/socialSecures';

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

	_handleSelect = (selectedOption) => {
		let newAppointment = {
			...this.state.formData,
			socialSecureId: {
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
		const { name, tel, birthDate, socialSecureId } = this.state.formData;
		Meteor.call('patients.insert', {
			name: name.value,
			tel: tel.value,
			birthDate: moment(birthDate.value).toDate(),
			socialSecureId: socialSecureId.value,
		}, (error) => {
			if (error) {
				console.error(error);
			}
			this.props.history.goBack();
		});
	}
		
	render() { 
		const { formData } = this.state;
		const { socialSecures } = this.props;

		return (
			<PatientForm
				formData={formData}
				socialsOptions={mapSocialSecuresToOptions(socialSecures)}
				onChange={this._handleChange}
				onSelect={this._handleSelect}
				onSubmit={this._handleSubmit}
			/>
		);
	}
}
 
export default withTracker(() => {
	const socialSecuresHandler = Meteor.subscribe('socialSecures');
	const isLoading = !socialSecuresHandler.ready();

	return {
		socialSecures: !isLoading ? SocialSecures.find({}).fetch() : [],
	};
})(PatientCreateContainer);
