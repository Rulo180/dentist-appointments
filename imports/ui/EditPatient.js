import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { URLS } from './constants';

import PatientForm from './components/PatientForm';


class EditPatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: null,
			isLoading: true,
			toPatientList: false,
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
            	birthDate: birthDate.value,
			}
		}, () => {
			this.setState({ toPatientList: true })
		});
	}
		
	render() { 
		const {
			isLoading,
			toPatientList,
			patient
		} = this.state;

		if (isLoading) {
			return (
				<div>
					Is loading...
				</div>
			);
		}
		if (toPatientList === true) {
			return <Redirect to={ URLS.PATIENTS_URL } />
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
