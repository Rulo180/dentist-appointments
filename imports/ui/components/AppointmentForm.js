import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';

import { URLS } from '../constants';
import { mapPatientsToOptions } from '../utils/utils';


const AppointmentForm = ({ patients, formData, onChange, onSelect, onSubmit }) => {

	const options = mapPatientsToOptions(patients);

	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-8 col-lg-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<div className="row justify-content-between no-gutters">
									<label htmlFor="patientSelect">
										<Trans i18nKey={'appointments.form.labels.patient'}>Patient</Trans>
									</label>
									<Link to={URLS.ADD_PATIENT}>
										<Trans i18nKey={'appointments.form.title'}>
											Create patient
										</Trans>
									</Link>
								</div>
								<Select
									name="patientSelect"
									options={options}
									onChange={onSelect}
								/>
							</div>
							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="timeInput">
										<Trans i18nKey={'appointments.form.labels.time'}>
											Time
										</Trans>
									</label>
									<input
										type="time"
										className="form-control"
										name="time"
										onChange={onChange}
										value={formData.time.value}
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="dateInput">
										<Trans i18nKey={'appointments.form.labels.date'}>
											Date
										</Trans>
									</label>
									<input
										type="date"
										className="form-control" 
										name="date"
										onChange={onChange}
										value={formData.date.value}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="observations">
									<Trans i18nKey={'appointments.form.labels.observations'}>
										Observations
									</Trans>
								</label>
								<textarea
									className="form-control"
									name="observations"
									rows="3"
									onChange={onChange}
									value={formData.observations.value}
								>
								</textarea>
							</div>
							<div className="row align-items-center">
								<div className="col text-right">
									<button type="submit" className="btn btn-primary">
										<Trans i18nKey={'form.actions.submit'}>
											Submit
										</Trans>
									</button>
								</div>
								<div className="col">
									<Link to={URLS.APPOINTMENTS}>
										<Trans i18nKey={'form.actions.cancel'}>
											Cancel
										</Trans>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

AppointmentForm.propTypes = {
	patients: PropTypes.array.isRequired,
	formData: PropTypes.shape({
		patientId: PropTypes.object,
		time: PropTypes.object,
		date: PropTypes.object,
		observations: PropTypes.object,
	}),
	onChange: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default translate('common')(AppointmentForm);
