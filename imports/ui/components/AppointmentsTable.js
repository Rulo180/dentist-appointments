import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';


const AppointmentsTable = ({ appointments, patients, onConfirm, onCancel, onDelete }) => {
	_renderAppointments = () => {
		let appointmentsArray = [],
			rowNumber = 1;

		appointments.map( (appointment) => {
			const { _id, date, patientId, observations, isCanceled, isConfirmed } = appointment;
			let name = '';
			let patient = patients.find((patient) => patient._id === patientId);
			if (patient) {
				name = patient.name;
			}
			let confirmBtn = (isConfirmed) ?
				<button onClick={() => onConfirm(_id)} className="btn btn-outline-success active"><i className="far fa-calendar-check"></i></button>
				:
				<button onClick={() => onConfirm(_id)} className="btn btn-outline-success"><i className="fas fa-calendar-check"></i></button>;

			let cancelBtn = (isCanceled) ? 
				<button onClick={() => onCancel(_id)} type="button" className="btn active text-white btn-outline-warning"><i className="far fa-calendar-times"></i></button>
				:
				<button onClick={() => onCancel(_id)} type="button" className="btn btn-outline-warning"><i className="fas fa-calendar-times"></i></button>;
				
			appointmentsArray.push(
				<tr key={_id} className={isCanceled?'table-dark':''}>
					<td className="text-center" scope="row">{confirmBtn}</td>
					<th scope="row">{rowNumber++}</th>
					<td scope="row"><Link to={`${URLS.EDIT_APPOINTMENT}/${_id}`} className="btn btn-outline-secondary"><i className="fas fa-edit"></i></Link></td>
					<td>{moment(date).utc().format('HH:mm')} hs</td>
					<td>{name}</td>
					<td>{observations}</td>
					<td className="text-center">{cancelBtn}</td>
					<td className="text-center"><button onClick={() => onDelete(_id)} type="button" className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button></td>
				</tr>
			);
		});
		return appointmentsArray;
	};
	
	return (
		<div className="row justify-content-center">
			<div className="col-lg-10">
				<div className="card">
					<div className="card-body">
						<div className="row no-gutters justify-content-between mb-3">
							<h3>
								<Trans i18nKey={'appointments.table.title'}>
									Appointments
								</Trans>
							</h3>
							<Link to={URLS.CREATE_APPOINTMENT} className="btn btn-primary">
								<i className="far fa-calendar-plus"></i>&nbsp;
								<Trans i18nKey={'appointments.add'}>
									Add
								</Trans>
							</Link>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">
										<Trans i18nKey={'appointments.table.confirm'}>
											Confirm
										</Trans>
									</th>
									<th scope="col">#</th>
									<th scope="col">
										<Trans i18nKey={'appointments.table.edit'}>
											Edit
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'appointments.table.time'}>
											Time
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'appointments.table.patient'}>
											Patient
										</Trans>
									</th>
									<th scope="col">
										<Trans i18nKey={'appointments.table.observations'}>
											Observations
										</Trans>
									</th>
									<th className="text-center" scope="col">
										<Trans i18nKey={'appointments.table.cancel'}>
											Is Canceled?
										</Trans>
									</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{this._renderAppointments()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

AppointmentsTable.propTypes = {
	appointments: PropTypes.array,
	patients: PropTypes.array,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default translate('common')(AppointmentsTable);
