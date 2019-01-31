import React, { PureComponent } from 'react';
import moment from 'moment';

import { URLS } from '../constants';

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
					formData: this._mapPatientToForm(res),
				});
			}
		);
	}

	_mapPatientToForm = (patient) => {
		return ({
			name: {
				value: patient.name,
				valid: true,
			},
			tel: {
				value: patient.tel,
				valid: true,
			},
			birthDate: {
				value: moment(patient.birthDate).format('YYYY-MM-DD').toString(),
				valid: true,
			},
		});
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
		Meteor.call('patient.edit', {
			id: this.props.match.params.id,
			data: {
				name: name.value,
				tel: tel.value,
				birthDate: moment(birthDate.value).toDate(),
			}
		}, () => {
			this.props.history.push(URLS.PATIENTS);
		});
	}
		
	render() { 
		const {
			isLoading,
			formData,
		} = this.state;

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
			<PatientForm formData={formData} onChange={this._handleChange} onSubmit={this._handleSubmit} />
		);
	}
}
 
export default PatientEditContainer;
