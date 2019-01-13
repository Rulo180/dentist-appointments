import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

import { URLS } from './constants';
import Patients from '../api/patients';


const PatientsList = ({ patients }) => {
	const handleDelete = (id) => {
		Meteor.call('patient.remove', { _id: id });
	}
    const renderPatients = (patients ) => {
        let patientsArray = [],
			rowNumber = 1;
        patients.map((patient) => {
			const { _id, name, tel, birthDate } = patient;
            patientsArray.push(
                <tr key={_id}>
                    <th scope="row">{rowNumber++}</th>
					<td><a href={`patient/edit/${_id}`} className="btn btn-link">Editar</a></td>
                    <td>{name}</td>
                    <td>{tel}</td>
                    <td>{birthDate}</td>
					<td><button onClick={() => handleDelete(_id)} type="button" className="btn btn-outline-danger">Borrar</button></td>
                </tr>
            );
        });
        return patientsArray;
    }
    return (
        <div>
            <div className="row no-gutters justify-content-end">
                <a href={URLS.ADD_PATIENT_URL} className="btn btn-light">Add</a>
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
    )
}

export default withTracker(() => {
    const patientsHandler = Meteor.subscribe('patients');
    const loadingPatients = !patientsHandler.ready();

    return {
        patients: !loadingPatients ? Patients.find({}).fetch() : [], 
    };
})(PatientsList);
