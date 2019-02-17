import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import SocialSecures from '../../api/socialSecures';
import { mapSocialSecuresToOptions, mapPatientToForm } from '../utils/utils';
import { routes } from '../constants';

import PatientForm from '../components/PatientForm';


class PatientEditContainer extends PureComponent {
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
				socialSecureId: {
					value: '',
					valid: true,
				}
			},
			isLoading: true,
		};
	}

	componentDidMount() {
		Meteor.call('patient.find',
			{ id: this.props.match.params.id },
			(err, res) => {
				this.setState({
					isLoading: false,
					formData: mapPatientToForm(res),
					createdAt: res.createdAt,
				});
			}
		);
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
		Meteor.call('patient.edit', {
			id: this.props.match.params.id,
			data: {
				name: name.value,
				tel: tel.value,
				birthDate: moment(birthDate.value).toDate(),
				socialSecureId: socialSecureId.value,
			}
		}, () => {
			this.props.history.push(routes.Patients.path);
		});
	}
		
	render() { 
		const {
			isLoading,
			formData,
		} = this.state;
		const { socialSecures } = this.props;

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
})(PatientEditContainer);
