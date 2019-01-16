import React, { Component } from 'react';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class EditPatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: null,
			isLoading: true,
		};
	}

	componentDidMount() {
		Meteor.call('patient.find',
			{ id: this.props.match.params.id },
			(err, res) => {
				this.setState({
					isLoading: false,
					patient: res,
				})
			}
		);
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
		const { name, tel, birthDate } = event.target;
		Meteor.call('patient.edit', {
			id: this.state.patient._id,
			data: {
				name: name.value,
				tel: tel.value,
				birthDate: new Date(birthDate.value),
			}
		}, () => {
			this.props.history.push(URLS.PATIENTS_URL);
		});
	}
		
	render() { 
		const {
			isLoading,
			patient
		} = this.state;

		if (isLoading) {
			return (
				<div>
					Is loading...
				</div>
			);
		}
		
		return (
			<div>
				<h3>Editar Paciente</h3>
				<PatientForm onSubmit={this.handleSubmit} patient={patient} />
			</div>
		);
	}
}
 
export default EditPatient;
