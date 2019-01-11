import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { URLS } from './constants';
import Patients from '../api/patients';


const PatientsList = ({ patients }) => {
    const renderPatients = (patients ) => {
        let patientsArray = [];
        patients.map((patient) => {
            const { _id, name, tel, birthDate } = patient;
            patientsArray.push(
                <tr key={_id}>
                    <th scope="row">1</th>
                    <td>{name}</td>
                    <td>{tel}</td>
                    <td>{birthDate}</td>
                </tr>
            );
        });
        return patientsArray;
    }
    return (
        <div>
            <div className="row no-gutters justify-content-end">
                <a href={URLS.ADD_PATIENT_URL} class="btn btn-light">Add</a>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Tel</th>
                        <th scope="col">Birth Date</th>
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
