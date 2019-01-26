import React, { Component } from 'react';
import moment from 'moment';

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
				birthDate: moment(birthDate.value).toDate(),
			}
		}, () => {
			this.props.history.push(URLS.PATIENTS);
		});
	}
		
	render() { 
		const {
			isLoading,
			patient
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
			<div className="row justify-content-center">
				<div className="col-10 col-md-8 col-lg-6">
					<div className="card">
						<div className="card-body">
							<h3>Editar Paciente</h3>
							<PatientForm onSubmit={this.handleSubmit} patient={patient} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default EditPatient;
