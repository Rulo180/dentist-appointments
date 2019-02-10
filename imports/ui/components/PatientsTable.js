import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';


const PatientsTable = ({ patients, socialSecures, onDelete }) => {
	let patientRows = patients.map((patient) => {
		const { _id, name, tel, birthDate } = patient;
		return (
			<tr key={_id}>
				<td>{name}</td>
				<td>{socialSecures.filter((social) => social._id === patient.socialSecureId)[0].name}</td>
				<td>{tel}</td>
				<td>{moment(birthDate).format('DD-MM-YYYY').toString()}</td>
				<td><Link to={`${URLS.EDIT_PATIENT}/${_id}`} className="btn btn-outline-secondary"><i className="fas fa-edit"></i></Link></td>
				<td><button onClick={() => onDelete(_id)} type="button" className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button></td>
			</tr>
		);
	});

	return (
		<div className="row justify-content-center">
			<div className="col-lg-10">
				<div className="card">
					<div className="card-body">
						<div className="row no-gutters justify-content-between mb-3">
							<h3>
								<Trans i18nKey="table.title">
									Patients
								</Trans>
							</h3>
							<Link to={URLS.ADD_PATIENT} className="btn btn-primary">
								<i className="fas fa-user-plus"></i>&nbsp;
								<Trans i18nKey="table.add">
									Add
								</Trans>
							</Link>
						</div>
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">
										<Trans i18nKey="table.cols.name">
											Name
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.socialSecure">
											Social Secure
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.tel">
											Tel
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.birthDate">
											Birth Date
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.edit">
											Edit
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey="table.cols.delete">
											Delete
										</Trans>
									</th>
								</tr>
							</thead>
							<tbody>
								{patientRows}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

PatientsTable.propTypes = {
	patients: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default translate('patients')(PatientsTable);
