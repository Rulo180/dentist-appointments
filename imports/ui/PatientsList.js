import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { URLS } from './constants';
import Patients from '../api/patients';


const PatientsList = ({ patients }) => {
	const _handleDelete = (id) => {
		Meteor.call('patient.remove', { _id: id });
	};
	
	const renderPatients = (patients ) => {
		let patientsArray = [],
			rowNumber = 1;
		patients.map((patient) => {
			const { _id, name, tel, birthDate } = patient;
			patientsArray.push(
				<tr key={_id}>
					<th scope="row">{rowNumber++}</th>
					<td><Link to={`${URLS.EDIT_PATIENT}/${_id}`} className="btn btn-link">Editar</Link></td>
					<td>{name}</td>
					<td>{tel}</td>
					<td>{moment(birthDate).format('DD-MM-YYYY').toString()}</td>
					<td><button onClick={() => _handleDelete(_id)} type="button" className="btn btn-outline-danger">Borrar</button></td>
				</tr>
			);
		});
		return patientsArray;
	};

	if(patients.length == 0) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	
	return (
		<main>
			<div className="row justify-content-center">
				<div className="col-lg-10">
					<div className="card">
						<div className="card-body">
							<div className="row no-gutters justify-content-between mb-3">
								<h3>Patients</h3>
								<Link to={URLS.ADD_PATIENT} className="btn btn-primary">Add</Link>
							</div>
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col"></th>
										<th scope="col">Name</th>
										<th scope="col">Tel</th>
										<th scope="col">Birth Date</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{renderPatients(patients)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const isLoading = !patientsHandler.ready();

	return {
		patients: !isLoading ? Patients.find({}).fetch() : [], 
	};
})(PatientsList);
